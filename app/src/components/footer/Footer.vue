<template>
  <footer>
    <section class="footer__main">
      <div class="main__col">
        <div class="main__col-logo">
          <img src="../../assets/img/OLI_logo.png" alt="OLI Logo" />
        </div>

        <p>OLI Systems GmbH</p>

        <p>
          Silberburgstrasse 112 <br />
          70176 Stuttgart
        </p>
      </div>

      <div class="main__col">
        <h3 class="main__col-title">About</h3>

        <ul>
          <li>
            <a href="https://www.my-oli.com/en/das-oli-konzept.html">Concept</a>
            <a href="https://www.my-oli.com/en/about-oli.html">Projects</a>
            <a href="https://www.my-oli.com/en/users.html">Users</a>
          </li>
        </ul>
      </div>

      <div class="main__col">
        <h3 class="main__col-title">Resources</h3>

        <ul>
          <li>
            <a href="https://www.my-oli.com/en/oli-projects.html">Projects</a>
            <a href="https://medium.com/oli-systems">Blog</a>
            <a href="https://www.my-oli.com/en/news.html">News</a>
          </li>
        </ul>
      </div>

      <div class="main__col">
        <h3 class="main__col-title">Contact</h3>

        <ul>
          <li>
            <a href="https://www.my-oli.com/de/kontakt.html">Contact</a>
            <a href="#">Sales</a>
            <a href="#">Advertise</a>
          </li>
        </ul>
      </div>
    </section>

    <!-- Footer social -->
    <section class="footer__social">
      <ul class="footer__social-list">
        <li>
          <a href="https://twitter.com/olisharenergy"
            ><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'twitter' }"
          /></a>
        </li>
        <li>
          <a href="https://www.facebook.com/olisharenergy/"
            ><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'facebook' }"
          /></a>
        </li>
        <li>
          <a href="https://github.com/olisystems"
            ><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'github' }"
          /></a>
        </li>
        <li>
          <a href="https://www.linkedin.com/company/oli-systems/"
            ><font-awesome-icon :icon="{ prefix: 'fab', iconName: 'linkedin' }"
          /></a>
        </li>
      </ul>
    </section>

    <!-- Footer legal -->
    <section class="footer__legal">
      <ul class="footer__legal-list">
        <li>
          <a href="https://www.my-oli.com/de/impressum-datenschutz.html"
            >Imprint Data Protection</a
          >
        </li>
        <li>
          <a href="https://www.my-oli.com/de/datenschutzerklaerung.html"
            >Privacy Policy</a
          >
        </li>
        <li>&copy; 2021 Copyright OLI Systems GmbH</li>
      </ul>
    </section>
  </footer>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
footer {
  display: flex;
  color: #bbb;
  line-height: 2;
  margin-top: 5rem;
  flex-direction: column;
  background-color: #555;
  align-items: center;

  ul {
    padding-left: 0;
    display: flex;
    flex-wrap: wrap;

    li {
      display: flex;
      flex-direction: column;
      text-align: left;
      font-size: 1rem;
      white-space: nowrap;
    }
  }

  a {
    color: #eee;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

// FOOTER Main
.footer__main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  border-bottom: 1px #777 solid;
}

.main__col {
  padding: 1.5rem;
  min-width: 15rem;

  &-logo {
    text-align: left;
  }

  img {
    width: 60px;
    height: 60px;
    margin-top: 0.5rem;
  }

  p {
    text-align: left;
    line-height: 1.2;
  }

  &-title {
    color: #fff;
    font-size: 1.3rem;
    text-align: left;
  }
}

// FOOTER SOCIAL
.footer__social {
  ul {
    li {
      margin: 1rem;
      font-size: 1.5rem;
    }
  }
}

// FOOTER LEGAL
.footer__legal {
  width: 100%;
  text-align: center;
  background-color: #333;
  ul {
    justify-content: center;
    li {
      margin: 1rem;
    }
  }
}
</style>