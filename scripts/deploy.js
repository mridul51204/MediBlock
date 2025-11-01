// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  // Get the contract factory
  const MedicalRecord = await hre.ethers.getContractFactory("MedicalRecord");

  // Deploy the contract
  const medicalRecord = await MedicalRecord.deploy();

  // Wait for deployment to finish
  await medicalRecord.waitForDeployment();

  // Log the deployed contract address
  console.log("✅ MedicalRecord contract deployed to:", await medicalRecord.getAddress());
}

// Run the deployment
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
