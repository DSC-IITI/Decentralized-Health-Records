// imports
const { ethers, run, network } = require("hardhat")

// async main
async function main() {
  const MedicalRecord = await ethers.getContractFactory("Record")
  console.log("Deploying contract...")
  const medicalRecord = await MedicalRecord.deploy()
  await medicalRecord.deployed();
  console.log(`deployed contract to : ${medicalRecord.address}`);

  // Not functionable in version 6^ ethers ----->
  
  // await medicalRecord.deployed()
  // console.log(Deployed contract to: ${medicalRecord.address})

  //______________________________________________
  
  // what happens when we deploy to our hardhat network?
  // if (network.config.chainId === 11155111) {
  // console.log("Waiting for block confirmations...")


    
  // }


}



// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })