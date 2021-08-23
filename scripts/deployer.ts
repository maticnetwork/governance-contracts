/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Signer } from '@ethersproject/abstract-signer'
import { Contract } from '@ethersproject/contracts'
import { ethers } from 'hardhat'

export async function deployContract(artifactName: string, from: Signer, ...args: any[]): Promise<Contract> {
  const artifact = await ethers.getContractFactory(artifactName, {
    signer: from
  })
  const contract = await artifact.deploy(...args)
  const deployed = await contract.deployed()

  console.log(`${artifactName} deployed to: ${deployed.address}`)

  return deployed
}
