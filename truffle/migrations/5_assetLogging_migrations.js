const AssetLogging = artifacts.require("AssetLogging");

module.exports = function (deployer) {
    deployer.deploy(AssetLogging);
};