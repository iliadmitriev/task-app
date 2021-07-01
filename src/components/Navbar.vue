<template>
  <div>
    <nav class="blue darken-3">
      <div class="nav-wrapper">
        <router-link
            :to="{name: 'list'}"
            exact
            class="brand-logo"
        >Tasks</router-link>

        <a href="#" data-target="mobile-demo" class="sidenav-trigger">
          <i class="material-icons">menu</i>
        </a>
        <ul class="right hide-on-med-and-down">
          <router-link
              v-slot="{ href, isActive, isExactActive, navigate}"
              custom
              :to="{name: 'create'}"
              exact
              active-class="active"
          >
            <li :class="[isExactActive && 'active']">
              <a :href="href" @click="navigate">Create</a>
            </li>
          </router-link>
          <router-link
              v-slot="{ href, isActive, isExactActive, navigate}"
              custom
              :to="{name: 'list'}"
              exact
              active-class="active"
          >
            <li :class="[isExactActive && 'active']">
              <a :href="href" @click="navigate">List</a>
            </li>
          </router-link>
        </ul>
      </div>
    </nav>

    <ul ref="sidenav" class="sidenav blue lighten-5" id="mobile-demo">
      <router-link
          v-slot="{ href, isActive, isExactActive, navigate}"
          custom
          :to="{name: 'create'}"
          exact
          active-class="active"
      >
        <li :class="[isExactActive && 'active']">
          <a :href="href" @click="navigate">Create</a>
        </li>
      </router-link>
      <router-link
          v-slot="{ href, isActive, isExactActive, navigate}"
          custom
          :to="{name: 'list'}"
          exact
          active-class="active"
      >
        <li :class="[isExactActive && 'active']">
          <a :href="href" @click="navigate">List</a>
        </li>
      </router-link>

    </ul>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  mounted() {
    M.Sidenav.init(this.$refs.sidenav, {
      draggable: true,
      preventScrolling: true
    })
  }
}
</script>

<style lang="scss" scoped>
.brand-logo {
  padding: 0 2rem;
}
</style>