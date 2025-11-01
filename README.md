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

🧩 Project Structure

Below is the high-level file and folder structure of the MediBlock project with explanations for each:

MediBlock/
├── src/
│   ├── assets/                         # Contains images, icons, and static files
│   │   ├── logo.png
│   │   ├── doctor.png
│   │   └── ...
│   │
│   ├── components/                     # Reusable UI components (buttons, headers, etc.)
│   │   ├── Navbar.jsx                  # Navigation bar component
│   │   ├── Footer.jsx                  # Footer component
│   │   ├── ProtectedRoute.jsx          # Restricts routes to logged-in users only
│   │   └── ...
│   │
│   ├── pages/                          # Main pages of the website
│   │   ├── Home.jsx                    # Landing page with introduction and CTA
│   │   ├── Login.jsx                   # Common login page for users
│   │   ├── Register.jsx                # Role selection page (Patient/Doctor/Admin)
│   │   │
│   │   ├── PatientDashboard/           # Folder for patient dashboard and subpages
│   │   │   ├── index.jsx               # Main patient dashboard (search, icons, calendar)
│   │   │   ├── Appointments.jsx        # Patient appointments page
│   │   │   ├── Medicines.jsx           # Medicine tracking page
│   │   │   ├── Doctors.jsx             # Doctor list and access page
│   │   │   ├── History.jsx             # Medical history and previous records
│   │   │   ├── Hospitals.jsx           # Hospitals information and nearby centers
│   │   │   └── Contact.jsx             # Contact and support page
│   │   │
│   │   ├── DoctorDashboard/            # Folder for doctor’s dashboard and related pages
│   │   │   ├── index.jsx
│   │   │   ├── ViewPatients.jsx
│   │   │   ├── Prescriptions.jsx
│   │   │   └── Reports.jsx
│   │   │
│   │   ├── AdminDashboard/             # Folder for admin management pages
│   │   │   ├── index.jsx
│   │   │   ├── ManageDoctors.jsx
│   │   │   ├── ManageHospitals.jsx
│   │   │   └── AuditLog.jsx
│   │
│   ├── context/                        # Context API files for global state management
│   │   ├── AuthContext.jsx             # Manages user authentication and role data
│   │   └── ThemeContext.jsx            # (Optional) Theme or UI preferences
│   │
│   ├── utils/                          # Utility/helper functions
│   │   ├── ipfs.js                     # IPFS upload and retrieval functions
│   │   ├── encryption.js               # AES/RSA encryption helpers
│   │   ├── constants.js                # Common constants (API URLs, contract addresses)
│   │   └── contract.js                 # Web3/Ethers contract interactions
│   │
│   ├── App.jsx                         # Main React component, handles routes
│   ├── index.js                        # React entry point, renders App.jsx
│   ├── routes.js                       # Centralized route configuration
│   ├── tailwind.config.js              # Tailwind CSS configuration
│   ├── postcss.config.js               # PostCSS setup for Tailwind
│   ├── package.json                    # Project dependencies and scripts
│   └── README.md                       # This documentation file
│
├── public/
│   ├── index.html                      # Main HTML file for React
│   ├── favicon.ico
│   └── manifest.json
│
└── package.json

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
