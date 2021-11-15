import { task } from 'hardhat/config'
import { TIMELOCK_DELAY } from '../contants'


task('encode-update-data', 'Encodes data to update params')
  .addParam('data', 'Encoded data')
  .addParam('target', 'Target address')
  .setAction(async(args, hre) => {
    console.log({
      "target": args.target,
      "value": hre.ethers.utils.hexlify(0),
      "data": args.data,
      "predecessor": "0x0",
      "salt": hre.ethers.utils.hexlify(new Date().getTime()),
      "delay": TIMELOCK_DELAY
    })
  })
