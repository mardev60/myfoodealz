<template>
    <div class="login-container">
      <div class="login-box">
        <h2 class="text-center mb-4">Connexion</h2>
        <form @submit.prevent="login" class="needs-validation">
          <div class="mb-3">
            <label for="username" class="form-label">Nom d'utilisateur :</label>
            <input v-model="username" type="text" class="form-control" id="username" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Mot de passe :</label>
            <input v-model="password" type="password" class="form-control" id="password" required>
          </div>
          <button type="submit" class="btn btn-primary w-100">Se connecter</button>
        </form>
      </div>
    </div>
    <router-link to="/feed" id="lienSansConnexion">Continuer sans se connecter (consultation uniquement)</router-link>
  </template>
  
  <script>
  import axios from 'axios';
  import { inject, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      login() {
        axios.post('http://localhost:3000/api/auth/', {
          username: this.username,
          password: this.password,
        })
        .then(response => {
          if (response.data.login.logged) {
            this.authState.isLoggedIn = true;
            this.$router.push('/feed');
          } else {
            console.error('Identifiants incorrects');
          }
        })
        .catch(error => {
          console.error('Erreur lors de l\'authentification', error);
        });
      },
    },
    setup() {
      const authState = inject('authState');
      const router = useRouter();
      onMounted(() => {
        if (authState.isLoggedIn) {
          router.push('/feed');
        }
      });
  
      return { authState, router };
    },
  };
  </script>
  
  
  <style scoped>
  .login-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  
  .login-box {
    max-width: 400px;
    margin-top: 10%;
    margin-bottom: 2%;
    width: 100%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .btn-primary {
    background-color: #007bff;
    border-color: #007bff;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
  
  .form-control {
    margin-bottom: 15px;
  }
  </style>  