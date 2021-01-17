<template>
  <div>
    <nav class="blue darken-3">
      <div class="nav-wrapper">
        <router-link to="/" class="brand-logo">Tasks</router-link>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger">
          <i class="material-icons">menu</i>
        </a>
        <ul class="right hide-on-med-and-down">
          <router-link
              tag="li"
              to="/"
              exact
              active-class="active"
          >
            <a href="#">Create</a>
          </router-link>
          <router-link
              tag="li"
              to="/list"
              exact
              active-class="active"
          >
            <a href="#">List</a>
          </router-link>
        </ul>
      </div>
    </nav>

    <ul ref="sidenav" class="sidenav blue lighten-5" id="mobile-demo">
      <router-link
          tag="li"
          to="/"
          exact
          active-class="active"
      >
        <a href="#">Create</a>
      </router-link>
      <router-link
          tag="li"
          to="/list"
          exact
          active-class="active"
      >
        <a href="#">List</a>
      </router-link>

    </ul>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  mounted() {
    M.Sidenav.init(this.$refs.sidenav, {

    })
  }
}
</script>

<style lang="scss" scoped>
.brand-logo {
  padding: 0 2rem;
}
</style>