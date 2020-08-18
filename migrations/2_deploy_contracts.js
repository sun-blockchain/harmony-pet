const PetWalletFactory = artifacts.require('PetWalletFactory');

module.exports = function(deployer) {
  deployer.deploy(PetWalletFactory);

  // deployer.deploy(PetWalletFactory).then((detail) => {
  //   address = '{' + '\n' + '"address":' + '"' + detail.constructor.address + '"' + '\n' + '}';
  //   fs.writeFile(
  //     './client/src/contractsAddress/PetWalletFactory_Address.json',
  //     address,
  //     'utf8',
  //     (err) => {}
  //   );
  // });
};
