const fs = require("fs")
const { network } = require("hardhat")
const frontEndContractsFile="../React/constant/contractAbi.json";
const frontEndAbiFile= "../React/constant/contractAddress.json";



module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Writing to front end...")
        await updateContractAddresses()
        await updateAbi()
        console.log("Front end written!")
    }
}


async function updateAbi() {
    const medRecord = await ethers.getContract("Record")
    fs.writeFileSync(frontEndAbiFile, medRecord.interface.format(ethers.utils.FormatTypes.json))
}

async function updateContractAddresses() {
    const medRecord = await ethers.getContract("Record")
    const contractAddresses = JSON.parse(fs.readFileSync(frontEndContractsFile, "utf8"))
    const chainId=network.config.chainId.toString()
    if ( chainId in contractAddresses) {
        if (!contractAddresses[chainId].includes(medRecord.address)) {
            contractAddresses[chainId]=medRecord.address
        }
    } else {
        contractAddresses[chainId] = [medRecord.address]
    }
    fs.writeFileSync(frontEndContractsFile, JSON.stringify(contractAddresses))
}

module.exports.tags = ["all", "frontend"]