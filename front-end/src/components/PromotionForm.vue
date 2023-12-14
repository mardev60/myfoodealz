<template>
  <div class="container my-4">
    <h1 class="mb-4">{{ isEditing ? 'Modifier' : 'Créer' }} une promotion</h1>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="title" class="form-label">Titre:</label>
        <input type="text" v-model="promotion.title" class="form-control" required>
      </div>

      <div class="mb-3">
        <label for="commerceName" class="form-label">Nom du commerce:</label>
        <input type="text" v-model="promotion.commerceName" class="form-control" required>
      </div>

      <div class="mb-3">
        <label for="creationDate" class="form-label">Photo :</label>
        <input type="text" v-model="promotion.image" class="form-control">
      </div>

      <div class="mb-3">
        <label for="content" class="form-label">Contenu:</label>
        <textarea v-model="promotion.content" class="form-control"></textarea>
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
      if (this.isEditing) {
        axios.put(`http://localhost:3000/api/promotions/${this.promotion.id}`, this.promotion)
        .then(
          response => {
            console.log(response);
          }
        )
        .catch(
          (error) => {
            console.log(error);
          }
        )
      } else {
        axios.post(`http://localhost:3000/api/promotions/`, this.promotion)
        .then(
          response => {
            console.log(response);
          }
        )
        .catch(
          (error) => {
            console.log("erreur catch : ", error);
          }
        )
      }
    },
    fetchPromotionData(id) {
      axios.get(`http://localhost:3000/api/promotions/${id}`)
        .then(response => {
          this.promotion = response.data;
        })
        .catch(error => {
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