<template>
  <div class="home">
    <section class="home__hero">
      <div class="home__hero--box">
        <h1 class="heading heading--main">OLI DAPPs</h1>
        <h2 class="heading heading--sub">Ethereum Based Dapps</h2>

        <a href="#dapps" class="btn btn--white btn--animated">Discover Dapps</a>
      </div>
    </section>
    <section class="home__stack">
      <h1 class="heading heading--primary">
        Overview of the Development Stack
      </h1>
      <div class="wrapper__flex">
        <div class="wrapper__flex--item">
          <div>
            <img src="../../assets/img/ethereum.png" alt="" class="item__img" />
          </div>

          <div class="item__description">
            <h3 class="item__description--title">Ethereum</h3>
            <p class="item__description--details">
              Ethereum is a decentralized platform that runs smart contracts.
            </p>
          </div>
        </div>

        <div class="wrapper__flex--item">
          <div>
            <img src="../../assets/img/solidity.png" alt="" class="item__img" />
          </div>

          <div class="item__description">
            <h3 class="item__description--title">Solidity</h3>
            <p class="item__description--details">
              Solidity is an object-oriented, high-level language for
              implementing smart contracts.
            </p>
          </div>
        </div>

        <div class="wrapper__flex--item">
          <div>
            <img src="../../assets/img/truffle.png" alt="" class="item__img" />
          </div>

          <div class="item__description">
            <h3 class="item__description--title">Truffle Framework</h3>
            <p class="item__description--details">
              Truffle is the most popular development framework for Ethereum
              with a mission to make your life a whole lot easier.
            </p>
          </div>
        </div>

        <div class="wrapper__flex--item">
          <div>
            <img src="../../assets/img/web3.jpeg" alt="" class="item__img" />
          </div>

          <div class="item__description">
            <h3 class="item__description--title">Web3.js</h3>
            <p class="item__description--details">
              A collection of libraries which allow interacting with a local or
              remote ethereum node, using an HTTP or IPC connection.
            </p>
          </div>
        </div>

        <div class="wrapper__flex--item">
          <div>
            <img src="../../assets/img/vue.png" alt="" class="item__img" />
          </div>

          <div class="item__description">
            <h3 class="item__description--title">Vue.js</h3>
            <p class="item__description--details">
              The JavaScript framework for the frontend and handling all the
              view-related stuff.
            </p>
          </div>
        </div>

        <div class="wrapper__flex--item">
          <div>
            <img src="../../assets/img/leaflet.png" alt="" class="item__img" />
          </div>

          <div class="item__description">
            <h3 class="item__description--title">Leaflet.js</h3>
            <p class="item__description--details">
              Leaflet is an open source JavaScript library used to build web
              mapping applications.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="home__features">
      <div class="wrapper__flex">
        <div class="wrapper__flex--item">
          <div class="item__description">
            <h3 class="item__description--title">Volta Testnet</h3>
            <p class="item__description--details">
              Volta is the pre-production test network of the EnergyWeb Chain.
              It is nearly identical to the production chain, main net.
            </p>
          </div>
        </div>

        <div class="wrapper__flex--item">
          <div class="item__description">
            <h3 class="item__description--title">Smart Contracts</h3>
            <p class="item__description--details">
              Smart contracts are applications that run on the Ethereum Virtual
              Machine and execute automatically when the requirements are met.
            </p>
          </div>
        </div>

        <div class="wrapper__flex--item">
          <div class="item__description">
            <h3 class="item__description--title">Web3 js</h3>
            <p class="item__description--details">
              A collection of libraries which allow interacting with a local or
              remote ethereum node, using an HTTP or IPC connection.
            </p>
          </div>
        </div>

        <div class="wrapper__flex--item">
          <div class="item__description">
            <h3 class="item__description--title">Vue js</h3>
            <p class="item__description--details">
              Vue.js is an open-source model–view–viewmodel front end JavaScript
              framework for building user interfaces and single-page
              applications.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="home__dapps" id="dapps">
      <h1 class="heading heading--primary">Most Exciting Dapps</h1>
      <div class="wrapper__flex">
        <div class="wrapper__flex--item">
          <div class="item__bg img-1"></div>

          <img
            class="item__profile-img"
            src="../../assets/img/OLI_logo.png"
            alt="item__profile-img"
          />

          <div class="item__description">
            <h3 class="item__description--title">Energy Browser</h3>
            <p class="item__description--details">
              The browser presents a transparent view of energy production and
              consumption. The dashboard shows the infographics from the
              Blockchain.
            </p>
          </div>
          <a href="http://oli-chain.com/browser" class="btn btn--blue">Open</a>
        </div>

        <div class="wrapper__flex--item">
          <div class="item__bg img-2"></div>

          <img
            class="item__profile-img"
            src="../../assets/img/OLI_logo.png"
            alt="item__profile-img"
          />

          <div class="item__description">
            <h3 class="item__description--title">Chain Explorer</h3>
            <p class="item__description--details">
              The browser presents a transparent view of energy production and
              consumption. The dashboard shows the infographics from the
              Blockchain.
            </p>
          </div>
          <a href="http://oli-chain.com/explorer" class="btn btn--blue">Open</a>
        </div>

        <div class="wrapper__flex--item">
          <div class="item__bg img-3"></div>

          <img
            class="item__profile-img"
            src="../../assets/img/OLI_logo.png"
            alt="item__profile-img"
          />

          <div class="item__description">
            <h3 class="item__description--title">OLI Tokenization</h3>
            <p class="item__description--details">
              The tokenization app it to incentivize the green energy producer
              with the ERC20 OLI utility token. In general, 1 OLC is awrded for
              1kWh production.
            </p>
          </div>
          <a href="http://oli-chain.com/tokenization" class="btn btn--blue"
            >Open</a
          >
        </div>

        <div class="wrapper__flex--item">
          <div class="item__bg img-4"></div>

          <img
            class="item__profile-img"
            src="../../assets/img/OLI_logo.png"
            alt="item__profile-img"
          />

          <div class="item__description">
            <h3 class="item__description--title">Asset Logging</h3>
            <p class="item__description--details">
              This application enables a DSO or TSO to transparently control
              assets in their respective grid area. Such as, the curtailment of
              PV in case of a local over-supply.
            </p>
          </div>
          <a href="http://oli-chain.com/logging" class="btn btn--blue">Open</a>
        </div>

        <div class="wrapper__flex--item">
          <div class="item__bg img-5"></div>

          <img
            class="item__profile-img"
            src="../../assets/img/OLI_logo.png"
            alt="item__profile-img"
          />

          <div class="item__description">
            <h3 class="item__description--title">Charging Origin</h3>
            <p class="item__description--details">
              The Charging Origin app keeps a record of events managing charging
              point power consumption and PV power generation data at a specific
              period of time.
            </p>
          </div>
          <a href="http://oli-chain.com/origin" class="btn btn--blue">Open</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.home {
  background-color: #f1eded;
  margin-bottom: -5rem;
}
</style>

