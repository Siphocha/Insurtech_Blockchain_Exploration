import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("🚀 Deploying with account:", deployer.address);

  //Constants just for this MVP. may change in type as research scales for Capstone.
  const farmerAddress = deployer.address; 
  const oracleAddress = deployer.address; 
  const rainfallThreshold = 50; // mm
  const payoutAmount = hre.ethers.parseEther("0.01"); 

  const Insurance = await hre.ethers.getContractFactory("DroughtInsurance");
  const insurance = await Insurance.deploy(
    farmerAddress, 
    oracleAddress, 
    rainfallThreshold, 
    payoutAmount
  );

  await insurance.waitForDeployment();
  const address = await insurance.getAddress();

  console.log(`\nMVP Deployed to Sepolia: ${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});