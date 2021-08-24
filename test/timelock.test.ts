/* eslint-disable camelcase */
import { ethers } from 'hardhat'
import { Signer, utils } from 'ethers'
import { TIMELOCK_DELAY, STAKE_MANAGER } from '../src/contants'
import { Timelock, Timelock__factory } from '../src/types'
import { expect } from 'chai'
import { increaseTime } from '../src/evm'

describe('Timelock', function() {
  let admin: Signer
  let newProposer: Signer
  let multisig: Signer
  let timelock: Timelock

  function deploy({ renounceAdmin = false } = {}) {
    before(async function() {
      [admin, newProposer, multisig] = await ethers.getSigners()

      const artifact = await ethers.getContractFactory('Timelock', {
        signer: admin
      }) as Timelock__factory

      const multisigAddr = await multisig.getAddress()
      timelock = await artifact.deploy(86400 * 2, [multisigAddr], [multisigAddr])
      await timelock.deployed()

      if (renounceAdmin) {
        await timelock.connect(admin).renounceRole(await timelock.TIMELOCK_ADMIN_ROLE(), await admin.getAddress())
      }
    })
  }

  describe('when deployer renounces admin role', function() {
    deploy()

    it('should renounce deployer as admin', async function() {
      await timelock.connect(admin).renounceRole(await timelock.TIMELOCK_ADMIN_ROLE(), await admin.getAddress())
    })

    it('reverts when deployer tries to add new proposer', async function() {
      await expect(timelock.connect(admin).grantRole(await timelock.PROPOSER_ROLE(), await newProposer.getAddress())).to.be.revertedWith('AccessControl: sender must be an admin to grant')
    })
  })

  describe('when executor and proposer grants a role', function() {
    deploy()

    let calldata: string

    it('should grant an executor role', async function() {
      calldata = timelock.interface.encodeFunctionData('grantRole', [await timelock.PROPOSER_ROLE(), await newProposer.getAddress()])
      await timelock.connect(multisig).schedule(
        timelock.address,
        0,
        calldata,
        utils.formatBytes32String(''),
        utils.formatBytes32String('salt'),
        TIMELOCK_DELAY
      )

      await increaseTime(TIMELOCK_DELAY + 1)

      await timelock.connect(multisig).execute(
        timelock.address,
        0,
        calldata,
        utils.formatBytes32String(''),
        utils.formatBytes32String('salt')
      )
    })

    it('new address should have executor role', async function() {
      // eslint-disable-next-line no-unused-expressions
      expect(
        await timelock.hasRole(await timelock.PROPOSER_ROLE(), await newProposer.getAddress())
      ).to.be.true
    })
  })

  describe('when tx is being executed too early', function() {
    deploy({ renounceAdmin: true })

    it('should schedule tx', async function() {
      await timelock.connect(multisig).schedule(
        STAKE_MANAGER,
        0,
        '0xe6692f49000000000000000000000000000000000000000000000000000000000000006f',
        utils.formatBytes32String(''),
        utils.formatBytes32String('salt'),
        TIMELOCK_DELAY
      )
    })

    it('should revert when executed before the delay', async function() {
      await expect(
        timelock.connect(multisig).execute(
          STAKE_MANAGER,
          0,
          '0xe6692f49000000000000000000000000000000000000000000000000000000000000006f',
          utils.formatBytes32String(''),
          utils.formatBytes32String('salt')
        )
      ).to.be.revertedWith('TimelockController: operation is not ready')
    })
  })

  describe('when tx is being executed after a delay', function() {
    deploy({ renounceAdmin: true })

    it('should schedule tx', async function() {
      await timelock.connect(multisig).schedule(
        STAKE_MANAGER,
        0,
        '0xe6692f49000000000000000000000000000000000000000000000000000000000000006f',
        utils.formatBytes32String(''),
        utils.formatBytes32String('salt'),
        TIMELOCK_DELAY
      )
    })

    it('should execute tx', async function() {
      await increaseTime(TIMELOCK_DELAY + 1)

      await timelock.connect(multisig).execute(
        STAKE_MANAGER,
        0,
        '0xe6692f49000000000000000000000000000000000000000000000000000000000000006f',
        utils.formatBytes32String(''),
        utils.formatBytes32String('salt')
      )
    })

    it('should revert when executed again', async function() {
      await expect(
        timelock.connect(multisig).execute(
          STAKE_MANAGER,
          0,
          '0xe6692f49000000000000000000000000000000000000000000000000000000000000006f',
          utils.formatBytes32String(''),
          utils.formatBytes32String('salt')
        )
      ).to.be.revertedWith('TimelockController: operation is not ready')
    })
  })
})
