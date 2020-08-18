pragma solidity 0.5.0;

import "./PetWallet.sol";

contract PetWalletFactory {
  /*
   *  Events
   */

  event ContractInstantiation(uint petId, address petOwner, address instantiatin, uint targetFund, uint deadLine, string purpose);

  /*
   * Storage
   */

  mapping(address => address[]) public petAddresses;

  /// @dev Allows verified creation of a pet wallet.
  // @param _pedId: id of pet
  // @param _targetFund: target of fund want to saving
  // @param _deadLine: target number of days saving money
  // @param _purpose: purpose of saving money
  /// @return Returns wallet address.
  function create(uint _petId, uint _targetFund, uint _deadLine, string memory _purpose)
    public
    returns (address petAddress)
  {
    petAddress = address(new PetWallet(msg.sender, _petId, _targetFund, _deadLine, _purpose));
    petAddresses[msg.sender].push(petAddress);
    emit ContractInstantiation(_petId, msg.sender, petAddress, _targetFund, _deadLine, _purpose);

    return petAddress;
  }

  function getAllPetAddressOf(address _petOwner) public view returns (address[] memory) {
    return petAddresses[_petOwner];
  }
}
