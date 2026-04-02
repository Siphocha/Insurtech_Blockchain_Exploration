# AgroShield 🌾

AgroShield is a test of decentralized microinsurance payments platform built for smallholder farmers in mind. By leveraging the EVM, it provides automated and trusted payouts. All triggered by verifiable weather data. (However, in this case)

## Features
* **Logic:** Payouts are hardcoded based on environmental data, since this is an MVP PoC.
* **Automated Claims:** The contract pays out instantly upon threshold reached of milimetres per rain.
* **Oracle Integration:** Secure data security through a mandated Oracle address
* **Web3 Frontend:** UI with tailwind CSS and Ether.js

## Tech Stack
* **Smart Contracts:** Solidity, Hardhat
* **Frontend:** HTML5, Tailwind CSS, JavaScript (Ethers.js)
* **Network:** Infura and Ethereum Sepolia Testnet. Remember. SEPOLIA TESTNET

## Quick Start w Help

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.js
```
