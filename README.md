# Letter of Recommendation (LoR) DApp

A blockchain-based decentralized application (DApp) for managing academic Letters of Recommendation using Ethereum smart contracts.

The application enables student registration, recommendation requests, faculty authorization, recommendation approval, and transparent verification of student recommendation status.

## Project Overview

The Letter of Recommendation DApp is developed using Solidity, Hardhat, React.js, and ethers.js.

It uses the Ethereum Sepolia Testnet to provide a decentralized and transparent recommendation management system.

## Technology Stack

| Technology       | Purpose                            |
| ---------------- | ---------------------------------- |
| Solidity         | Smart Contract Development         |
| Hardhat          | Blockchain Development and Testing |
| Ethereum Sepolia | Blockchain Network                 |
| Infura           | RPC Provider                       |
| React.js         | Frontend Development               |
| Vite             | Frontend Build Tool                |
| ethers.js        | Blockchain Integration             |
| MetaMask         | Wallet Authentication              |
| Bootstrap        | UI Components                      |
| CSS              | Frontend Styling                   |
| Git & GitHub     | Version Control                    |

## Features

* Add and register student details.
* Request a Letter of Recommendation using Student ID.
* Approve recommendation requests through authorized faculty.
* Authorize and deauthorize faculty wallet addresses.
* Retrieve student information from the blockchain.
* View recommendation request and approval status.
* Connect the application using MetaMask.
* Interact with Ethereum Sepolia Testnet.

## Smart Contract Deployment

**Network:** Ethereum Sepolia Testnet

**Chain ID:** 11155111

**Contract Address:**

`0xD9E432b696FD6D18C3f715bD9784D54e469830d1`

**View Deployed Contract:**

https://sepolia.etherscan.io/address/0xD9E432b696FD6D18C3f715bD9784D54e469830d1

## Project Structure

```text
lor-dapp/
│
├── contracts/
│   ├── LoR.sol
│   └── Lock.sol
│
├── scripts/
│   └── deploy.js
│
├── test/
│   ├── LoR.js
│   └── Lock.js
│
├── frontend/
│   ├── src/
│   │   ├── contracts/
│   │   │   ├── LoR.json
│   │   │   └── config.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── index.html
│
├── screenshots/
│   ├── deployment.png
│   ├── dashboard.png
│   ├── student-registration.png
│   └── recommendation-request.png
│
├── hardhat.config.js
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites

* Node.js
* npm
* MetaMask Browser Extension
* Git
* Ethereum Sepolia Test ETH

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd lor-dapp
```

### 2. Install Backend Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root.

Add the following:

```env
SEPOLIA_RPC_URL=YOUR_INFURA_SEPOLIA_RPC_URL
PRIVATE_KEY=YOUR_TEST_WALLET_PRIVATE_KEY
```

Replace the placeholders with your credentials.

**Security:** Never share or upload your private key or `.env` file to GitHub.

### 4. Compile Smart Contracts

```bash
npx hardhat compile
```

### 5. Run Smart Contract Tests

```bash
npx hardhat test
```

The project includes automated test cases covering student registration, recommendation requests, faculty authorization, approval, and access control.

**Test Result:** 18 passing tests.

### 6. Deploy Smart Contract to Sepolia

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

After successful deployment, the contract address will be displayed in the terminal.

### 7. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 8. Start React Development Server

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173/
```

Connect MetaMask and select the Ethereum Sepolia network.

## Application Workflow

1. The contract owner deploys the smart contract.
2. The owner registers student details.
3. A connected wallet requests a recommendation using the Student ID.
4. The owner authorizes faculty wallet addresses.
5. Authorized faculty members can approve recommendation requests.
6. Student details and recommendation status can be retrieved from the blockchain.

## Testing and Verification

The following functionalities have been implemented and tested:

* Smart contract compilation.
* Automated Hardhat testing.
* Student registration.
* Recommendation requests.
* Student information retrieval.
* MetaMask wallet connection.
* Smart contract deployment on Sepolia.

Faculty authorization and recommendation approval are implemented in the smart contract and frontend.

## Screenshots

The `screenshots/` directory contains:

1. Smart contract deployment on Sepolia Etherscan.
2. Working React frontend dashboard.
3. Successful student registration.
4. Successful recommendation request.

## Security Considerations

* Only the contract owner can register students and manage faculty authorization.
* Only authorized approvers can approve recommendation requests.
* Blockchain transactions are publicly verifiable.
* Student information stored directly on-chain is publicly accessible.
* Test wallets and dummy student information are recommended for demonstration.

## Author

Harbhajan Singh Bhatiya

Engineering Student – Artificial Intelligence and Data Science