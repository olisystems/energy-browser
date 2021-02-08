/* eslint-disable */
import Web3 from "web3";

export default {
  install(Vue, options) {
    (async function () {
      const getProvider = () => {
        const provider = new Web3.providers.WebsocketProvider(options.url);
        provider.on("connect", () => console.log("WS Connected"));
        provider.on("error", (e) => {
          console.error("WS Error", e);
          provider.setProvider(getProvider());
        });
        provider.on("end", (e) => {
          console.error("WS End", e);
          provider.setProvider(getProvider());
        });

        return provider;
      };
      window.web3 = new Web3(getProvider());
    })();
  },
};
