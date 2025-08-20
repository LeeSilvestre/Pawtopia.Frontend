<template>
    <div class="update-menu-container">
      <div class="update-menu-form-container">
        <form @submit.prevent="handleSubmit" novalidate autocomplete="off">
          <h3>Update Food Item</h3>
  
          <div class="form-group">
            <label for="foodId">Food ID:</label>
            <input type="number" id="foodId" v-model="updateObj.food_id" readonly />
          </div>
  
          <div class="form-group">
            <label for="foodName">Food Name:</label>
            <input type="text" id="foodName" v-model="updateObj.food_name" />
            <p class="error-mess" v-if="errorObj.food_nameErr.length > 0">{{ errorObj.food_nameErr[0] }}</p>
          </div>
  
          <div class="form-group">
            <label for="foodStar">Food Star:</label>
            <input type="number" id="foodStar" v-model="updateObj.food_star" />
            <p class="error-mess" v-if="errorObj.food_starErr.length > 0">{{ errorObj.food_starErr[0] }}</p>
          </div>
  
          <div class="form-group">
            <label for="foodVote">Food Vote:</label>
            <input type="number" id="foodVote" v-model="updateObj.food_vote" />
            <p class="error-mess" v-if="errorObj.food_voteErr.length > 0">{{ errorObj.food_voteErr[0] }}</p>
          </div>
  
          <div class="form-group">
            <label for="foodPrice">Food Price:</label>
            <input type="number" id="foodPrice" v-model="updateObj.food_price" />
            <p class="error-mess" v-if="errorObj.food_priceErr.length > 0">{{ errorObj.food_priceErr[0] }}</p>
          </div>
  
          <div class="form-group">
            <label for="foodDisc">Food Discount:</label>
            <input type="number" id="foodDisc" v-model="updateObj.food_discount" />
            <p class="error-mess" v-if="errorObj.food_discountErr.length > 0">{{ errorObj.food_discountErr[0] }}</p>
          </div>
  
          <div class="form-group">
            <label for="foodDesc">Description:</label>
            <textarea id="foodDesc" v-model="updateObj.food_desc"></textarea>
            <p class="error-mess" v-if="errorObj.food_descErr.length > 0">{{ errorObj.food_descErr[0] }}</p>
          </div>
  
          <div class="form-group">
            <label for="stat">Status:</label>
            <textarea id="stat" v-model="updateObj.food_status"></textarea>
            <p class="error-mess" v-if="errorObj.food_statusErr.length > 0">{{ errorObj.food_statusErr[0] }}</p>
          </div>
  
          <div class="form-group">
            <label for="type">Type:</label>
            <textarea id="type" v-model="updateObj.food_type"></textarea>
            <p class="error-mess" v-if="errorObj.food_typeErr.length > 0">{{ errorObj.food_typeErr[0] }}</p>
          </div>
  
          <div class="form-group">
            <label for="categ">Category:</label>
            <textarea id="categ" v-model="updateObj.food_category"></textarea>
            <p class="error-mess" v-if="errorObj.food_categoryErr.length > 0">{{ errorObj.food_categoryErr[0] }}</p>
          </div>
  
          <div class="form-group">
            <label for="foodSrc">Image Source:</label>
            <input type="text" id="foodSrc" v-model="updateObj.food_src" />
            <p class="error-mess" v-if="errorObj.food_srcErr.length > 0">{{ errorObj.food_srcErr[0] }}</p>
          </div>
  
          <div class="form-group">
            <input type="submit" value="Update" class="btn" />
            <router-link @click="scrollToTop()" to="/admin/managemenu">Back</router-link>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: "UpdateMenu",
  
    data() {
      return {
        updateObj: {
          food_id: "",
          food_name: "",
          food_star: 0,
          food_vote: 0,
          food_price: 0,
          food_discount: 0,
          food_desc: "",
          food_status: "",
          food_type: "",
          food_category: "",
          food_src: "",
        },
        errorObj: {
          food_nameErr: [],
          food_starErr: [],
          food_voteErr: [],
          food_priceErr: [],
          food_discountErr: [],
          food_descErr: [],
          food_statusErr: [],
          food_typeErr: [],
          food_categoryErr: [],
          food_srcErr: [],
        },
      };
    },
  
    created() {
      this.fetchFoodItemDetails();
    },
  
    methods: {
      scrollToTop() {
        window.scrollTo(0, 0);
      },
  
      fetchFoodItemDetails() {
        const foodId = this.$route.params.id;
        axios.get(`/foods/${foodId}`)
          .then(response => {
            this.updateObj = response.data;
          })
          .catch(error => {
            console.error('Error fetching food item details:', error);
          });
      },
  
      resetCheckErr() {
        for (const key in this.errorObj) {
          this.errorObj[key] = [];
        }
      },
  
      checkEmptyErr() {
        for (const key in this.errorObj) {
          if (this.errorObj[key].length !== 0) {
            return false;
          }
        }
        return true;
      },
  
      checkForm() {
        this.resetCheckErr();
  
        if (!this.updateObj.food_name) {
          this.errorObj.food_nameErr.push("Food Name is required");
        }
  
        if (this.updateObj.food_star < 0) {
          this.errorObj.food_starErr.push("Food Star should be a non-negative number");
        }
  
        if (!this.updateObj.food_desc) {
          this.errorObj.food_descErr.push("Description is required");
        }
  
        if (!this.updateObj.food_src) {
          this.errorObj.food_srcErr.push("Image Source is required");
        }
      },
  
      handleSubmit() {
        this.checkForm();
  
        if (!this.checkEmptyErr()) {
          return;
        }
  
        axios.put(`/foods/${this.updateObj.food_id}`, this.updateObj)
          .then(() => {
            this.$router.push('/admin/managemenu');
          })
          .catch(error => {
            console.error('Error updating food item:', error);
          });
      },
    },
  };
  </script>
  
  <style scoped>
.update-menu-container {
  padding: 2rem 9%;
}

.update-menu-container .update-menu-form-container {
  background: #fff;
}

.update-menu-container .update-menu-form-container form {
  position: relative;
  left: 50%;
  transform: translate(-50%, 0%);
  max-width: 70rem;
  width: 100%;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
  border: 0.1rem solid rgba(0, 0, 0, 0.2);
  padding: 2rem;
  border-radius: 0.5rem;
  animation: fadeUp 0.4s linear;
}

.update-menu-container .update-menu-form-container form h3 {
  padding-bottom: 1rem;
  font-size: 2rem;
  text-transform: uppercase;
  color: #130f40;
  margin: 0;
}

.update-menu-container .update-menu-form-container form .form-control {
  margin: 0.7rem 0;
  border-radius: 0.5rem;
  background: #f7f7f7;
  padding: 2rem 1.2rem;
  font-size: 1.6rem;
  color: #130f40;
  text-transform: none;
  width: 100%;
  border: none;
}

.update-menu-container .update-menu-form-container form label {
  font-size: 2rem;
  margin: 0;
  padding: 0;
}

.update-menu-container .update-menu-form-container form .btn {
  margin: 1rem 0;
  width: 100%;
  text-align: center;
}

.update-menu-container .update-menu-form-container form p {
  padding-top: 1rem;
  font-size: 1.5rem;
  color: #666;
  margin: 0;
}

.update-menu-container .update-menu-form-container form p a {
  color: #27ae60;
}

.update-menu-container .update-menu-form-container form p a:hover {
  color: #130f40;
  text-decoration: underline;
}

.update-menu-container .update-menu-form-container form .form-group {
  margin: 0;
}

.update-menu-container .update-menu-form-container form .form-group .error-mess {
  font-size: 1.5rem;
  position: relative;
  color: rgb(243, 47, 47);
  margin: 0;
  padding: 0;
}
</style>