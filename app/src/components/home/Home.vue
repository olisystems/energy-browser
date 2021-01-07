<template>
  <div class="home">
    <section class="home__hero">
      <div class="hero__heading">
        <h1 class="hero__heading--main">OLI DAPPs</h1>
        <h2 class="hero__heading--sub">Ethereum Based Dapps</h2>

        <a href="#section-dapps" class="btn btn--white btn--animated"
          >Discover Dapps</a
        >
      </div>
    </section>

    <section class="home__stack">
      <div class="u-center-text u-margin-bottom-small">
        <h2 class="heading-secondary">Overview of the Development Stack</h2>
      </div>

      <div class="stack">
        <div class="stack__row">
          <div class="col">
            <div>
              <img
                src="../../assets/img/ethereum.png"
                alt=""
                class="col__img"
              />
            </div>

            <div class="col__details">
              <h3 class="heading-tertiary u-margin-bottom-small">Ethereum</h3>
              <p>
                Ethereum is a decentralized platform that runs smart contracts.
              </p>
            </div>
          </div>

          <div class="col">
            <div>
              <img src="../../assets/img/web3.jpeg" alt="" class="col__img" />
            </div>

            <div class="col__details">
              <h3 class="heading-tertiary u-margin-bottom-small">Web3.js</h3>
              <p>
                A collection of libraries which allow interacting with a local
                or remote ethereum node, using an HTTP or IPC connection.
              </p>
            </div>
          </div>

          <div class="col">
            <div>
              <img src="../../assets/img/vue.png" alt="" class="col__img" />
            </div>

            <div class="col__details">
              <h3 class="heading-tertiary u-margin-bottom-small">Vue.js</h3>
              <p>
                The JavaScript framework for the frontend and handling all the
                view-related stuff.
              </p>
            </div>
          </div>
        </div>

        <div class="stack__row">
          <div class="col">
            <div>
              <img src="../../assets/img/truffle.png" alt="" class="col__img" />
            </div>

            <div class="col__details">
              <h3 class="heading-tertiary u-margin-bottom-small">
                Truffle Framework
              </h3>
              <p>
                Truffle is the most popular development framework for Ethereum
                with a mission to make your life a whole lot easier.
              </p>
            </div>
          </div>
          <div class="col">
            <div>
              <img
                src="../../assets/img/solidity.png"
                alt=""
                class="col__img"
              />
            </div>

            <div class="col__details">
              <h3 class="heading-tertiary u-margin-bottom-small">Solidity</h3>
              <p>
                Solidity is an object-oriented, high-level language for
                implementing smart contracts.
              </p>
            </div>
          </div>
          <div class="col">
            <div>
              <img src="../../assets/img/leaflet.png" alt="" class="col__img" />
            </div>

            <div class="col__details">
              <h3 class="heading-tertiary u-margin-bottom-small">Leaflet.js</h3>
              <p>
                Leaflet is an open source JavaScript library used to build web
                mapping applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="home__features">This is the feature section.</section>

    <section class="home__dapps">This is the dapps section.</section>
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
  display: flex;
  flex-direction: column;

  margin: 0;

  &__hero {
    margin: 8rem auto;
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    height: 60vh;
  }

  &__stack {
    width: 100%;
    padding: 10rem 0 0 0;

    margin-top: -25vh;
    background-color: #f1eded;
    margin-bottom: 0;
  }
}
</style>

