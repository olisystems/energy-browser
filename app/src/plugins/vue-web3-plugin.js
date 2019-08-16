import Web3 from "web3";

export default {

    install(Vue, options) {

        (async function () {
            // modern dapp browser
            if (window.ethereum) {
                window.web3 = new Web3(ethereum);
                try {
                    // request account access if needed
                    await ethereum.enable();
                } catch (error) {
                    console.log(error);
                }
                // legacy dapp browser
            } else if (window.web3) {
                window.web3 = new Web3(web3.currentProvider);
                // accounts always exposed
            } else {
                console.log("Non-Ethereum browser");
                console.log(options.url);
                // fallback 
                window.web3 = new Web3(
                    new Web3(options.url)
                );
            }

        }())

    }
}
