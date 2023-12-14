<template>
    <div class="promotion-feed">
      <div v-for="promotion in promotions" :key="promotion.id" class="card my-4">
        <img v-if="promotion.image" :src="promotion.image" alt="Promotion Image" class="card-img-top" />
        <div class="card-body">
          <h2 class="card-title">{{ promotion.title }}</h2>
          <p class="card-text">{{ promotion.commerceName }}</p>
          <p class="card-text">{{ promotion.creationDate }}</p>
          <router-link :to="{ name: 'PromotionForm', params: { id: promotion.id } }" class="btn btn-primary">Modifier</router-link>
          <button @click="confirmDelete(promotion.id)" class="btn btn-danger" style="margin-left: 10px;">Supprimer</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        promotions: [],
      };
    },
    methods: {
      deletePromotion(id) {
        axios.delete(`http://localhost:3000/api/promotions/${id}`)
          .then(response => {
            console.log('Promotion supprimée avec succès :', response.data);
            this.fetchPromotions();
          })
          .catch(error => {
            console.error('Erreur lors de la suppression de la promotion :', error);
          });
      },
      confirmDelete(id) {
        const confirmDelete = window.confirm('Voulez-vous vraiment supprimer cette promotion ?');
        if (confirmDelete) {
          this.deletePromotion(id);
        }
      },
      fetchPromotions() {
        axios.get('http://localhost:3000/api/promotions')
          .then(response => {
            this.promotions = response.data.promotions;
          })
          .catch(error => {
            console.error('Erreur lors de la récupération des promotions :', error);
          });
      },
    },
    mounted() {
      this.fetchPromotions();
    },
  };
  </script>  
  
  <style scoped>
  .promotion-feed {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .card {
    border: none;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
  }
  
  .card:hover {
    transform: scale(1.05);
  }
  
  .card-img-top {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
  
  .card-body {
    padding: 20px;
  }
  
  .card-title {
    font-size: 1.8rem;
    font-weight: bold;
    color: #333;
  }
  
  .card-text {
    color: #555;
  }
  
  .btn {
    margin-top: 10px;
  }
  
  .btn-primary {
    background-color: #0eb9c9;
    border-color: #0fa6b4;
  }

  .btn-primary:hover {
    background-color: #096f78;
    border-color: #0fa6b4;
  }
  
  .btn-danger {
    background-color: #dc3545;
    border-color: #dc3545;
  }
  
  .btn-success {
    background-color: #28a745;
    border-color: #28a745;
  }
  </style>  