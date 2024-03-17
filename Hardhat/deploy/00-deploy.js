
const { ethers, run, network } = require("hardhat")
async function main() {
  const Ownable = await ethers.getContractFactory("ownable")
  console.log("Deploying contract...")
  const ownable = await Ownable.deploy()
  await ownable.deployed();
  console.log(`deployed contract to : ${ownable.address}`)

  


}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })