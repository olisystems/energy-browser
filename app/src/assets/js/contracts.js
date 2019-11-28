import EnergyProduction from "./contracts/EnergyProduction.json";
import EnergyConsumption from "./contracts/EnergyConsumption.json";
import OliCoin from "./contracts/OliCoin.json";
import AssetLogging from "./contracts/AssetLogging.json";
import web3 from "./web3";

export default class Contracts {

    ProductionContract = null;
    ConsumptionContract = null;
    OliCoinContract = null;
    AssetLoggingContract = null;

    async start() {

        // get contract instance
        //This method find the network id to retrieve the configuration from truffle-config.js file
        const networkId = await web3.eth.net.getId();
        // Retrieve the Network configuration from truffle-config.js file
        const energyProductionDeployed = EnergyProduction.networks[networkId];
        const energyConsumptionDeployed = EnergyConsumption.networks[networkId];
        const oliCoinDeployed = OliCoin.networks[networkId];
        const loggingDeployed = AssetLogging.networks[networkId];

        // Initializing the contracts
        this.ProductionContract = new web3.eth.Contract(
            EnergyProduction.abi,
            energyProductionDeployed.address
        );



        // Initializing the contracts
        this.ConsumptionContract = new web3.eth.Contract(
            EnergyConsumption.abi,
            energyConsumptionDeployed.address
        );

        // Initializing the contracts
        this.OliCoinContract = new web3.eth.Contract(
            OliCoin.abi,
            oliCoinDeployed.address
        );



        // Initializing the contracts
        this.AssetLoggingContract = new web3.eth.Contract(
            AssetLogging.abi,
            loggingDeployed.address
        );

        //console.log(JSON.stringify(AssetLogging.abi));

    }
}
