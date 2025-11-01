# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
🩺 MediBlock – Decentralized Medical Record Management System

MediBlock is a secure and user-friendly platform that allows patients, doctors, and admins to store, access, and share medical records safely on a decentralized network.
It ensures privacy, integrity, and transparency while simplifying healthcare management for everyone involved.

🚀 Features

👩‍⚕️ Role-based access control – Patients, Doctors, Admins

🔐 Encrypted file storage (using IPFS or database)

💬 Secure communication & access authorization

🌐 Decentralized and tamper-proof record management

🧭 Intuitive and responsive UI built with React + Tailwind CSS


🛠️ Tech Stack
Layer	Technology
Frontend	React.js, Tailwind CSS, React Router, Framer Motion
Blockchain	Solidity (Smart Contracts), Ethereum / Polygon
Wallet Integration	MetaMask + Ethers.js
Storage	IPFS (for encrypted file storage), MongoDB (for off-chain data)
Backend (optional)	Node.js + Express
Encryption	AES-256 / RSA
State Management	React Context API
⚙️ Setup Instructions

Clone the repository

git clone https://github.com/your-username/MediBlock.git
cd MediBlock


Install dependencies

npm install


Run the development server

npm run dev


The app will start on http://localhost:5173
 (if using Vite).

Connect MetaMask

Open MetaMask and switch to Ethereum or Polygon Mumbai testnet.

Import your account or create a new wallet.

Compile & deploy smart contracts (if applicable)

npx hardhat compile
npx hardhat run scripts/deploy.js --network mumbai
