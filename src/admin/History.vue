<template>
    <div class="admin-container">
      <div class="d-flex justify-content-between">
        <h1>CulinaryNex Admin History</h1>
        <button class="btn" @click="goToDashboard">Back to Dashboard</button>
      </div>
      <div class="heading">
            <span>Order History</span>
            <h3>See Previous Orders</h3>
      </div>
  
      <div class="table-responsive">
            <!-- PROJECT TABLE -->
            <table class="table colored-header datatable project-list">
                <thead>
                    <tr>
                        <th>Order No</th>
                        <th>Customer Address</th>
                        <th>Order Date & Time</th>
                        <th>Payment Status</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Order</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(order) in filterBills.slice().reverse()" :key="order.bill_id">
                        <td>{{ order.bill_id }}</td>
                        <td>{{ order.bill_address }}</td>
                        <td>{{ order.bill_when }}</td>
                        <td>{{ getPaidStatus(order.bill_paid) }}</td>
                        <td>₱{{ order.bill_total }}</td>
                        <td :class="getStatusColor(order.bill_status)">{{ avaiableStatus[order.bill_status] }}</td>
                        <td><button @click="sendBillId(order.bill_id)">view</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
      <OrderDetails v-if="showOrderDetails" :bill="sendId">
            <button class="btn" @click="closeView">X</button>
      </OrderDetails>
    </div>
</template>


<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
import OrderDetails from "@/components/OrderDetails.vue";

export default {
    name: 'History',

    data() {
        return {
            avaiableStatus: ["cancelled", "pending", "confirmed", "packing", "now delivering", "delivered", "recieved"],
            allBills: [],
            showOrderDetails: false,
            sendId: undefined,
            interval: "",
            allFoodsInBill: [],
            item_qty: [],
            billMatch: undefined,
            //filteredFoodsData: [],
        }
    },

    created() {
        this.getAllBills();
        if (!this.admin) {
            this.$router.push("/");
        }
        //this.getAllFoods();
        //this.getBillStatus();
    },

    mounted: function () {
        this.autoUpdate();
    },

    beforeUnmount() {
        clearInterval(this.interval)
    },

    computed: {
        ...mapState(["allFoods", "admin"]),

        filterBills: function () {
            return this.allBills.filter((b) => b.bill_status >= 5);
        },
        //filterFoods: function () {
            //console.log('Computed filterFoods:', this.filteredFoodsData);
            //return this.allFoods.filter(
                //(f) => this.matchID(f, this.allFoodsInBill)
            //);
        //},
    },

    methods: {
        ...mapMutations(["setAdmin"]),
        getStatusColor(status) {
            switch (status) {
                case 0:
                    return 'cancelled';
                case 1:
                    return 'pending';
                case 2:
                    return 'confirmed';
                case 3:
                    return 'packing';
                case 4:
                    return 'delivering';
                case 5:
                    return 'delivered';
                case 6:
                    return 'recieved';
                default:
                    return '';
            }
        },
        //matchID: function (food, cartArray) {
            //let temp = "";
            //cartArray.forEach(element => {
                //if (parseInt(food.food_id) == element) {
                    //temp = food
                //}
            //});
            //return temp
        //},

        //async getAllFoods() {
            //if (this.bill) {
                //let data = (await axios.get('/billdetails/' + this.bill)).data;

                // Clear the arrays
                //this.allFoodsInBill = [];
                //this.item_qty = [];
                //this.filterFoods = [];

                //data.forEach(element => {
                    //this.allFoodsInBill.push(element.food_id);
                    //this.item_qty.push(element.item_qty);

                    // Find the matched food
                    //let matchedFood = this.allFoods.find(food => parseInt(food.food_id) === element.food_id);

                    //if (matchedFood) {
                       // this.filterFoods.push(matchedFood);
                    //}
                //);
                //console.log('allFoodsInBill:', this.allFoodsInBill);
                //console.log('item_qty:', this.item_qty);
                //console.log('filterFoods:', this.filterFoods);
            //}
        //},

        async getBillStatus() {
            if (this.bill) {
                this.billMatch = (await axios.get('/billstatus/bill/' + this.bill)).data[0];
            }
        },
        getPaidStatus: function (billPaid) {
            return (billPaid === true || billPaid === "true") ? "Paid" : "Unpaid";
        },

        goToDashboard() {
            this.$router.push('/admin/dashboard');
        },

        goToHistory() {
            console.log("History:", this.admin);
            this.$router.push("/admin/history");
        },

        goToManageMenu() {
            console.log("Admin manage menu:", this.admin);
            this.$router.push("/admin/managemenu");
        },

        scrollToTop() {
            window.scrollTo(0, 0);
        },

        async getAllBills() {
            this.allBills = (await axios.get('/billstatus')).data;
        },

        handleLogout: function () {
            this.setAdmin("");
            console.log("Admin logged out. Admin state:", this.admin);
            this.$router.push("/admin");
        },

        canUpdateStatus(bill){
            return this.kitchen && (bill.bill_status === 2 ||bill.bill_status === 3 || bill.bill_status === 4);
        },

        async nextStatusBtn(id) {
            await axios.put('/billstatus/' + id);
            this.getAllBills();
        },

        async paidBtn(id) {
            await axios.put('/billstatus/paid/' + id);
            this.getAllBills();
        },

        async cancelBtn(id) {
            await axios.put('/billstatus/cancel/' + id);
            this.getAllBills();
        },

        sendBillId: function (id) {
            this.sendId = id
            this.showOrderDetails = !this.showOrderDetails;
        },

        closeView: function () {
            this.showOrderDetails = !this.showOrderDetails;
        },

        autoUpdate: function () {
            this.interval = setInterval(function () {
                this.getAllBills();
            }.bind(this), 1000);
        }
    },
    components: { OrderDetails }
}
</script>

<style scoped>
.cancelled {
    color: red;
}

.pending {
    color: orange;
}

.confirmed {
    color: green;
}

.packing {
    color: orange;
}

.delivering {
    color: orange;
}

.delivered {
    color: green;
}
.recieved {
    color: green;
}
.actions {
    margin-top: 10px;
}

.box-row {
  display: flex;
  flex-wrap: wrap;
  margin: -15px;
}
.heading {
    margin-top: 2rem;
}

.box {
    margin-bottom: 15px;
    box-sizing: border-box;
    background: #f7f7f7;
    border-radius: 0.5rem;
    padding: 2rem;
    flex: 0 0 calc(50% - 30px);
    margin-right: 30px;
}

.admin-container {
    background-color: #DAE3F3;
    height: fit-content;
    padding: 2rem 9%;
    font-size: 16px;
    margin-bottom: 20px;
    min-height: 110vh;
}

.box-container {
    margin-top: 5px;
    border-radius: 0.5rem;
    position: relative;
    padding: 2rem;
    box-sizing: border-box;
}

.project-list>tbody>tr>td {
    padding: 12px 8px;
}

.project-list>tbody>tr>td .avatar {
    width: 22px;
    border: 1px solid #CCC;
}

.colored-header thead {
    background-color: #27ae60; 
    color: white; 
}

.table-responsive {
    margin-top: 8vh;
}

.action-btn,
.cancel-btn,
.paid-btn {
    width: 100px;
    height: 25px;
    color: white;
    text-transform: capitalize;
}

.view-btn {
    background-color: #FFF2CC;
}

.action-btn {
    background-color: #27ae60;
    margin-right: 10px;
}

.cancel-btn{
    background-color: red;
}
.paid-btn {
    background-color: #27ae60;
}

.action-btn:hover {
    background-color: #27ae60;
}
.order-details {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: center;
    justify-content: center;
}

.order-details .order-details-inner {
    width: 60vw;
    height: 70vh;
    background-color: #fff;
    padding: 32px;
}


.order-details .order-details-inner h2 {
    margin: 0;
    font-size: 32px;
    color: #27ae60;
    margin-bottom: 20px;
}


.order-details .order-details-inner .product-detail .image img {
    height: 8rem;
    width: 8rem;
    margin: 20px;
}

.order-details .order-details-inner .product-detail .content {
    margin-top: 20px;
    font-size: 12px;
    width: 100%;
}

.order-details .order-details-inner .product-detail .content p:first-of-type {
    font-size: 16px;
    color: #f38609;
}

.order-details .order-details-inner .product-detail .content p span {
    font-size: 14px;
    color: black;
}

.order-details .order-details-inner .price {
    margin-top: 30px;
    font-size: 16px;
}


@media (max-width: 768px) {

    .order-details .order-details-inner {
        width: 80vw;
        height: 60vh;

    }

    .order-details .order-details-inner h2 {
        font-size: 20px;
    }

    .order-details .order-details-inner .product-detail .content .desc,
    .order-details .order-details-inner .product-detail .content .name span {
        font-size: 12px !important;
    }

    .order-details .order-details-inner .product-detail .content .name {
        font-size: 14px !important;
    }


}

@media (max-width: 576px) {
    .order-details .order-details-inner {
        width: 90vw;
        height: 65vh;
    }

    .order-details .order-details-inner div:first-of-type {
        flex-direction: column;
    }
}

@media (max-width: 376px) {
    .order-details .order-details-inner {
        width: 90vw;
        height: 65vh;
        padding: 5px !important;
    }

    .order-details .order-details-inner .product-detail .content .name {
        font-size: 12px !important;
    }


}
</style>