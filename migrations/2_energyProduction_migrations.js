const EnergyProduction = artifacts.require("EnergyProduction");

module.exports = function (deployer) {
    deployer.deploy(EnergyProduction);
};