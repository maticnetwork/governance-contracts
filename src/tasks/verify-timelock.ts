import { task } from 'hardhat/config'
import { TIMELOCK_DELAY, MULTISIG } from '../contants'

task('verify:timelock', 'Verifies Timelock governance', async(args, hre) => {
  await hre.run('verify:verify', {
    address: '0xCaf0aa768A3AE1297DF20072419Db8Bb8b5C8cEf',
    contract: 'contracts/TimeLock.sol:Timelock',
    constructorArguments: [
      TIMELOCK_DELAY,
      [MULTISIG],
      [MULTISIG]
    ]
  })
})
