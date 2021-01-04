<template>
  <div class="landing-page">
    <div class="landing">
      <div class="landing__heading-box">
        <h1 class="heading-primary">
          <span class="heading-primary--main">OLI DAPPs</span>
          <span class="heading-primary--sub">Ethereum Based Dapps</span>
        </h1>

        <a href="#section-dapps" class="btn btn--white btn--animated"
          >Discover Dapps</a
        >
      </div>
    </div>
    <main>
      <section class="section-about" id="section-about">
        <div class="u-center-text u-margin-bottom-big">
          <h2 class="heading-secondary">
            Decentralized Apps on the top of Ethereum Network
          </h2>
        </div>

        <div class="row">
          <div class="col-1-of-2">
            <h3 class="heading-tertiary u-margin-bottom-small">
              A collection of Decentralized applications
            </h3>
            <p class="paragraph">
              OLI dApps portal is a collection of Decentralized applications
              built on the top of Volta Ethereum network.
            </p>

            <h3 class="heading-tertiary u-margin-bottom-small">
              Overview of the stack
            </h3>
            <div class="paragraph">
              <ul>
                <li>
                  <b>Ethereum</b> - Ethereum is a decentralized platform that
                  runs smart contracts.
                </li>

                <li>
                  <b>Web3.js</b> - A collection of libraries which allow
                  interacting with a local or remote ethereum node, using an
                  HTTP or IPC connection.
                </li>

                <li>
                  <b>Vue.js</b> - The JavaScript framework for the frontend and
                  handling all the view-related stuff.
                </li>

                <li>
                  <b>Truffle Framework </b> - Truffle is the most popular
                  development framework for Ethereum with a mission to make your
                  life a whole lot easier.
                </li>
              </ul>
            </div>

            <a href="#section-features" class="btn-text">Learn more &rarr;</a>
          </div>

          <div class="col-1-of-2">
            <div class="composition" id="composition">
              <img
                src="../../assets/img/browser.png"
                alt="OLI Energy Browser App"
                class="composition__photo composition__photo--p1"
              />
              <img
                src="../../assets/img/explorer.png"
                alt="OLI Tokenization App"
                class="composition__photo composition__photo--p2"
              />
              <img
                src="../../assets/img/charging-origin.png"
                alt="OLI Charging Origin App"
                class="composition__photo composition__photo--p3"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="section-features" id="section-features">
        <div class="row">
          <div class="col-1-of-4">
            <div class="feature-box">
              <h3 class="heading-tertiary u-margin-bottom-small">
                Volta Test Network
              </h3>
              <p class="feature-box__text">
                Volta is the pre-production test network of the EnergyWeb Chain.
                It is nearly identical to the production chain, main net.
              </p>
            </div>
          </div>

          <div class="col-1-of-4">
            <div class="feature-box">
              <h3 class="heading-tertiary u-margin-bottom-small">
                Smart Contracts
              </h3>
              <p class="feature-box__text">
                Smart contracts are applications that run on the Ethereum
                Virtual Machine and execute automatically when the requirements
                are met.
              </p>
            </div>
          </div>

          <div class="col-1-of-4">
            <div class="feature-box">
              <h3 class="heading-tertiary u-margin-bottom-small">Web3 js</h3>
              <p class="feature-box__text">
                A collection of libraries which allow interacting with a local
                or remote ethereum node, using an HTTP or IPC connection.
              </p>
            </div>
          </div>

          <div class="col-1-of-4">
            <div class="feature-box">
              <h3 class="heading-tertiary u-margin-bottom-small">Vue js</h3>
              <p class="feature-box__text">
                Vue.js is an open-source model–view–viewmodel front end
                JavaScript framework for building user interfaces and
                single-page applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="section-dapps" id="section-dapps">
        <div class="u-center-text u-margin-bottom-big">
          <h2 class="heading-secondary">Most Exciting Dapps</h2>
        </div>

        <div class="row">
          <div class="col-1-of-5">
            <div class="card">
              <div class="card__side card__side--front">
                <div class="card__picture card__picture--1">&nbsp;</div>
                <h4 class="card__heading">
                  <span class="card__heading-span card__heading-span--1">
                    Charging Origin</span
                  >
                </h4>
                <div class="card__details">
                  <p class="paragrah-text">
                    The app keeps a record of events managing charging point
                    power consumption and PV power generation data at a specific
                    period of time.
                  </p>
                </div>
              </div>
              <div class="card__side card__side--back card__side--back-1">
                <div class="card__cta">
                  <div class="card__app-box">
                    <p class="card__app-prefix">OLI</p>
                    <p class="card__app-name">Charging Origin</p>
                  </div>
                  <a
                    href="http://oli-chain.com/origin"
                    class="btn btn--white btn--padding"
                    >Open</a
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="col-1-of-5">
            <div class="card">
              <div class="card__side card__side--front">
                <div class="card__picture card__picture--2">&nbsp;</div>
                <h4 class="card__heading">
                  <span class="card__heading-span card__heading-span--2">
                    Chain Explorer</span
                  >
                </h4>
                <div class="card__details">
                  <p class="paragrah-text">
                    The app explore the Blockchain data for a given smart
                    contract. The idea is to present the metadata information in
                    a human readable way.
                  </p>
                </div>
              </div>
              <div class="card__side card__side--back card__side--back-2">
                <div class="card__cta">
                  <div class="card__app-box">
                    <p class="card__app-prefix">OLI</p>
                    <p class="card__app-name">Chain Explorer</p>
                  </div>
                  <a
                    href="http://oli-chain.com/explorer"
                    class="btn btn--white btn--padding"
                    >Open</a
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="col-1-of-5">
            <div class="card">
              <div class="card__side card__side--front">
                <div class="card__picture card__picture--3">&nbsp;</div>
                <h4 class="card__heading">
                  <span class="card__heading-span card__heading-span--3">
                    Energy Browser</span
                  >
                </h4>
                <div class="card__details">
                  <p class="paragrah-text">
                    The browser presents a transparent view of energy production
                    and consumption. The dashboard shows the infographics from
                    the Blockchain.
                  </p>
                </div>
              </div>
              <div class="card__side card__side--back card__side--back-3">
                <div class="card__cta">
                  <div class="card__app-box">
                    <p class="card__app-prefix">OLI</p>
                    <p class="card__app-name">Energy Browser</p>
                  </div>
                  <a
                    href="http://oli-chain.com/browser"
                    class="btn btn--white btn--padding"
                    >Open</a
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="col-1-of-5">
            <div class="card">
              <div class="card__side card__side--front">
                <div class="card__picture card__picture--4">&nbsp;</div>
                <h4 class="card__heading">
                  <span class="card__heading-span card__heading-span--4">
                    OLI Tokenization</span
                  >
                </h4>
                <div class="card__details">
                  <p class="paragrah-text">
                    The tokenization app it to incentivize the green energy
                    producer with the ERC20 OLI utility token. In general, 1 OLC
                    is awrded for 1kWh production.
                  </p>
                </div>
              </div>
              <div class="card__side card__side--back card__side--back-4">
                <div class="card__cta">
                  <div class="card__app-box">
                    <p class="card__app-prefix">OLI</p>
                    <p class="card__app-name">Tokenization</p>
                  </div>
                  <a
                    href="http://oli-chain.com/tokenization"
                    class="btn btn--white btn--padding"
                    >Open</a
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="col-1-of-5">
            <div class="card">
              <div class="card__side card__side--front">
                <div class="card__picture card__picture--5">&nbsp;</div>
                <h4 class="card__heading">
                  <span class="card__heading-span card__heading-span--5">
                    Asset Logging</span
                  >
                </h4>
                <div class="card__details">
                  <p class="paragrah-text">
                    This application enables a DSO or TSO to transparently
                    control assets in their respective grid area. Such as, the
                    curtailment of PV in case of a local over-supply.
                  </p>
                </div>
              </div>
              <div class="card__side card__side--back card__side--back-5">
                <div class="card__cta">
                  <div class="card__app-box">
                    <p class="card__app-prefix">OLI</p>
                    <p class="card__app-name">Asset Logging</p>
                  </div>
                  <a
                    href="http://oli-chain.com/logging"
                    class="btn btn--white btn--padding"
                    >Open</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.landing-page {
  width: 100%;
  margin: 0 auto;
}

.landing {
  height: 45vh;
  position: relative;
  background-color: $color-grey-light;

  &__heading-box {
    width: 60%;
    height: 45vh;
    text-align: center;
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: linear-gradient(
      to right bottom,
      rgba($color-primary-blue, 0.9),
      rgba($color-primary-green, 0.9)
    );
    box-shadow: 0 1.5rem 4rem rgba($color-black, 0.3);
    padding: 4rem;
    z-index: 1;
  }
}
</style>

