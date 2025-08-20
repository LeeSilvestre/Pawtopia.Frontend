<template>
    <vue-basic-alert :duration="300" :closeIn="2000" ref="alert" />
    <section class="order-section">

        <div class="heading">
            <span>Terms and Condition</span>
        </div>

        <div class="row">
            <div class="about-content">
                <div class="about-content-text">
                    <h3>Introduction</h3>
                    <p> 
                        Welcome to Pawtopia. By using our online ordering services, you agree to comply with and be bound by the following terms and conditions. Please read these terms carefully before using our services.
                    </p>
                    <h3>Acceptance of Terms</h3>
                    <p>
                        By accessing or using our online ordering services, you agree to these terms and conditions, including any additional terms and conditions and policies referenced herein. If you do not agree with these terms, please do not use our services.
                    </p>
                    <h3>Ordering and Payments</h3>
                    <p>
                        You may place orders for food and beverages through our online platform. Payments must be made using the accepted payment methods specified on our platform.
                    </p>
                    <h3>User Accounts</h3>
                    <p>
                        You are required to create a user account to access certain features of our online ordering services. You are responsible for maintaining the confidentiality of your account information and password.
                    </p>
                </div>
            </div>
        </div>

        <div class="icons-container">

            <div class="icons ">
                <img src="../assets/images/icon-1.png" alt="">
                <h3>7:00am to 10:00pm</h3>
            </div>

            <div class="icons">
                <img src="../assets/images/icon-2.png" alt="">
                <h3>+63 951-123-1234</h3>
            </div>

            <div class="icons">
                <img src="../assets/images/icon-3.png" alt="">
                <h3>Gordon College Olongapo City</h3>
            </div>

        </div>
    </section>
</template>

<script>
import axios from 'axios';
import VueBasicAlert from 'vue-basic-alert'
export default {
    name: "Table",

    data() {
        return {
            orderObj: { name: "", phone: "", people: "", tables: "", card: "", when: "", note: "" },
            errorObj: { nameErr: [], phoneErr: [], peopleErr: [], tablesErr: [], cardErr: [], whenErr: [] },
        }
    },

    methods: {
        availableTime: function () {
            var now = new Date();
            var day = ("0" + now.getDate()).slice(-2);
            var currentMonth = ("0" + (now.getMonth() + 1)).slice(-2);
            var maxMonth = ("0" + (now.getMonth() + 3)).slice(-2);
            var hour = ("0" + (now.getHours())).slice(-2);
            var min = ("0" + (now.getMinutes())).slice(-2);
            var minRange = now.getFullYear() + "-" + currentMonth + "-" + day + "T" + hour + ":" + min;
            var maxRange = now.getFullYear() + "-" + maxMonth + "-" + day + "T" + hour + ":" + min;

            document.getElementById("oWhen").setAttribute("min", minRange);
            document.getElementById("oWhen").setAttribute("max", maxRange);
        },

        resetCheckErr: function () {
            this.errorObj.nameErr = [];
            this.errorObj.phoneErr = [];
            this.errorObj.peopleErr = [];
            this.errorObj.tablesErr = [];
            this.errorObj.cardErr = [];
            this.errorObj.whenErr = [];
        },

        checkEmptyErr: function () {
            for (var typeErr in this.errorObj) {
                if (this.errorObj[typeErr].length != 0) {
                    return false;
                }
            }
            return true;
        },



        checkForm: function () {
            this.resetCheckErr();

            // Name validate
            if (!this.orderObj.name) {
                this.errorObj.nameErr.push("Entering a name is required");
            }
            else {
                if (!/^[A-Za-z]+$/.test(this.orderObj.name.replace(/\s/g, ""))) {
                    this.errorObj.nameErr.push('A name can only contain letters');
                }
            }

            // Phone validate
            if (!this.orderObj.phone) {
                this.errorObj.phoneErr.push('Entering phone number is required');
            }
            else {
                if (!this.orderObj.phone.startsWith('84')) {
                    this.errorObj.phoneErr.push('Phone numbers must start with 84');
                }

                if (!/[0-9]{10}/.test(this.orderObj.phone)) {
                    this.errorObj.phoneErr.push('Phone numbers can only contain numbers');
                }

                if (this.orderObj.phone.length != 11) {
                    this.errorObj.phoneErr.push('Phone numbers must have exactly 11 digits');
                }
            }

            if (!this.orderObj.people) {
                this.errorObj.peopleErr.push("Entering number of people is required");
            }
            else {
                if (parseInt(this.orderObj.people) > 100) {
                    this.errorObj.peopleErr.push("Each store can only serve 100 people at a time");
                }

                if (parseInt(this.orderObj.people) < 1) {
                    this.errorObj.peopleErr.push("Number of people must be greater than or equal to 1");
                }
            }

            if (!this.orderObj.tables) {
                this.errorObj.tablesErr.push("Entering number of tables is required");
            }
            else {
                if (parseInt(this.orderObj.tables) > 50) {
                    this.errorObj.tablesErr.push("Each store can only have maximum 50 tables");
                }

                if (parseInt(this.orderObj.tables) < 1) {
                    this.errorObj.tablesErr.push("Number of tables must be greater than or equal to 1");
                }

                if (parseInt(this.orderObj.people) < parseInt(this.orderObj.tables)) {
                    this.errorObj.tablesErr.push("The number of tables must be less than the number of people");
                }
            }

            if (this.orderObj.card) {
                if (!/[0-9]{10}/.test(this.orderObj.card)) {
                    this.errorObj.cardErr.push('Card numbers can only contain numbers');
                }

                if (this.orderObj.card.length != 10) {
                    this.errorObj.cardErr.push('Card number must have exactly 10 digits');
                }
            }

            if (!this.orderObj.when) {
                this.errorObj.whenErr.push("Entering when to serve is required");
            }
            else {
                let minRange = document.getElementById("oWhen").getAttribute("min");
                let maxRange = document.getElementById("oWhen").getAttribute("max");
                let dateMin = new Date(minRange);
                let dateMax = new Date(maxRange);
                let dateInput = new Date(this.orderObj.when);

                if (dateInput === "Invalid Date") {
                    this.errorObj.whenErr.push("Invalid date input");
                }

                if (dateInput.getTime() < dateMin.getTime() || dateInput.getTime() > dateMax.getTime()) {
                    this.errorObj.whenErr.push("Available reservation range is from now to next two months");
                }

                if (dateInput.getHours() < 7 || dateInput.getHours() > 22) {
                    this.errorObj.whenErr.push("Store open from 7:00 AM to 10:00 PM everyday");
                }
            }


        },

        async handleSubmit(e) {
            this.checkForm();

            if (!this.checkEmptyErr()) {
                e.preventDefault();
            } else {
                e.preventDefault();

                let data = {
                    book_name: this.orderObj.name,
                    book_phone: parseInt(this.orderObj.phone),
                    book_people: parseInt(this.orderObj.people),
                    book_tables: parseInt(this.orderObj.tables),
                    user_id: parseInt(this.orderObj.card),
                    book_when: this.orderObj.when,
                    book_note: this.orderObj.note,
                }

                await axios.post("/booking", data);

                this.$refs.alert.showAlert('success', 'Thank you! We will call you soon to confirm your order', 'Booking Successfully !')
                document.getElementById("bookTableForm").reset();
            }
        }
    },

    components: {
        VueBasicAlert
    }

}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Satisfy&display=swap");

.about-content-text .developer-names {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding-left: 10px;
}

.about-content-text .developer {
    text-align: center;
    margin: 10px;
}

.about-content-text .developer img {
    max-width: 50%; 
    height: auto; 
    max-height: 70px;
    margin-bottom: 5px; 
}

.about-content-text .developer span {
    display: block;
}

.about-content-text .developer-names span {
    margin: 5px;
    flex-basis: 45%;
}
.order-section {
    padding: 2rem 9%;
}

.order-section .about-content-text {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding-left: 10px;
}

.order-section .about-content-text p{
    margin-bottom: 2rem;
    font-size: 17px;
}

.order-section .about-content-text h3{
    font-size: 23px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
}

.order-section .icons-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
}

.order-section .icons-container .icons {
    border-radius: .5rem;
    padding: 2rem;
    text-align: center;
    background: #f7f7f7;
}

.order-section .icons-container .icons img {
    height: 10rem;
}

.order-section .icons-container .icons h3 {
    font-size: 2rem;
    color: #130f40;
    margin-top: .5rem;
}

.order-section form {
    background: #f7f7f7;
    padding: 2rem;
    border-radius: .5rem;
}

.order-section form .row {
    justify-content: space-between;
}

.order-section form .row .input-box {
    width: 49%;
    padding: 1.8rem 0;
}

.order-section form .row label {
    font-size: 1.7rem;
    color: #666;
}

.order-section form .row p {
    font-size: 1.5rem;
    position: absolute;
    color: rgb(243, 47, 47);
    margin: 0;
    padding-top: 5px;
}

.order-section form .row input,
.order-section form .row textarea {
    width: 100%;
    margin-top: .5rem;
    padding: 1rem 1.2rem;
    width: 100%;
    border-radius: .5rem;
    font-size: 1.6rem;
    text-transform: none;
    color: #130f40;
}

.order-section form .row textarea {
    height: 20rem;
    resize: none;
}

.order-section form .row .map {
    height: 100%;
    width: 100%;
    border-radius: .5rem;
}

@media (max-width: 768px) {
    .order form .row .input-box {
        width: 100%;
    }

    .order-section form .row {
        display: block;
        max-width: 100%;
        width: 100%;
        margin: 0;
    }

    .order-section form .row .input-box {
        width: 100%;
    }

}

@media (max-width: 576px) {
    .order-section .icons-container {
        grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
    }
}
</style>