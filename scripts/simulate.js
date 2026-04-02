import hre from "hardhat";

//REMEMBERRR THIS SCRIPT IS FOR TERMINAL TESTING OF THE CONTRACTS EFFICACY!

async function main() {
  //DEPLOYED ADDRESS. REMEMBER TO ALWAYS UPDATE THIS DURING DIFF COMPILES
  const rawAddress = "0x23eb6427d1AAeCD4711Ea1BC48d366DC0468b37f"; 
  
  const contractAddress = hre.ethers.getAddress(rawAddress);
  
  const [signer] = await hre.ethers.getSigners();

  const insurance = await hre.ethers.getContractAt(
    "DroughtInsurance", 
    contractAddress, 
    signer
  );

  console.log("!!! Starting InsurTech Automated Payout Demo !!!");
  
  console.log("1. Funding the policy (Capital Backing)...");
  //Sending 0.01 ETH as inusrer guarantee
  const fundTx = await insurance.fundPolicy({ 
    value: hre.ethers.parseUnits("0.01", "ether") 
  });
  
  await fundTx.wait();
  console.log("Smart Contract is now funded!!!\n");

  console.log("Reporting Rainfall: less than threshold(50mm)");
  const reportTx = await insurance.reportWeather(20);
  const receipt = await reportTx.wait();

  // Fix: Correct way to check logs for the payout event in v6
  if (receipt.logs.length > 0) {
     console.log("BLOCKCHAIN TRIGGER! DROUGHT DETECTED");
     console.log("Automated payout sent successfully to Farmer!");
  }
}

main().catch((error) => {
  console.error("Simulation Error:", error.message);
  process.exitCode = 1;
});