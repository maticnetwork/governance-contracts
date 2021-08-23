/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers, network } from 'hardhat'

export const getTime = async(): Promise<number> => (await ethers.provider.getBlock('latest')).timestamp

export const setTime = (timestamp: number): Promise<any> => {
  return network.provider.send('evm_setNextBlockTimestamp', [timestamp])
}

export const increaseTime = async(delta: number): Promise<any> => {
  const now = await getTime()
  return setTime(now + delta)
}
