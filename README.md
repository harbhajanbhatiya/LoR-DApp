# Letter of Recommendation (LoR) DApp

A decentralized application built on Ethereum that enables student registration, recommendation requests, faculty authorization, and recommendation approval through smart contracts.

## Project Overview

The Letter of Recommendation DApp uses blockchain technology to provide a transparent and verifiable recommendation management system.

The application connects a React frontend with an Ethereum smart contract deployed on the Sepolia Testnet.

## Technology Stack

* Solidity – Smart Contract Development
* Hardhat – Development and Testing
* Ethereum Sepolia – Blockchain Network
* Infura – Blockchain RPC Provider
* React.js – Frontend
* Vite – Frontend Build Tool
* ethers.js – Blockchain Integration
* MetaMask – Wallet Connection
* Bootstrap and CSS – UI Styling

## Features

* Add student details.
* Request letters of recommendation.
* Approve recommendation requests through authorized faculty.
* Authorize and deauthorize faculty wallets.
* Retrieve student details.
* View recommendation request and approval status.
* Connect using MetaMask.

## Smart Contract Details

**Network:** Ethereum Sepolia

**Contract Address:**
`0xD9E432b696FD6D18C3f715bD9784D54e469830d1`

**Etherscan:**

https://sepolia.etherscan.io/address/0xD9E432b696FD6D18C3f715bD9784D54e469830d1

## Project Structure

```text
lor-dapp/
├── contracts/
│   └── LoR.sol
├── scripts/
│   └── deploy.js
├── test/
│   └── LoR.js
├── frontend/
│   └── src/
│       ├── contracts/
│       ├── App.jsx
│       ├── App.css
│       └── main.jsx
├── screenshots/
├── hardhat.config.js
├── package.json
└── README.md
```

## Installation and Setup

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

```env
SEPOLIA_RPC_URL=YOUR_INFURA_SEPOLIA_RPC_URL
PRIVATE_KEY=YOUR_TEST_WALLET_PRIVATE_KEY
```

Never expose your private key or commit your `.env` file.

### 4. Compile Smart Contracts

```bash
npx hardhat compile
```

### 5. Run Tests

```bash
npx hardhat test
```

### 6. Deploy to Sepolia

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 7. Run Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local development URL provided by Vite.

Connect MetaMask using the Ethereum Sepolia network.

## Tested Functionalities

* Smart contract compilation.
* Automated Hardhat tests.
* Student registration.
* Recommendation requests.
* Student information retrieval.
* MetaMask wallet connection.
* Sepolia smart contract deployment.

## Screenshots

Project screenshots are available in the `screenshots/` directory.

## Security Considerations

* Administrative operations are restricted to the contract owner.
* Recommendation approval is restricted to authorized approvers.
* Student information stored on-chain is publicly accessible.
* Test wallets and dummy student information should be used for demonstration.

## Network Information

Ethereum Sepolia Testnet

Chain ID: 11155111

Block Explorer: https://sepolia.etherscan.io/

## Author

Badal

## License

MIT License

````

One correction before submission: the README describes approval functionality implemented in the contract, not independently verified in your live frontend.

---

## Step 5. Run Final Tests

From the project root:

```powershell
npx hardhat test
````

You previously got 18 passing tests. Confirm that result again.

Then check Git:

```powershell
git status
```

## Step 6. Push to GitHub

If you haven't created a repository yet:

1. Open [GitHub](https://github.com/?utm_source=chatgpt.com).
2. Click New Repository.
3. Repository name: `LoR-DApp`.
4. Choose Public.
5. Don't initialize with a README (you already have one).
6. Create repository.

Back in VS Code terminal:

```powershell
git init
git add .
git commit -m "Badal - LoR DApp"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Replace the repository URL with your actual GitHub repository URL.

**Before `git add .`, verify that `.env` is ignored. Never push private keys.**

---

### Final Submission Checklist

| Requirement             | Status                    |
| ----------------------- | ------------------------- |
| Solidity smart contract | Complete                  |
| Hardhat testing         | 18 tests passed           |
| Sepolia deployment      | Complete                  |
| Etherscan link          | Available                 |
| React frontend          | Complete                  |
| MetaMask integration    | Complete                  |
| Student registration    | Tested                    |
| Recommendation request  | Tested                    |
| Student details         | Tested                    |
| Faculty approval        | Implemented, not verified |
| Screenshots             | To organize               |
| README                  | To add                    |
| GitHub repository       | Pending                   |

