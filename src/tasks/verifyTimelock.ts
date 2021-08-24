import { task } from 'hardhat/config'
import { TIMELOCK_DELAY, MULTISIG } from '../contants'

task('verify:timelock', 'Verifies Timelock governance', async(args, hre) => {
  await hre.run('verify:verify', {
    address: '0x933dcf4b58d3ae8fb0cde6e10e22f6c0e062cdc1',
    contract: 'contracts/TimeLock.sol:Timelock',
    constructorArguments: [
      TIMELOCK_DELAY,
      [MULTISIG],
      [MULTISIG]
    ]
  })
})
