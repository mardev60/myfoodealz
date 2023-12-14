<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-orange text-white">
      <div class="container">
        <router-link to="/" class="navbar-brand">
          <img src="./assets/logo.png" id="logo"/>
        </router-link>
        <div class="flex-grow-1"></div>
        <router-link to="/create" class="btn btn-success btn-orange ml-auto" v-if="this.isUserLoggedIn">Ajouter Promotion</router-link>
      </div>
    </nav>

    <router-view />
  </div>
</template>
<script>
import { inject, watch, ref} from 'vue';

export default {
  setup() {
    const authState = inject('authState');
    const isUserLoggedIn = ref(authState.isLoggedIn);

    watch(() => authState.isLoggedIn, (newValue) => {
      isUserLoggedIn.value = newValue;
    });

    return { isUserLoggedIn };
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#logo{
  width : 30%;
}

.navbar {
  background-color: #ffefdd !important;
  color: #ffffff !important;
}

.btn-orange {
  background-color: #FFA500 !important;
  border-color: #e79805 !important;
  color: #ffffff !important;
}
</style>
