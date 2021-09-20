import { task } from 'hardhat/config'
import { TIMELOCK_DELAY } from '../contants'


task('encode-update-proxy-data', 'Encodes proxy data to update implementation')
  .addParam('proxy', 'Proxy address')
  .addParam('implementation', 'Implementation address')
  .setAction(async(args, hre) => {
    const abi = [
      "function updateImplementation(address _newProxyTo) public"
    ]
    const iface = new hre.ethers.utils.Interface(abi);
    const encodedData = iface.encodeFunctionData("updateImplementation", [args.implementation])

    console.log({
      "target": args.proxy,
      "value": hre.ethers.utils.hexlify(0),
      "data": encodedData,
      "predecessor": "0x0",
      "salt": hre.ethers.utils.hexlify(new Date().getTime()),
      "delay": TIMELOCK_DELAY
    })
  })
