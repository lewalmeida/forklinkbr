<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  data() {
    return {
      auth: firebase.auth(),
    };
  },

  created() {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.commit('setUser', user);
      } else {
        this.$store.commit('setUser', 'none');
      }
    });
  },
};
</script>

<style lang="scss">
#app {
  padding: 0;
  margin: 0;
}

body {
  padding: 0;
  margin: 0;
  margin-top: -20px;
  padding-bottom: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
}
</style>
