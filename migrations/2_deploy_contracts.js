//var token = artifacts.require("Token.sol");
var masterwill = artifacts.require("Will.sol");

module.exports = function(deployer) {
    deployer.deploy(masterwill);
}
