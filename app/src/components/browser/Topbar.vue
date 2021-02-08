<template>
  <div class="top-bar">
    <div class="bar">
      <div>
        <p>Total Producer</p>
        <img src="../../assets/img/loader.svg" alt="spinner by loading.io" class="pro-loader" />
        <h4>{{producers}}</h4>
      </div>
      <div>
        <p>Total Consumer</p>
        <img src="../../assets/img/loader.svg" alt="spinner by loading.io" class="cons-loader" />
        <h4>{{consumers}}</h4>
      </div>
      <div>
        <p>Gas Price [Gwei]</p>
        <h4>18</h4>
      </div>
      <div>
        <p>Latest Block Number</p>
        <img src="../../assets/img/loader.svg" alt="spinner by loading.io" class="block-loader" />
        <h4>{{latestBlock}}</h4>
      </div>
      <div>
        <p>Transactions in Latest Block</p>
        <img src="../../assets/img/loader.svg" alt="spinner by loading.io" class="tx-loader" />
        <h4>{{transactions}}</h4>
      </div>
      <div>
        <p>Gas Used [mgas]</p>
        <img src="../../assets/img/loader.svg" alt="spinner by loading.io" class="gas-loader" />
        <h4>{{gas}}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import web3 from "../../assets/js/web3";
const $ = require("jquery");
import Contracts from "../../assets/js/contracts";
import { setInterval } from "timers";
export default {
  name: "Topbar",
  Contracts: null,
  data() {
    return {
      producers: "",
      consumers: "",
      latestBlock: "",
      transactions: "",
      gas: ""
    };
  },
  methods: {
    async getProducers() {
      this.Contracts.ProductionContract.methods
        .countProducers()
        .call({ from: "0x4df329c10fb40e6d89b2cf9f89f982727b96d26f" })
        .then(result => {
          this.producers = result;
        });
      $(".pro-loader").hide();
    },
    async getConsumers() {
      this.Contracts.ConsumptionContract.methods
        .countConsumers()
        .call({ from: "0x4df329c10fb40e6d89b2cf9f89f982727b96d26f" })
        .then(result => {
          this.consumers = result;
        });
      $(".cons-loader").hide();
    },
    getLatestBlockNumber() {
      setInterval(() => {
        web3.eth.getBlockNumber().then(blockNumber => {
          this.latestBlock = blockNumber;
          $(".block-loader").hide();
        });
      }, 5000);
    },
    getTransactions() {
      setInterval(() => {
        web3.eth.getBlockTransactionCount("latest").then(count => {
          this.transactions = count;
          $(".tx-loader").hide();
        });
      }, 5000);
    },
    getGasPrice() {
      setInterval(() => {
        web3.eth.estimateGas(web3.eth.getBlock("latest")).then(price => {
          this.gas = (price / 1000000).toFixed(2);
          $(".gas-loader").hide();
        });
      }, 5000);
    },
    callFunc() {
      this.getProducers();
      this.getConsumers();
      this.getLatestBlockNumber();
      this.getTransactions();
      this.getGasPrice();
    }
  },
  async created() {
    this.Contracts = new Contracts();
    await this.Contracts.start();
    this.callFunc();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-bar {
  background-color: rgb(241, 237, 237);
}

.bar {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 4.5rem;
}

img {
  width: 2rem;
  height: 2rem;
}

h4 {
  font-size: calc(1vw + 1vh + 1vmin);
  margin-bottom: 0.7rem;
  margin-top: 0.7rem;
  color: #394f7c;
}

p {
  font-size: calc(0.5vw + 0.5vh + 0.5vmin);
}

@media only screen and (max-width: 48em) {
  .bar {
    flex-direction: column;
  }

  .bar > div:after {
    content: "";
    display: block;
    margin: 0 auto;
    width: 80%;
    border-bottom: 1px solid rgb(255, 140, 0);
  }

  .bar > div:last-child::after {
    border-bottom: none;
  }

  p {
    font-size: calc(0.7vw + 0.7vh + 1.2vmin);
  }

  h4 {
    font-size: calc(1.2vw + 1.2vh + 1.5vmin);
  }
}

@media only screen and (max-width: 750px) {
  img {
    width: calc(1.2vw + 1.2vh + 1.5vmin);
    height: calc(1.2vw + 1.2vh + 1.5vmin);
  }
}
</style>
