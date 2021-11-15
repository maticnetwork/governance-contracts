import { task } from 'hardhat/config'
import { TIMELOCK_DELAY } from '../contants'


task('encode-update-governance-data', 'Encodes governance data to update params')
  .addParam('data', 'Encoded data')
  .addParam('contract', 'Target contract address to update')
  .addParam('target', 'Governance address')
  .setAction(async(args, hre) => {
    const abi = [
      "function update(address target, bytes memory data) public"
    ]
    const iface = new hre.ethers.utils.Interface(abi);
    const encodedData = iface.encodeFunctionData("update", [args.contract, args.data])

    console.log({
      "target": args.target,
      "value": hre.ethers.utils.hexlify(0),
      "data": encodedData,
      "predecessor": "0x0",
      "salt": hre.ethers.utils.hexlify(new Date().getTime()),
      "delay": TIMELOCK_DELAY
    })
  })
