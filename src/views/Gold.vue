<template>
    <v-container class="mx-auto">
        <v-stepper v-model="progress">
            <v-stepper-header>
                <v-stepper-step :key="1" :complete="progress > 1" step="1">Choose Membership</v-stepper-step>
                <v-stepper-step :key="2" :complete="progress > 2" step="2">Member Details</v-stepper-step>
                <v-stepper-step :key="3" :complete="progress > 3" step="3">Confirm Selections</v-stepper-step>
            </v-stepper-header>
            <v-stepper-items>
                <v-stepper-content step="1">
                    <h1 class="mb-3">Gold Membership</h1>
                    <v-container class="mx-0 pa-0" fluid>
                        <v-row no-gutters>
                            <p>Enter your desired number of members. We will always give you the most cost effective price and match your desired number of memberships to one of our group membership options.</p>
                            <p>Note: Members with an <b>Adult Guest</b> type of membership cannot visit Castle Howard without being accompanied by the Primary Member that they are bought with.</p>
                        </v-row>
                        <v-row no-gutters>
                            <v-form @submit.prevent>
                                <v-container fluid class="mx-0 pa-0">
                                    <v-row class="mb-0 pb-0">
                                        <v-col class="mb-0 pb-0" cols="6" md="3">
                                            <v-select outlined v-model="selectAdults" label="Adults" :items="adults" required></v-select>
                                        </v-col>
                                        <v-col class="mb-0 pb-0" cols="6" md="3">
                                            <v-select outlined v-model="selectAdultGuests" label="Adult Guests" :items="adultGuests"></v-select>
                                        </v-col>
                                        <v-col class="mb-0 pb-0" cols="6" md="3">
                                            <v-select outlined v-model="selectChild" label="Child (4+)" :items="child"></v-select>
                                        </v-col>
                                        <v-col class="mb-0 pb-0" cols="6" md="3">
                                            <v-select outlined v-model="selectChildGuests" label="Child Guests (4+)" :items="childGuests"></v-select>
                                        </v-col>
                                    </v-row>
                                    <v-row class="mt-0 pt-0">
                                        <v-col class="d-flex justify-start align-center mt-0 pt-0" cols="6" md="3">
                                            <v-sheet class="grey lighten-4 pa-1" rounded>
                                                <v-icon transition="fade" color="#fc4f59" large v-for="item in selectAdults" :key="item.id">mdi-account</v-icon>
                                            </v-sheet>
                                        </v-col>
                                        <v-col class="d-flex justify-start align-center mt-0 pt-0" cols="6" md="3">
                                            <v-sheet class="grey lighten-4 pa-1" rounded>
                                                <v-icon class="guest" large v-for="item in selectAdultGuests" :key="item.id">mdi-account</v-icon>
                                            </v-sheet>
                                        </v-col>
                                        <v-col class="d-flex justify-start align-center mt-0 pt-0" cols="6" md="3">
                                            <v-sheet class="grey lighten-4 pa-1" rounded>
                                                <v-icon color="#fc4f59" large v-for="item in selectChild" :key="item.id">mdi-account-child</v-icon>
                                            </v-sheet>
                                        </v-col>
                                        <v-col class="d-flex justify-start align-center mt-0 pt-0" cols="6" md="3">
                                            <v-sheet class="grey lighten-4 pa-1" rounded>
                                                <v-icon class="guest" large v-for="item in selectChildGuests" :key="item.id">mdi-account-child</v-icon>
                                            </v-sheet>
                                        </v-col>
                                    </v-row>
                                    <v-row no-gutters class="my-3">
                                        <v-btn color="bg-chRed" dark large :loading="loading" @click="calculatePrice(), loader = 'loading'">{{this.buttonText}}</v-btn>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </v-row>
                        <v-row>
                            <v-card min-width="100%" dark color="success" v-if="showSummary" class="mx-3 my-5 pa-6" elevation="3" :disabled="this.blurSummary">
                                <v-card-title class="mb-3"><v-icon left large>mdi-check-circle-outline</v-icon> Based on your selection...</v-card-title>
                                <v-card-subtitle style="font-size: 1.25rem; color:#fff;">Our <b>Family Membership</b> is the best option for you.</v-card-subtitle>
                                <v-card-text>
                                    <ul class="mb-3">
                                        <li v-if="this.selectAdults > 0">{{this.selectAdults}} x Adults: £{{formatPrice(this.adultsTotal)}}</li>
                                        <li v-if="this.selectAdultGuests > 0">{{this.selectAdultGuests}} x Adult Guests: £{{formatPrice(this.adultsGTotal)}}</li>
                                        <li v-if="this.selectChild > 0">{{this.selectChild}} x Child: £{{formatPrice(this.childsTotal)}}</li>
                                        <li v-if="this.selectChildGuests > 0">{{this.selectChildGuests}} x Child Guests: £{{formatPrice(this.childsGTotal)}}</li>
                                    </ul>
                                    <p><b>Total: </b><span><b>£{{formatPrice(this.totalCost)}}</b></span></p>
                                </v-card-text>
                                <v-btn right color="success darken-1" large @click="progress = 2">Add Member Details</v-btn>
                            </v-card>
                        </v-row>
                    </v-container>
                </v-stepper-content>
                <v-stepper-content step="2">
                    <h1 class="mb-5 text-decoration-underline">Member Details</h1>
                    <v-form @submit.prevent class="mb-3">
                        <v-container fluid class="ma-0 pa-0">
                            <v-card color="grey lighten-4" class="pb-0 mb-5">
                                <v-card-title class="mb-3"><v-icon large left color="#a58c5c" class="mr-3">mdi-gift</v-icon> Is this a gift?</v-card-title>
                                <v-card-subtitle>If this membership is a gift for someone else you will need to enter the person you are gifting to's details as well as your own.</v-card-subtitle>
                                <v-card-text class="my-0 py-0">
                                    <v-checkbox v-model="isGift" class="my-0" label="This is a gift" color="#a58c5c"></v-checkbox>
                                </v-card-text>
                            </v-card>
                            <h5 v-if="isGift" class="my-3 default-font font-weight-medium"><v-icon large left style="color: #a58c5c">mdi-gift</v-icon>Your Details</h5>
                            <v-row v-if="isGift">
                                <v-col cols="12" md="2">
                                    <v-select
                                        v-model="gifter.selectTitle"
                                        :items="titles"
                                        label="Title"
                                        required>
                                    </v-select>
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field
                                        v-model.trim="gifter.firstName"
                                        label="First Name"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field
                                        v-model.trim="gifter.lastName"
                                        label="Last Name"
                                        required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row v-if="isGift">
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model.trim="gifter.emailAddress"
                                        label="Email Address"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model.trim="gifter.homePhone"
                                        label="Home Phone"
                                        type="number"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model.trim="gifter.mobilePhone"
                                        label="Mobile Phone"
                                        type="number"
                                        required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <h5 v-if="isGift" class="my-3 default-font font-weight-medium"><v-icon large left style="color: #a58c5c;">mdi-home</v-icon>Your Address</h5>
                            <v-row v-if="isGift">
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model.trim="gifter.addrLineOne"
                                        label="Address Line One"
                                        type="text"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model.trim="gifter.addrLineTwo"
                                        label="Address Line Two"
                                        type="text"
                                        required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row v-if="isGift">
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model.trim="gifter.addrCity"
                                        label="Town/City"
                                        type="text"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model.trim="gifter.addrRegion"
                                        label="Region"
                                        type="text"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="2">
                                    <v-text-field
                                        v-model.trim="gifter.addrPostcode"
                                        label="Postcode"
                                        type="text"
                                        required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <h5 class="my-3 default-font font-weight-medium"><v-icon large left style="color: #fc4f59">mdi-account</v-icon>Primary Member Details</h5>
                            <p>Please enter the correct name and address information for the person you wish to be the primary member and contact.</p>
                            <v-row>
                                <v-col cols="12" md="2">
                                    <v-select
                                        v-model="primary.selectTitle"
                                        :items="titles"
                                        label="Title"
                                        required>
                                    </v-select>
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field
                                        v-model.trim="primary.firstName"
                                        label="First Name"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="5">
                                    <v-text-field
                                        v-model.trim="primary.lastName"
                                        label="Last Name"
                                        required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model.trim="primary.emailAddress"
                                        label="Email Address"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model.trim="primary.homePhone"
                                        label="Home Phone"
                                        type="number"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model.trim="primary.mobilePhone"
                                        label="Mobile Phone"
                                        type="number"
                                        required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <h5 class="my-3 default-font font-weight-medium"><v-icon large left style="color: #fc4f59;">mdi-home</v-icon>Primary Member Address</h5>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model.trim="primary.addrLineOne"
                                        label="Address Line One"
                                        type="text"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model.trim="primary.addrLineTwo"
                                        label="Address Line Two"
                                        type="text"
                                        required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model.trim="primary.addrCity"
                                        label="Town/City"
                                        type="text"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model.trim="primary.addrRegion"
                                        label="Region"
                                        type="text"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="2">
                                    <v-text-field
                                        v-model.trim="primary.addrPostcode"
                                        label="Postcode"
                                        type="text"
                                        required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <h5 class="my-3 default-font font-weight-medium"><v-icon large left style="color: #fc4f59;">mdi-account-multiple-plus</v-icon>Additional Member Details</h5>
                            <p>You have selected <span class="font-weight-bold">{{this.additionalMembers}}</span> additional members.</p>
                            <v-row align="center" v-for="guest in additionalMembers" :key="guest.id">
                                <v-col cols="12" md="1">
                                    <v-subheader>Guest {{guest}}</v-subheader>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model.trim="guest.firstName"
                                        label="First Name"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model.trim="guest.lastName"
                                        label="Last Name"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="2">
                                    <span>TODO: Date of Birth</span>
                                </v-col>
                            </v-row>
                        </v-container>
                        <v-btn color="grey" dark class="mr-5" large @click="previousStep()">Back</v-btn>
                        <v-btn color="success" large @click="nextStep()">Confirm Member Details</v-btn>
                    </v-form>
                </v-stepper-content>
                <v-stepper-content step="3">
                    <h1 class="mb-5 text-decoration-underline">Confirm Membership</h1>
                    <v-container class="mb-5">
                        <v-row align="center">
                            <v-subheader>Primary Contact Name</v-subheader>
                            <span class="font-weight-bold">{{primary.firstName}} {{this.primary.lastName}}</span>
                        </v-row>
                        <v-row align="center">
                            <v-subheader>Primary Contact Email</v-subheader>
                            <span class="font-weight-bold">{{primary.emailAddress}}</span>
                        </v-row>
                        <v-row align="center">
                            <v-subheader>Primary Contact Home Phone</v-subheader>
                            <span class="font-weight-bold">{{primary.homePhone}}</span>
                        </v-row>
                        <v-row align="center">
                            <v-subheader>Primary Contact Mobile Phone</v-subheader>
                            <span class="font-weight-bold">{{primary.mobilePhone}}</span>
                        </v-row>
                        <v-divider></v-divider>
                        <v-row align="center">
                            <v-subheader>Primary Contact Address</v-subheader>
                            <div class="mb-1">{{primary.addrLineOne}}</div>
                            <div class="mb-1">{{primary.addrLineTwo}}</div>
                            <div class="mb-1">{{primary.addrCity}}</div>
                            <div class="mb-1">{{primary.addrRegion}}</div>
                            <div class="mb-1">{{primary.addrPostcode}}</div>
                        </v-row>
                    </v-container>
                    <v-form @submit.prevent class="mb-3">
                        <v-btn color="grey" dark class="mr-5" large @click="previousStep()">Back</v-btn>
                        <v-btn color="success" large @click="nextStep()">Confirm Member Details</v-btn>
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
            progress: 1,
            tabs: 3,
            additionalMembers: 0,
            isGift: false,
            primary: {
                selectTitle: '',
                firstName: '',
                lastName: '',
                emailAddress: '',
                homePhone: '',
                mobilePhone: '',
                addrLineOne: '',
                addrLineTwo: '',
                addrCity: '',
                addrRegion: '',
                addrPostcode: '',
            },
            gifter: {
                selectTitle: '',
                firstName: '',
                lastName: '',
                emailAddress: '',
                homePhone: '',
                mobilePhone: '',
                addrLineOne: '',
                addrLineTwo: '',
                addrCity: '',
                addrRegion: '',
                addrPostcode: '',
            }

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
        previousStep() {
            this.progress = this.progress - 1
        },
        nextStep() {
            this.progress = this.progress + 1
        },
        confirm() {
            this.$store.dispatch("confirm", {
                adultsNo: this.usersForm.adultsNo,
                adultsGuestNo: this.usersForm.adultsGuestNo,
                childNo: this.usersForm.childNo,
                childGuestNo: this.usersForm.childGuestNo
            })
        },
        confirmContactForm() {
            this.$store.dispatch("confirmContact", {
                primary: this.primary.firstName
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
            this.additionalMembers = this.selectAdults - 1
        },
    }    
}
</script>