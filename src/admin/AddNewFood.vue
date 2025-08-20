<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Add Pet Product</h4>
      </div>
      <div class="card-body">
        <ul class="alert alert-warning" v-if="Object.keys(this.errorList).length > 0">
          <li class="mb-0 ms-3" v-for="(error, index) in this.errorList" :key="index">
            {{ error[0] }}
          </li>
        </ul>
        <div class="mb-3">
          <label for="foodName">Product Name</label>
          <input type="text" v-model="model.food_name" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="price">Price</label>
          <input type="number" v-model="model.food_price" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="discount">Discount</label>
          <input type="number" v-model="model.food_discount" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="description">Description</label>
          <input type="text" v-model="model.food_desc" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="type">Type</label>
          <select v-model="model.food_type" class="form-control">
            <option value="dogs">Dogs</option>
            <option value="cats">Cats</option>
            <option value="rodents">Rodents</option>
            <option value="birds">Birds</option>
            <option value="fishes">Fishes</option>
            <option value="others">Others</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="category">Category</label>
          <select v-model="model.food_category" class="form-control">
            <option value="food">Food</option>
            <option value="toy">Toy</option>
            <option value="accessory">Accessory</option>
            <option value="bed">Bed</option>
            <option value="care">Care</option>
            <option value="feeder">Feeder</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="quantity">Quantity</label>
          <input type="number" v-model="model.food_qty" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="image">Image</label>
          <input type="text" v-model="model.food_src" class="form-control" />
        </div>
        <div class="mb-3">
          <button type="button" @click="saveFoodItem" class="btn btn-primary">Save</button>
          <button class="btn manage-menu-btn" @click="goToManageMenu" to="/admin/managemenu">Back</button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios';
  
  export default {
    name: "AddNewFood",
  
    data() {
      return {
        model: {
          food_name: '',
          food_star: '0',
          food_vote: '0',
          food_price: null, 
          food_discount: null, 
          food_desc: '',
          food_status: 'b',
          food_type: 'dogs',
          food_category: 'food', 
          food_src: '',
          food_qty: ''
        },
        errorList: {},
      
      };
    },
  
    methods: {
  
      saveFoodItem() {
            axios.post('/foods', this.model)
            .then(res => {
                console.log(res)
                const message = res.data && res.data.message ? res.data.message : 'Item added successfully';
                alert(message);

                this.model = {
                  food_name: '',
                  food_star: '0',
                  food_vote: '0',
                  food_price: null, 
                  food_discount: null, 
                  food_desc: '',
                  food_status: 'b',
                  food_type: 'dogs',
                  food_category: 'food', 
                  food_src: '',
                  food_qty: ''
                  
                };
                this.$router.push("/admin/managemenu");
            });
      },
      goToManageMenu() {
        console.log("Admin manage menu:", this.admin);
        this.$router.push("/admin/managemenu");
      }
    }
  }
</script>

<style scoped>
/* Override global styles */
.container {
  padding: 2rem 9% !important;
  background-size: cover !important;
  background-position: center !important;
}

.card {
  background: #fff;
  max-width: 40rem !important;
  width: 100% !important;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
  border: 0.1rem solid rgba(0, 0, 0, 0.2);
  padding: 2rem !important;
  border-radius: 0.5rem !important;
  animation: fadeUp 0.4s linear !important;
  margin: 0 auto; /* Center the form */
}

.card form h4 {
  padding-bottom: 0 !important;
  font-size: 28px !important;
  text-transform: uppercase;
  margin-bottom: 1rem !important;
  text-align: center !important;
}

.card form .mb-3 {
  margin-bottom: 30px !important;
  font-size: 1.6rem !important;
}

.card form label {
  font-size: 1.6rem !important;
  color: #130f40;
  display: block;
  margin-bottom: 15px !important;
}

.card form .form-control {
  margin: 0.7rem 0 !important;
  border-radius: 0.5rem;
  background: #f7f7f7;
  padding: 15px !important;
  font-size: 1.6rem !important;
  color: #130f40;
  text-transform: none;
  width: 100% !important;
  border: none;
}

.card form .btn-container {
  display: flex;
  justify-content: space-between;
  margin-left: 0 !important;
  margin-right: 0 !important;
}

.btn-primary {
  margin-right: 10px !important;
}

.card form .btn {
  margin: 20px 0 !important;
  width: 100% !important;
  text-align: center;
  margin-right: 2% !important;
}

.card form p {
  font-size: 1.6rem !important;
  color: #666;
  margin: 0 !important;
  margin-top: 1rem !important;
}

.card form p a {
  color: #27ae60;
}

.card form p a:hover {
  color: #130f40;
  text-decoration: underline;
}

.card form .error-mess {
  font-size: 1.6rem !important;
  position: relative;
  color: rgb(243, 47, 47);
  margin: 0;
  padding: 0;
  margin-top: 0.5rem !important;
}
</style>