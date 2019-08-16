const EnergyConsumption = artifacts.require("EnergyConsumption");

module.exports = function (deployer) {
    deployer.deploy(EnergyConsumption);
};