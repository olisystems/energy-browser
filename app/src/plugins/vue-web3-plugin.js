import Web3 from "web3";

export default {

    install(Vue, options) {

        (async function () {

            window.web3 = new Web3(
                new Web3(options.url)
            );


        }())

    }
}
