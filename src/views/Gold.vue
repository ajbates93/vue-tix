<template>
    <v-container class="mx-auto">
        <v-stepper v-model="progress">
            <v-stepper-header>
                <v-stepper-step :key="1-step" :complete="progress > 1" step="1">Choose Membership</v-stepper-step>
                <v-stepper-step :key="2-step" :complete="progress > 2" step="2">Member Details</v-stepper-step>
                <v-stepper-step :key="3-step" :complete="progress > 3" step="3">Confirm Selections</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
                <v-stepper-content step="1">
                    <h1 class="mb-3">Gold Membership</h1>
                    <v-container class="mx-0 pa-0" fluid>
                        <v-row no-gutters>
                            <v-col cols="4">
                                <v-card class="mx-0 my-4 pa-2" elevation="0">
                                    <v-form @submit.prevent>
                                        <v-container class="mx-0 pa-0">
                                            <v-row no-gutters>
                                                <v-col cols="4">
                                                    <v-select v-model="selectAdults" v-on:change="updateText()" label="Adults" :items="adults" required></v-select>
                                                </v-col>
                                                <v-col class="d-flex justify-start align-center pl-4" cols="8">
                                                    <v-icon transition="fade" color="#fc4f59" large v-for="item in selectAdults" :key="item.id">mdi-account</v-icon>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="4">
                                                    <v-select v-model="selectAdultGuests" label="Adult Guests" :items="adultGuests"></v-select>
                                                </v-col>
                                                <v-col class="d-flex justify-start align-center pl-4" cols="8">
                                                    <v-icon class="guest" large v-for="item in selectAdultGuests" :key="item.id">mdi-account</v-icon>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="4">
                                                    <v-select v-model="selectChild" label="Child (4+)" :items="child"></v-select>
                                                </v-col>
                                                <v-col class="d-flex justify-start align-center pl-4" cols="8">
                                                    <v-icon color="#fc4f59" large v-for="item in selectChild" :key="item.id">mdi-account-child</v-icon>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters>
                                                <v-col cols="4">
                                                    <v-select v-model="selectChildGuests" label="Child Guests (4+)" :items="childGuests"></v-select>
                                                </v-col>
                                                <v-col class="d-flex justify-start align-center pl-4" cols="8">
                                                    <v-icon class="guest" large v-for="item in selectChildGuests" :key="item.id">mdi-account-child</v-icon>
                                                </v-col>
                                            </v-row>
                                            <v-row no-gutters class="my-3">
                                                <v-btn color="success" large :loading="loading" @click="calculatePrice(), loader = 'loading'">{{this.buttonText}}</v-btn>
                                            </v-row>
                                        </v-container>
                                    </v-form>
                                </v-card>
                            </v-col>
                            <v-col cols="8">
                                <v-card max-width="600" dark color="success" v-if="showSummary" class="mx-3 my-10 pa-6" elevation="3" :disabled="this.blurSummary">
                                    <v-card-title class="mb-3"><v-icon left large>mdi-check-circle-outline</v-icon> Based on your selection...</v-card-title>
                                    <v-card-subtitle style="font-size: 1.25rem; color:#fff;">Our <b>Family Membership</b> is the best option for you.</v-card-subtitle>
                                    <v-card-text>
                                        <ul class="mb-3">
                                            <li>{{this.selectAdults}} x Adults: £{{formatPrice(this.adultsTotal)}}</li>
                                            <li>{{this.selectAdultGuests}} x Adult Guests: £{{formatPrice(this.adultsGTotal)}}</li>
                                            <li>{{this.selectChild}} x Child: £{{formatPrice(this.childsTotal)}}</li>
                                            <li>{{this.selectChildGuests}} x Child Guests: £{{formatPrice(this.childsGTotal)}}</li>
                                        </ul>
                                        <p><b>Total: </b><span><b>£{{formatPrice(this.totalCost)}}</b></span></p>
                                    </v-card-text>
                                    <v-btn right color="success darken-1" large @click="progress = 2">Confirm</v-btn>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-stepper-content>
                <v-stepper-content step="2">
                    <h1 class="mb-5 text-decoration-underline">Member Details</h1>
                    <v-form v-model="primary">
                        <v-container fluid class="ma-0 pa-0" color="grey lighten-3">
                            <h5 class="my-3 default-font"><v-icon large left style="color: #a58c5c;">mdi-account</v-icon>Primary Member Details</h5>
                            <v-row>
                                <v-col cols="12" md="2">
                                    <v-select
                                        v-model="selectTitle"
                                        :items="titles"
                                        label="Title"
                                        required>
                                    </v-select>
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field
                                        v-model="firstName"
                                        label="First Name"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field
                                        v-model="lastName"
                                        label="Last Name"
                                        required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model="emailAddress"
                                        label="Email Address"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model="homePhone"
                                        label="Home Phone"
                                        type="number"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model="mobilePhone"
                                        label="Mobile Phone"
                                        type="number"
                                        required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <h5 class="my-3 default-font"><v-icon large left style="color: #a58c5c;">mdi-home</v-icon>Address</h5>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model="addrLineOne"
                                        label="Address Line One"
                                        type="text"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model="addrLineOne"
                                        label="Address Line One"
                                        type="text"
                                        required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model="addrCity"
                                        label="Town/City"
                                        type="text"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model="addrRegion"
                                        label="Region"
                                        type="text"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="2">
                                    <v-text-field
                                        v-model="addrPostcode"
                                        label="Postcode"
                                        type="text"
                                        required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <h5 class="my-3 default-font">Additional Member Details</h5>
                        </v-container>
                    </v-form>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-container>
</template>

<script>
import router from "../router"

export default {
    data() {
        return {
            selectAdults: 0,
            selectAdultGuests: 0,
            selectChild: 0,
            selectChildGuests: 0,
            selectTitle: '',
            adults: [ 0, 1, 2, 3, 4, 5 ],
            adultGuests: [ 0, 1, 2, 3, 4, 5 ],
            child: [ 0, 1, 2, 3, 4, 5 ],
            childGuests: [ 0, 1, 2, 3, 4, 5 ],
            titles: [ 'Mr', 'Mrs', 'Miss', 'Master', 'Dr', 'Lord' ],
            showSummary: false,
            blurSummary: true,
            adultPrice: 85,
            adultGPrice: 95,
            childPrice: 45,
            childGuestPrice: 20,
            adultsTotal: null,
            adultsGTotal: null,
            childsTotal: null,
            childsGTotal: null,
            totalCost: null,
            loader: null,
            loading: false,
            buttonText: 'Calculate Price',
            progress: 2,
            tabs: 3,
        }
    },
    watch: {
        loader () {
            const l = this.loader
            this[l] = !this[l]

            setTimeout(() => (this[l] = false, this.blurSummary = false, this.showSummary = true), 3000)

            this.loader = null
        },
    },
    components: {
    },
    methods: {
        goBack() {
            router.go(-1)
        },
        confirm() {
            this.$store.dispatch("confirm", {
                adultsNo: this.usersForm.adultsNo,
                adultsGuestNo: this.usersForm.adultsGuestNo,
                childNo: this.usersForm.childNo,
                childGuestNo: this.usersForm.childGuestNo
            })
        },
        sumPrice(price, value) {
            return price * value
        },
        formatPrice(value) {
            let val = (value/1).toFixed(2)
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        calculatePrice() {
            this.blurSummary = true
            this.adultsTotal = this.sumPrice(this.adultPrice, this.selectAdults)
            this.adultsGTotal = this.sumPrice(this.adultGPrice, this.selectAdultGuests)
            this.childsTotal = this.sumPrice(this.childPrice, this.selectChild)
            this.childsGTotal = this.sumPrice(this.childGuestPrice, this.selectChildGuests)
            this.totalCost = this.adultsTotal + this.adultsGTotal + this.childsTotal + this.childsGTotal;
        },
        updateText() {
            this.buttonText = 'Re-calculate Price'
        },
    }    
}
</script>