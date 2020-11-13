<template>
  <section class="create-account-page">
    <div class="block">
      <h1>{{ type === 'login' ? 'Entrar' : 'Criar conta' }}</h1>
      <div class="form">
        <label for="email">Email</label>
        <input type="email" name="email" autocomplete="off" v-model="user.email" class="form-input email" />

        <label for="password-one">Password</label>
        <input type="password" name="password-one" autocomplete="off" v-model="user.password" class="form-input password" />

        <label for="password-confirm" v-if="type === 'create'">Confirm</label>
        <input type="password" v-if="type === 'create'" name="password-confirm" v-model="user.confirm" class="form-input password-confirm" />

        <button @click="checkType()">{{ type === 'login' ? 'Entrar' : 'Criar conta' }}</button>

        <div class="error-alert">
          <p class="error-message">{{ error }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Create-Account',

  data() {
    return {
      type: 'login',
      user: {},
      db: firebase.firestore(),
      auth: firebase.auth(),
      error: '',
    };
  },

  methods: {
    createAccount() {
      this.error = '';

      if (this.checkFields()) {
        this.auth.createUserWithEmailAndPassword(this.user.email, this.user.password)
          .then((result) => {
            this.saveUserOnDB(result);
          })
          .catch((err) => {
            this.error = err.message;
          });
      }
    },

    checkType() {
      if (this.type === 'login') {
        this.login();
      } else {
        this.createAccount();
      }
    },

    login() {
      this.auth.signInWithEmailAndPassword(this.user.email, this.user.password)
        .then((result) => {
          this.$store.commit('setUser', result.user);
        })
        .catch((err) => {
          this.error = err.message;
        });
    },

    saveUserOnDB(userFullData) {
      const user = {
        uid: userFullData.user.uid,
        name: '',
        email: userFullData.user.email,
        emailVerified: userFullData.user.emailVerified,
      };

      this.db.collection('users')
        .doc(user.uid)
        .set(user)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          this.error = err.message;
        });
    },

    checkFields() {
      if (!this.user.email && !this.user.password && !this.user.confirm && this.user.password !== this.user.confirm) {
        return false;
      }

      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.create-account-page {
  background-color: #f3f3f3;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  min-height: 100vh;

  .block {
    background-color: #fff;
    padding: 40px;
    border-radius: 20px;
    max-height: 300px;
    min-width: 50%;

    .form {
      display: flex;
      flex-direction: column;

      .form-input {
        border: 1px solid #ccc;
        outline: none;
        padding: 5px;
        border-radius: 5px;
        margin-bottom: 10px;
        height: 20px;
      }

      .error-message {
        color: red;
        text-align: center;
      }
    }
  }
}
</style>
