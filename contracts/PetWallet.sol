pragma solidity 0.5.0;

import './SafeMath.sol';

contract PetWallet {
  using SafeMath for uint;
  /*
   * Storage
   */

  address payable petOwner;
  uint public petId;
  uint public targetFund;
  uint public duration;
  string public purpose;
  uint public providentFund;
  uint public initialTime;
  uint public growthTime;
  uint public lastTimeSavingMoney;
  uint public lastTimeWithdrawMoney;
  bool public isFreezing;
  uint public nextTimeFreezing;

  /*
   * Events
   */

   event SavingMoney(uint amoutSaving, uint sendTime);
   event WithDrawMoney(uint amount, uint time);

  /*
   * Modifiers
   */

  modifier validTransaction(uint _value) {
    require(_value > 0, 'should send with a value');
    require(msg.value >= _value * 1 ether, 'can not send msg.value less than target value');
    _;
  }

  modifier onlyOwner() {
    require(msg.sender == petOwner, 'only owner can send money to their wallet');
    _;
  }

  modifier enoughMoney(uint _amount) {
    require(address(this).balance >= _amount * 1 ether, 'not enough money to perform');
    _;
  }

  /// @dev Contract constructor sets initial owner of wallet and initial time.
  constructor(address payable _owner, uint _id, uint _targetFund, uint _duration, string memory _purpose) public {
    petOwner = _owner;
    petId = _id;
    targetFund = _targetFund;
    duration = _duration * 1 days;
    purpose = _purpose;
    initialTime = now;
    lastTimeSavingMoney = now;
    nextTimeFreezing = now + 3 days;
  }

  // @dev Allows to owner send money to their wallet.
  // @param _sendValue: amount of money want to saving.
  function savingMoney(uint _sendValue)
    payable
    public
    validTransaction(_sendValue)
  {
  if (msg.value > (_sendValue * 1 ether)) {
    msg.sender.transfer(msg.value.sub(_sendValue * 1 ether));
  }
  providentFund = providentFund.add(_sendValue);

  if(lastTimeSavingMoney > lastTimeWithdrawMoney) {
    if(now > nextTimeFreezing) {
      growthTime += 3 days;
    } else {
      growthTime = growthTime.add(now.sub(lastTimeSavingMoney));
    }
  }

  isFreezing = false;
  lastTimeSavingMoney = now;
  nextTimeFreezing = now + 3 days;

  emit SavingMoney(_sendValue, now);
  }

  // @dev Allows to owner withdraw money in their wallet.
  // @param _amount: amount of money want to withdraw.
  function withdrawMoney(uint _amount)
    public
    enoughMoney(_amount)
  {
    require(_amount > 0, 'can not withdraw with 0 value');
    if(lastTimeWithdrawMoney <= lastTimeSavingMoney) {
      growthTime = growthTime.add(now.sub(lastTimeSavingMoney));
    }

    petOwner.transfer(_amount * 1 ether);
    providentFund = providentFund.sub(_amount);
    lastTimeWithdrawMoney = now;

    if(!isFreezing) {
      isFreezing = true;
    }

    emit WithDrawMoney(_amount, now);
  }

  // @dev Allows to check current status is freezing or not.
  // if more than 3 days not feed your pet, pet's growth time will be freezing
  function checkIsFreezing() public returns (bool) {
    if(now.sub(lastTimeSavingMoney) > (3 days)) {
      isFreezing = true;
    }

    return isFreezing;
  }

  // @dev Allows to get all infomations of this pet
  function getInformation() public view returns (uint, uint, uint, uint, uint, string memory) {
      return (petId, providentFund, growthTime, targetFund, duration, purpose);
  }

  // @dev Change pet's owner
  // @params _newOwner : Address of new owner
  function changeOwner(address payable newOwner) public onlyOwner() {
    petOwner = newOwner;
  }

  function() external payable  {
      this.savingMoney.value(msg.value)(msg.value / 1 ether);
  }
}
