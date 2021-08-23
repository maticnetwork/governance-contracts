import { deployContract } from './deployer'
import { ethers } from 'hardhat'
import { TIMELOCK_DELAY, MULTISIG } from '../src/contants'
import { Timelock } from '../src/types'

async function main() {
  const accounts = await ethers.getSigners()
  // We get the contract to deploy
  const contractInstance = await deployContract('Timelock', accounts[0], TIMELOCK_DELAY, [MULTISIG], [MULTISIG]) as Timelock
  await contractInstance.connect(accounts[0]).renounceRole(
    await contractInstance.TIMELOCK_ADMIN_ROLE(),
    await accounts[0].getAddress()
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
