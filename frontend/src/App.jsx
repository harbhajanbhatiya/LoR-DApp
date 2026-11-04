import { useState } from "react";
import { ethers } from "ethers";
import LoRArtifact from "./contracts/LoR.json";
import { CONTRACT_ADDRESS, NETWORK } from "./contracts/config";
import "./App.css";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [owner, setOwner] = useState("");
  const [isApprover, setIsApprover] = useState(false);
  const [studentCount, setStudentCount] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState(null);

  const [studentForm, setStudentForm] = useState({
    name: "",
    course: "",
    email: "",
  });

  const [studentId, setStudentId] = useState("");
  const [facultyAddress, setFacultyAddress] = useState("");

  // Connect MetaMask
  async function connectWallet() {
    try {
      if (!window.ethereum) {
        throw new Error("Please install MetaMask first.");
      }

      setLoading(true);

      await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: NETWORK.chainId }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: NETWORK.chainId,
              chainName: "Sepolia",
              nativeCurrency: {
                name: "Sepolia ETH",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: ["https://ethereum-sepolia-rpc.publicnode.com"],
              blockExplorerUrls: [NETWORK.explorer],
            }],
          });
        } else {
          throw switchError;
        }
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const userAddress = await signer.getAddress();

      const lorContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        LoRArtifact.abi,
        signer
      );

      const ownerAddress = await lorContract.owner();

      const approverStatus =
        await lorContract.authorizedApprovers(userAddress);

      const totalStudents = await lorContract.studentCount();

      setAccount(userAddress);
      setContract(lorContract);
      setOwner(ownerAddress);
      setIsApprover(approverStatus);
      setStudentCount(Number(totalStudents));

      setMessage("Wallet connected successfully!");

    } catch (error) {
      setMessage(error.shortMessage || error.message || "Connection failed.");
    } finally {
      setLoading(false);
    }
  }

  // Add student
  async function addStudent(e) {
    e.preventDefault();

    try {
      if (!contract) throw new Error("Connect your wallet first.");

      setLoading(true);
      setMessage("Registering student...");

      const tx = await contract.addStudent(
        studentForm.name,
        studentForm.course,
        studentForm.email
      );

      await tx.wait();

      setStudentForm({
        name: "",
        course: "",
        email: "",
      });

      setStudentCount(Number(await contract.studentCount()));

      setMessage("Student added successfully!");

    } catch (error) {
      setMessage(error.shortMessage || error.reason || error.message);
    } finally {
      setLoading(false);
    }
  }

  // Request recommendation
  async function requestRecommendation() {
    try {
      if (!contract) throw new Error("Connect your wallet first.");

      setLoading(true);
      setMessage("Submitting recommendation request...");

      const tx = await contract.requestRecommendation(
        Number(studentId)
      );

      await tx.wait();

      setMessage("Recommendation requested successfully!");

    } catch (error) {
      setMessage(error.shortMessage || error.reason || error.message);
    } finally {
      setLoading(false);
    }
  }

  // Approve recommendation
  async function approveRecommendation() {
    try {
      if (!contract) throw new Error("Connect your wallet first.");

      setLoading(true);
      setMessage("Approving recommendation...");

      const tx = await contract.approveRecommendation(
        Number(studentId)
      );

      await tx.wait();

      setMessage("Recommendation approved successfully!");

    } catch (error) {
      setMessage(error.shortMessage || error.reason || error.message);
    } finally {
      setLoading(false);
    }
  }

  // Get student details
  async function getStudent() {
    try {
      if (!contract) throw new Error("Connect your wallet first.");

      setLoading(true);

      const data = await contract.getStudent(Number(studentId));

      setStudent({
        id: Number(data.id),
        name: data.name,
        course: data.course,
        email: data.email,
        requester: data.requester,
        requested: data.recommendationRequested,
        approved: data.recommendationApproved,
      });

      setMessage("Student record retrieved successfully!");

    } catch (error) {
      setStudent(null);
      setMessage(error.shortMessage || error.reason || error.message);
    } finally {
      setLoading(false);
    }
  }

  // Authorize faculty
  async function authorizeFaculty() {
    try {
      if (!contract) throw new Error("Connect your wallet first.");

      setLoading(true);

      const tx = await contract.authorizeApprover(facultyAddress);
      await tx.wait();

      setMessage("Faculty authorized successfully!");

      const status = await contract.authorizedApprovers(account);
      setIsApprover(status);

      setFacultyAddress("");

    } catch (error) {
      setMessage(error.shortMessage || error.reason || error.message);
    } finally {
      setLoading(false);
    }
  }

  // Deauthorize faculty
  async function deauthorizeFaculty() {
    try {
      if (!contract) throw new Error("Connect your wallet first.");

      setLoading(true);

      const tx = await contract.deauthorizeApprover(facultyAddress);
      await tx.wait();

      setMessage("Faculty deauthorized successfully!");

      const status = await contract.authorizedApprovers(account);
      setIsApprover(status);

      setFacultyAddress("");

    } catch (error) {
      setMessage(error.shortMessage || error.reason || error.message);
    } finally {
      setLoading(false);
    }
  }

  const isOwner =
    account && owner &&
    account.toLowerCase() === owner.toLowerCase();

  return (
    <div className="app">

      <nav className="navbar">
        <div className="brand">
          <span className="brand-icon">L</span>
          <div>
            <h2>LoR Chain</h2>
            <small>Decentralized Recommendation System</small>
          </div>
        </div>

        <button
          className="connect-btn"
          onClick={connectWallet}
          disabled={loading}
        >
          {account
            ? `${account.slice(0, 6)}...${account.slice(-4)}`
            : "Connect Wallet"}
        </button>
      </nav>

      <main className="container">

        <section className="hero">
          <div>
            <span className="tag">ETHEREUM SEPOLIA</span>

            <h1>Letter of Recommendation</h1>

            <p>
              A decentralized platform for transparent,
              secure and verifiable academic recommendations.
            </p>

            <a
              href={`${NETWORK.explorer}/address/${CONTRACT_ADDRESS}`}
              target="_blank"
              rel="noreferrer"
            >
              View Smart Contract on Etherscan ↗
            </a>
          </div>
        </section>

        {message && (
          <div className="message">
            {message}
          </div>
        )}

        <section className="stats">

          <div className="stat-card">
            <span>Total Students</span>
            <h2>{studentCount}</h2>
          </div>

          <div className="stat-card">
            <span>Wallet Status</span>
            <h2>{account ? "Connected" : "Disconnected"}</h2>
          </div>

          <div className="stat-card">
            <span>Your Role</span>
            <h2>
              {isOwner
                ? "Owner"
                : isApprover
                  ? "Faculty"
                  : account
                    ? "Student / User"
                    : "Guest"}
            </h2>
          </div>

        </section>

        <section className="dashboard-grid">

          {/* Add Student */}

          {isOwner && (
            <div className="card">
              <h3>Add Student</h3>

              <p>Register a new student on the blockchain.</p>

              <form onSubmit={addStudent}>

                <input
                  type="text"
                  placeholder="Student Name"
                  value={studentForm.name}
                  onChange={(e) =>
                    setStudentForm({
                      ...studentForm,
                      name: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="Course"
                  value={studentForm.course}
                  onChange={(e) =>
                    setStudentForm({
                      ...studentForm,
                      course: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={studentForm.email}
                  onChange={(e) =>
                    setStudentForm({
                      ...studentForm,
                      email: e.target.value,
                    })
                  }
                  required
                />

                <button disabled={loading}>
                  Add Student
                </button>

              </form>
            </div>
          )}

          {/* Request Recommendation */}

          <div className="card">
            <h3>Request Recommendation</h3>

            <p>Submit a recommendation request using student ID.</p>

            <input
              type="number"
              min="1"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />

            <button
              disabled={loading || !studentId}
              onClick={requestRecommendation}
            >
              Request LoR
            </button>
          </div>

          {/* Approve Recommendation */}

          {isApprover && (
            <div className="card">
              <h3>Approve Recommendation</h3>

              <p>Approve a pending recommendation request.</p>

              <input
                type="number"
                min="1"
                placeholder="Enter Student ID"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />

              <button
                disabled={loading || !studentId}
                onClick={approveRecommendation}
              >
                Approve LoR
              </button>
            </div>
          )}

          {/* View Student */}

          <div className="card">
            <h3>Student Records</h3>

            <p>Retrieve student information from Ethereum.</p>

            <input
              type="number"
              min="1"
              placeholder="Enter Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
            />

            <button
              disabled={loading || !studentId}
              onClick={getStudent}
            >
              View Student
            </button>
          </div>

          {/* Faculty Management */}

          {isOwner && (
            <div className="card">
              <h3>Faculty Management</h3>

              <p>Manage authorized faculty wallet addresses.</p>

              <input
                type="text"
                placeholder="Faculty Wallet Address"
                value={facultyAddress}
                onChange={(e) => setFacultyAddress(e.target.value)}
              />

              <button
                disabled={loading || !ethers.isAddress(facultyAddress)}
                onClick={authorizeFaculty}
              >
                Authorize Faculty
              </button>

              <button
                className="danger-btn"
                disabled={loading || !ethers.isAddress(facultyAddress)}
                onClick={deauthorizeFaculty}
              >
                Deauthorize Faculty
              </button>
            </div>
          )}

        </section>

        {/* Student Information */}

        {student && (
          <section className="student-result">

            <h2>Student Information</h2>

            <div className="student-details">

              <p><strong>ID:</strong> {student.id}</p>
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Course:</strong> {student.course}</p>
              <p><strong>Email:</strong> {student.email}</p>

              <p>
                <strong>Requester:</strong>{" "}
                {student.requester}
              </p>

              <p>
                <strong>Request Status:</strong>{" "}
                {student.requested ? "Requested" : "Not Requested"}
              </p>

              <p>
                <strong>Recommendation Status:</strong>{" "}
                <span className={student.approved ? "approved" : "pending"}>
                  {student.approved ? "Approved" : "Pending"}
                </span>
              </p>

            </div>

          </section>
        )}

        <footer>
          <p>LoR Chain | Built on Ethereum Sepolia</p>
          <small>Decentralized • Transparent • Verifiable</small>
        </footer>

      </main>
    </div>
  );
}

export default App;