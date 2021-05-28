import { deployContract } from './deployer'
import { ethers } from 'hardhat'

async function main() {
  const accounts = await ethers.getSigners()

  console.log('Accounts:', accounts.map(a => a.address))

  // We get the contract to deploy
  await deployContract('Timelock', accounts[0], 43200, [accounts[0].address], [accounts[0].address])
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
