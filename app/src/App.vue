<template>
  <div id="app">
    <div class="header">
      <a href class="logo">OLI Systems</a>
      <input class="menu-btn" type="checkbox" id="menu-btn" />
      <label class="menu-icon" for="menu-btn">
        <span class="navicon"></span>
      </label>
      <ul class="menu">
        <li exact tag="li">
          <router-link to="/">Home</router-link>
        </li>
        <li exact tag="li">
          <router-link to="/browser" target="_blank">Energy Browser</router-link>
        </li>
        <li exact tag="li">
          <router-link to="/explorer" target="_blank">Chain Explorer</router-link>
        </li>
        <li exact tag="li">
          <router-link to="/tokenization" target="_blank">Tokenization</router-link>
        </li>
        <li exact tag="li">
          <router-link to="/logging" target="_blank">Asset Logging</router-link>
        </li>
        <li exact tag="li">
          <router-link to="/origin" target="_blank">Charging Origin</router-link>
        </li>
      </ul>
    </div>
    <router-view />

    <Footer />
  </div>
</template>

<script>
import Footer from "@/components/footer/Footer.vue";
export default {
  components: {
    Footer,
  },
};
</script>

<style>
*,
*::after,
*::before {
  box-sizing: inherit;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}

body {
  font-family: "Open Sans", sans-serif;
  color: #333;
  background-color: #f3f3f3;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  margin: 0;
}

.header {
  background-image: linear-gradient(to right, #134e5e, #267871);
  width: 100%;
  padding: 0.2rem 0;
  margin-bottom: 0;
}

.header ul {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
  text-align: left;
}

.header li a {
  display: block;
  padding: 0.5rem;
  text-decoration: none;
}

a {
  color: rgb(172, 169, 169);
  font-weight: normal;
}

.logo {
  color: white;
}

.header li a:hover,
.header .menu-btn:hover,
.logo:hover {
  color: orange;
  transition: 0.3s;
}

.header .logo {
  float: left;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 15px 20px;
  text-decoration: none;
}
/* menu */
.header .menu {
  clear: both;
  max-height: 0;
  transition: max-height 0.2s ease-out;
}

/* menu icon */

.header .menu-icon {
  cursor: pointer;
  /* display: inline-block; */
  float: right;
  padding: 28px 20px;
  position: relative;
  user-select: none;
}

.header .menu-icon .navicon {
  background: white;
  display: block;
  height: 2px;
  position: relative;
  transition: background 0.2s ease-out;
  width: 22px;
}

.header .menu-icon .navicon:before,
.header .menu-icon .navicon:after {
  background: white;
  content: "";
  display: block;
  height: 100%;
  position: absolute;
  transition: all 0.2s ease-out;
  width: 100%;
}

.header .menu-icon .navicon:before {
  top: 5px;
}

.header .menu-icon .navicon:after {
  top: -5px;
}

/* menu btn */

.header .menu-btn {
  display: none;
}

.header .menu-btn:checked ~ .menu {
  max-height: 240px;
}

.header .menu-btn:checked ~ .menu-icon .navicon {
  background: transparent;
}

.header .menu-btn:checked ~ .menu-icon .navicon:before {
  transform: rotate(-45deg);
}

.header .menu-btn:checked ~ .menu-icon .navicon:after {
  transform: rotate(45deg);
}

.header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:before,
.header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:after {
  top: 0;
}

div.header > ul {
  padding-left: 15px;
}

@media (min-width: 48em) {
  .header li {
    float: left;
    margin-left: 0.3rem;
  }
  .header li a {
    padding: 20px 5px;
  }
  .header .menu {
    clear: none;
    float: right;
    max-height: none;
    padding-right: 10px;
  }
  .header .menu-icon {
    display: none;
  }
}

.router-link-exact-active {
  /* background: rgb(241, 237, 237);
  border-radius: 1px;
  color: #394f7c; */
  color: white;
}
</style>
