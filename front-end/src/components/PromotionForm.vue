<template>
  <div class="container my-4">
    <h1 class="mb-4">{{ isEditing ? 'Modifier' : 'Créer' }} une promotion</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="title" class="form-label">Titre :</label>
        <input type="text" v-model="promotion.title" class="form-control" placeholder="Titre de la promotion" required>
      </div>

      <div class="mb-3">
        <label for="commerceName" class="form-label">Nom du commerce :</label>
        <input type="text" v-model="promotion.commerceName" class="form-control" placeholder="Nom du commerce" required>
      </div>

      <div class="mb-3">
        <label for="image" class="form-label">Lien de la photo :</label>
        <input type="text" v-model="promotion.image" class="form-control" placeholder="Lien de la photo">
      </div>

      <div class="mb-3">
        <label for="content" class="form-label">Contenu :</label>
        <textarea v-model="promotion.content" class="form-control" placeholder="Contenu de la promotion"></textarea>
      </div>

      <button type="submit" class="btn btn-primary">{{ isEditing ? 'Modifier' : 'Créer' }} la Promotion</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      promotion: {
        title: '',
        commerceName: '',
        creationDate: '',
        content: '',
      },
      isEditing: false,
    };
  },
  methods: {
    handleSubmit() {
      const apiUrl = this.isEditing
        ? `http://localhost:3000/api/promotions/${this.promotion.id}`
        : 'http://localhost:3000/api/promotions/';

      const httpMethod = this.isEditing ? 'put' : 'post';

      axios[httpMethod](apiUrl, this.promotion)
        .then((response) => {
          console.log(response);
          this.$router.push('/feed');
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchPromotionData(id) {
      axios.get(`http://localhost:3000/api/promotions/${id}`)
        .then((response) => {
          this.promotion = response.data;
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération de la promotion :', error);
        });
    },
  },
  created() {
    const promotionId = this.$route.params.id;
    if (promotionId) {
      this.isEditing = true;
      this.fetchPromotionData(promotionId);
    }
  },
};
</script>