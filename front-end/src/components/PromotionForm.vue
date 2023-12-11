<template>
    <div>
      <h1 class="my-4">Créer une Promotion</h1>
      <form @submit.prevent="createPromotion" class="my-4">
        <div class="mb-3">
          <label for="title" class="form-label">Titre:</label>
          <input type="text" v-model="promotion.title" class="form-control" required>
        </div>
  
        <div class="mb-3">
          <label for="commerceName" class="form-label">Nom du commerce:</label>
          <input type="text" v-model="promotion.commerceName" class="form-control" required>
        </div>
  
        <div class="mb-3">
          <label for="creationDate" class="form-label">Date de création:</label>
          <input type="text" v-model="promotion.creationDate" class="form-control" required>
        </div>
  
        <div class="mb-3">
          <label for="content" class="form-label">Contenu:</label>
          <textarea v-model="promotion.content" class="form-control"></textarea>
        </div>
  
        <button type="submit" class="btn btn-primary">Créer la Promotion</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        promotion: {
          title: '',
          commerceName: '',
          creationDate: '',
          content: '',
        },
      };
    },
    methods: {
      createPromotion() {
        // Ajoutez la logique pour créer la promotion avec les données actuelles
      },
    },
  };
  </script>  