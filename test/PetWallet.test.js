const chai = require('chai');
const { expect } = chai;
const { expectRevert } = require('openzeppelin-test-helpers');

var PetWallet = artifacts.require('PetWallet');

contract('Testing PetWallet contract', async ([_, owner, owner1]) => {
  let petWallet;

  describe('#savingMoney', async () => {
    before(async () => {
      petWallet = await PetWallet.new(owner, 0, 5, 5, 'saving');
      providentFund = await petWallet.providentFund();
    });

    it('petWallet information', async () => {
      let information = await petWallet.getInformation();
      assert(information[0].toNumber() == 0, 'petId');
      assert(information[1].toNumber() == 0, 'providentFund');
      assert(information[2].toNumber() == 0, 'growTime');
      assert(information[3].toNumber() == 5, 'targetFund');
      assert(information[4].toNumber() == 5 * 24 * 3600, 'duration');
      assert.deepEqual(information[5], 'saving', 'purpose');
    });

    it('only owner', async () => {
      await expectRevert(
        petWallet.savingMoney(1, { value: 10 ** 18, from: owner1 }),
        'only owner can send money to their wallet'
      );
    });

    it('validTransaction', async () => {
      await expectRevert(
        petWallet.savingMoney(0, { value: 0, from: owner }),
        'should send with a value'
      );
      await expectRevert(
        petWallet.savingMoney(2, { value: 10 ** 18, from: owner }),
        'can not send msg.value less than target value'
      );
    });

    it('providentFund increase', async () => {
      await petWallet.savingMoney(2, { value: 2 * 10 ** 18, from: owner });
      let newProvidentFund = await petWallet.providentFund();
      assert(
        newProvidentFund.toNumber() == providentFund.toNumber() + 2,
        'providentFund need increase'
      );
    });

    it('freezingTime', async () => {
      let isFreezing = await petWallet.isFreezing();
      assert.isNotTrue(isFreezing, 'After savingMoney, isFreezing should be false');
    });

    it('send more money', async () => {
      let providentFund = await petWallet.providentFund();
      await petWallet.savingMoney(2, { value: 3 * 10 ** 18, from: owner });
      let newProvidentFund = await petWallet.providentFund();
      assert(
        newProvidentFund.toNumber() == providentFund.toNumber() + 2,
        'providentFund should be same as money params'
      );
    });

    it('nextTimeFreezing', async () => {
      let lastTimeSavingMoney = await petWallet.lastTimeSavingMoney();
      let nextTimeFreezing = await petWallet.nextTimeFreezing();
      let days = 3;
      assert(
        lastTimeSavingMoney.toNumber() + days * 24 * 3600 == nextTimeFreezing.toNumber(),
        'growthTime should be frozen after 3 days without savingMoney'
      );
    });
  });

  describe('#withdrawMoney', async () => {
    before(async () => {
      petWallet = await PetWallet.new(owner, 0, 5, 5, 'withdraw');
      providentFund = await petWallet.providentFund();
      await petWallet.savingMoney(3, { value: 3 * 10 ** 18, from: owner });
    });

    it('only owner', async () => {
      await expectRevert(
        petWallet.withdrawMoney(1, { from: owner1 }),
        'only owner can send money to their wallet'
      );
    });

    it('enoughMoney', async () => {
      await expectRevert(
        petWallet.withdrawMoney(5, { from: owner }),
        'not enough money to perform'
      );
    });

    it('freezingTime', async () => {
      petWallet.withdrawMoney(1, { from: owner });
      await petWallet.checkIsFreezing();
      let isFreezing = await petWallet.isFreezing();
      assert.isTrue(isFreezing, 'After withdrawMoney, isFreezing should be true');
    });

    it('providentFund', async () => {
      await petWallet.withdrawMoney(1, { from: owner });
      let providentFund = await petWallet.providentFund();
      assert(providentFund.toNumber() == 1, 'providentFund should be decrease 1 one');
    });
  });
});
