<template>
    <v-container class="mx-auto">
        <v-stepper v-model="progress">
            <v-stepper-header>
                <v-stepper-step :key="1" :complete="progress > 1" step="1">Choose Membership Types</v-stepper-step>
                <v-stepper-step :key="2" :complete="progress > 2" step="2">Member Details</v-stepper-step>
                <v-stepper-step :key="3" :complete="progress > 3" step="3">Confirm Details</v-stepper-step>
                <v-stepper-step :key="4" :complete="progress > 4" step="4">Payment</v-stepper-step>
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
                                        <v-col class="mb-0 pb-0" cols="6">
                                            <v-select outlined v-model="selectAdults" label="Adults" :items="adults" required></v-select>
                                        </v-col>
                                        <!-- <v-col class="mb-0 pb-0" cols="6" md="3">
                                            <v-select outlined v-model="selectAdultGuests" label="Adult Guests" :items="adultGuests"></v-select>
                                        </v-col> -->
                                        <v-col class="mb-0 pb-0" cols="6">
                                            <v-select outlined v-model="selectChild" label="Child (Age 4 - 16)" :items="child"></v-select>
                                        </v-col>
                                        <!-- <v-col class="mb-0 pb-0" cols="6" md="3">
                                            <v-select outlined v-model="selectChildGuests" label="Child Guests (Age 4 - 16)" :items="childGuests"></v-select>
                                        </v-col> -->
                                    </v-row>
                                    <v-row class="mt-0 pt-0">
                                        <v-col class="d-flex justify-start align-center mt-0 pt-0" cols="6">
                                            <v-sheet class="grey lighten-4 pa-1" rounded>
                                                <v-icon transition="fade" color="#fc4f59" large v-for="item in selectAdults" :key="item.id">mdi-account</v-icon>
                                            </v-sheet>
                                        </v-col>
                                        <!-- <v-col class="d-flex justify-start align-center mt-0 pt-0" cols="6" md="3">
                                            <v-sheet class="grey lighten-4 pa-1" rounded>
                                                <v-icon class="guest" large v-for="item in selectAdultGuests" :key="item.id">mdi-account</v-icon>
                                            </v-sheet>
                                        </v-col> -->
                                        <v-col class="d-flex justify-start align-center mt-0 pt-0" cols="6">
                                            <v-sheet class="grey lighten-4 pa-1" rounded>
                                                <v-icon color="#fc4f59" large v-for="item in selectChild" :key="item.id">mdi-account-child</v-icon>
                                            </v-sheet>
                                        </v-col>
                                        <!-- <v-col class="d-flex justify-start align-center mt-0 pt-0" cols="6" md="3">
                                            <v-sheet class="grey lighten-4 pa-1" rounded>
                                                <v-icon class="guest" large v-for="item in selectChildGuests" :key="item.id">mdi-account-child</v-icon>
                                            </v-sheet>
                                        </v-col> -->
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
                                    <p class="mb-1"><b>Total: </b><span><b>£{{formatPrice(this.totalCost)}}</b></span></p>
                                    <p><b>Total (Direct Debit): </b><span class="text-decoration-line-through mr-1">£{{formatPrice(this.totalCost)}}</span><b>£{{formatPrice(this.totalDDCost)}}</b></p>
                                </v-card-text>
                                <v-btn right color="success darken-1" large @click="progress = 2">Add Member Details</v-btn>
                            </v-card>
                        </v-row>
                    </v-container>
                </v-stepper-content>
                <v-stepper-content step="2">
                    <h1 class="mb-5">Member Details</h1>
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
                                    <!-- <v-select
                                        v-model="gifter.selectTitle"
                                        :items="titles"
                                        label="Title"
                                        required>
                                    </v-select> -->
                                    <v-text-field
                                        v-model.trim="gifter.title"
                                        label="Title">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model.trim="gifter.firstName"
                                        label="First Name"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
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
                            <v-row v-if="isGift">
                                <v-col cols="12">
                                    <v-checkbox v-model="primary.optOut" color="#fc4f59" class="ma-0" label="We may use your email from time-to-time for marketing purposes. If you would not like to receive these please check this box to opt out." />
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
                                    <!-- <v-select
                                        v-model="primary.selectTitle"
                                        :items="titles"
                                        label="Title"
                                        required>
                                    </v-select> -->
                                    <v-text-field
                                        v-model.trim="primary.title"
                                        label="Title">
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field
                                        v-model.trim="primary.firstName"
                                        label="First Name"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="4">
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
                                <v-col cols="12" md="3">
                                    <v-text-field
                                        v-model.trim="primary.homePhone"
                                        label="Home Phone"
                                        type="number"
                                        required>
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" md="3">
                                    <v-text-field
                                        v-model.trim="primary.mobilePhone"
                                        label="Mobile Phone"
                                        type="number"
                                        required>
                                    </v-text-field>
                                </v-col>
                            </v-row>
                            <v-row v-if="!isGift">
                                <v-col cols="12">
                                    <v-text-field type="password" v-model.trim="primary.password" label="Password"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row v-if="!isGift">
                                <v-col cols="12">
                                    <v-checkbox v-model="primary.optOut" color="#fc4f59" class="ma-0" label="We may use your email from time-to-time for marketing purposes. If you would not like to receive these please check this box to opt out." />
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
                            <div v-if="this.additionalMembers > 0">
                                <h5 class="my-3 default-font font-weight-medium"><v-icon large left style="color: #fc4f59;">mdi-account-multiple-plus</v-icon>Additional Member Details</h5>
                                <p>You have selected <span class="font-weight-bold">{{this.additionalMembers}}</span> additional members. If you wish one of your members to remain as an unnamed guest, check the box.</p>
                                <v-row align="center" class="mb-2">
                                    <v-col cols="12" md="1" class="py-0 text-center">
                                        <v-icon large color="#fc4f59">mdi-account</v-icon>
                                        <v-subheader class="pa-0 font-weight-bold text-center justify-center">Primary Member</v-subheader>
                                    </v-col>
                                    <v-col cols="12" md="11" class="py-0">
                                        <v-container>
                                            <v-row align="center">
                                                <v-col cols="12" md="2" class="py-0">
                                                    <v-text-field
                                                        v-model.trim="primary.title"
                                                        label="Title"
                                                        disabled>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="3" class="py-0">
                                                    <v-text-field
                                                        v-model.trim="primary.firstName"
                                                        label="First Name"
                                                        disabled
                                                        required>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="3" class="py-0">
                                                    <v-text-field
                                                        v-model.trim="primary.lastName"
                                                        label="Last Name"
                                                        disabled
                                                        required>
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-col>
                                </v-row>
                                <v-row align="center" v-for="guest in additionalMembers" :key="guest.id" class="mb-2">
                                    <v-col cols="12" md="1" class="py-0 text-center">
                                        <v-icon large color="#fc4f59">mdi-account</v-icon>
                                        <v-subheader class="pa-0 font-weight-bold text-center justify-center">Adult {{guest}}</v-subheader>
                                    </v-col>
                                    <v-col cols="12" md="11" class="py-0">
                                        <v-container>
                                            <v-row align="center">
                                                <v-col cols="12" md="3" class="py-0">
                                                    <v-checkbox
                                                        v-model="guest.unnamed"
                                                        label="Unnamed Guest"
                                                        color="#fc4f59"
                                                    >
                                                    </v-checkbox>
                                                </v-col>
                                                <v-col cols="12" md="2" class="py-0">
                                                    <v-text-field
                                                        v-model.trim="guest.title"
                                                        label="Title"
                                                        :disabled="guest.unnamed">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="3" class="py-0">
                                                    <v-text-field
                                                        v-model.trim="guest.firstName"
                                                        label="First Name"
                                                        :disabled="guest.unnamed"
                                                        required>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="3" class="py-0">
                                                    <v-text-field
                                                        v-model.trim="guest.lastName"
                                                        label="Last Name"
                                                        :disabled="guest.unnamed"
                                                        required>
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-col>
                                </v-row>
                                <v-row align="center" v-for="childGuest in selectChild" :key="childGuest.id" class="mb-2">
                                    <v-col cols="12" md="1" class="py-0 text-center">
                                        <v-icon large color="#fc4f59">mdi-account-child</v-icon>
                                        <v-subheader class="pa-0 font-weight-bold text-center justify-center">Child {{childGuest}}</v-subheader>
                                    </v-col>
                                    <v-col cols="12" md="11" class="py-0">
                                        <v-container>
                                            <v-row align="center">
                                                <v-col cols="12" md="3" class="py-0">
                                                    <v-checkbox
                                                        v-model="childGuest.unnamed"
                                                        label="Unnamed Guest"
                                                        color="#fc4f59"
                                                    >
                                                    </v-checkbox>
                                                </v-col>
                                                <v-col cols="12" md="2" class="py-0">
                                                    <v-text-field
                                                        v-model.trim="childGuest.title"
                                                        label="Title"
                                                        :disabled="childGuest.unnamed">
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="3" class="py-0">
                                                    <v-text-field
                                                        v-model.trim="childGuest.firstName"
                                                        label="First Name"
                                                        :disabled="childGuest.unnamed"
                                                        required>
                                                    </v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="3" class="py-0">
                                                    <v-text-field
                                                        v-model.trim="childGuest.lastName"
                                                        label="Last Name"
                                                        :disabled="childGuest.unnamed"
                                                        required>
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row align="center" class="pl-5">
                                                <v-col cols="12" md="2" class="py-0">
                                                    <v-subheader class="pa-0">Their DOB:</v-subheader>
                                                </v-col>
                                                <v-col cols="12" md="4" class="py-0">
                                                    <v-row>
                                                        <v-col cols="4" class="py-0">
                                                            <v-select
                                                                v-model.trim="childGuest.dobDay"
                                                                label="Day"
                                                                :disabled="childGuest.unnamed"
                                                                required>
                                                            </v-select>
                                                        </v-col>
                                                        <v-col cols="4" class="py-0">
                                                            <v-select
                                                                v-model.trim="childGuest.dobMonth"
                                                                label="Month"
                                                                :disabled="childGuest.unnamed"
                                                                required>
                                                            </v-select>
                                                        </v-col>
                                                        <v-col cols="4" class="py-0">
                                                            <v-select
                                                                v-model.trim="childGuest.dobYear"
                                                                label="Year"
                                                                :disabled="childGuest.unnamed"
                                                                required>
                                                            </v-select>
                                                        </v-col>
                                                    </v-row>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-col>
                                </v-row>
                            </div>
                        </v-container>
                        <v-btn color="grey" dark class="mr-5" large @click="previousStep()">Back</v-btn>
                        <v-btn color="success" large @click="nextStep()">Confirm Details</v-btn>
                    </v-form>
                </v-stepper-content>
                <v-stepper-content step="3">
                    <h1 class="mb-5">Confirm Details</h1>
                    <v-container class="mb-5 pa-0">
                        <v-row no-gutters align="center">
                            <v-col cols="12" md="3">
                                <v-subheader>Membership Package</v-subheader>
                            </v-col>
                            <v-col cols="12" md="9">
                                <span class="font-weight-bold">Family Membership (2 adult, 2 children)</span>
                            </v-col>
                        </v-row>
                        <v-divider class="my-5"></v-divider>
                        <v-row v-if="isGift" no-gutters align="center">
                            <v-col cols="12" md="3">
                                <v-subheader>Gifter Contact Name</v-subheader>
                            </v-col>
                            <v-col cols="12" md="9">
                                <span class="font-weight-bold">{{gifter.firstName}} {{gifter.lastName}}</span>
                            </v-col>
                        </v-row>
                        <v-row v-if="isGift" no-gutters align="center">
                            <v-col cols="12" md="3">
                                <v-subheader>Gifter Contact Email</v-subheader>
                            </v-col>
                            <v-col cols="12" md="9">
                                <span class="font-weight-bold">{{gifter.emailAddress}}</span>
                            </v-col>
                        </v-row>
                        <v-row v-if="isGift" no-gutters align="center">
                            <v-col cols="12" md="3">
                                <v-subheader>Gifter Contact Home Phone</v-subheader>
                            </v-col>
                            <v-col cols="12" md="9">
                                <span class="font-weight-bold">{{gifter.homePhone}}</span>
                            </v-col>
                        </v-row>
                        <v-row v-if="isGift" no-gutters align="center">
                            <v-col cols="12" md="3">
                                <v-subheader>Gifter Contact Mobile Phone</v-subheader>
                            </v-col>
                            <v-col cols="12" md="9">
                                <span class="font-weight-bold">{{gifter.mobilePhone}}</span>
                            </v-col>
                        </v-row>
                        <v-divider v-if="isGift" class="my-5"></v-divider>
                        <v-row no-gutters align="top">
                            <v-col cols="12" md="3">
                                <v-subheader>Gifter Contact Address</v-subheader>
                            </v-col>
                            <v-col cols="12" md="9">
                                <div class="mb-1 d-block">{{gifter.addrLineOne}}</div>
                                <div class="mb-1 d-block">{{gifter.addrLineTwo}}</div>
                                <div class="mb-1 d-block">{{gifter.addrCity}}</div>
                                <div class="mb-1 d-block">{{gifter.addrRegion}}</div>
                                <div class="mb-1 d-block">{{gifter.addrPostcode}}</div>
                            </v-col>
                        </v-row>
                        <v-divider class="my-5"></v-divider>
                        <v-row no-gutters align="center">
                            <v-col cols="12" md="3">
                                <v-subheader>Primary Contact Name</v-subheader>
                            </v-col>
                            <v-col cols="12" md="9">
                                <span class="font-weight-bold">{{primary.firstName}} {{this.primary.lastName}}</span>
                            </v-col>
                        </v-row>
                        <v-row no-gutters align="center">
                            <v-col cols="12" md="3">
                                <v-subheader>Primary Contact Email</v-subheader>
                            </v-col>
                            <v-col cols="12" md="9">
                                <span class="font-weight-bold">{{primary.emailAddress}}</span>
                            </v-col>
                        </v-row>
                        <v-row no-gutters align="center">
                            <v-col cols="12" md="3">
                                <v-subheader>Primary Contact Home Phone</v-subheader>
                            </v-col>
                            <v-col cols="12" md="9">
                                <span class="font-weight-bold">{{primary.homePhone}}</span>
                            </v-col>
                        </v-row>
                        <v-row no-gutters align="center">
                            <v-col cols="12" md="3">
                                <v-subheader>Primary Contact Mobile Phone</v-subheader>
                            </v-col>
                            <v-col cols="12" md="9">
                                <span class="font-weight-bold">{{primary.mobilePhone}}</span>
                            </v-col>
                        </v-row>
                        <v-divider class="my-5"></v-divider>
                        <v-row no-gutters align="top">
                            <v-col cols="12" md="3">
                                <v-subheader>Primary Contact Address</v-subheader>
                            </v-col>
                            <v-col cols="12" md="9">
                                <div class="mb-1 d-block">{{primary.addrLineOne}}</div>
                                <div class="mb-1 d-block">{{primary.addrLineTwo}}</div>
                                <div class="mb-1 d-block">{{primary.addrCity}}</div>
                                <div class="mb-1 d-block">{{primary.addrRegion}}</div>
                                <div class="mb-1 d-block">{{primary.addrPostcode}}</div>
                            </v-col>
                        </v-row>
                        <v-divider v-if="additionalMembers > 0" class="my-5"></v-divider>
                        <v-row no-gutters align="center" v-for="guest in additionalMembers" :key="guest.id">
                            <v-col cols="12" md="3"><v-subheader>Adult {{guest}}</v-subheader></v-col>
                            <v-col cols="12" md="9">
                                <span class="font-weight-bold">{{guest.firstName}} {{guest.lastName}}</span>
                            </v-col>
                        </v-row>
                        <v-row no-gutters align="center" v-for="childGuest in selectChild" :key="childGuest.id">
                            <v-col cols="12" md="3"><v-subheader>Child {{childGuest}}</v-subheader></v-col>
                            <v-col cols="12" md="9">
                                <span class="font-weight-bold">{{childGuest.firstName}} {{childGuest.lastName}}</span>
                            </v-col>
                        </v-row>
                        <v-divider class="my-5"></v-divider>
                        <p>If these are correct, click confirm and continue on to payment.</p>
                    </v-container>
                    <v-form @submit.prevent class="mb-3">
                        <v-btn color="grey" dark class="mr-5" large @click="previousStep()">Back</v-btn>
                        <v-btn color="success" large @click="nextStep()">Confirm Member Details</v-btn>
                    </v-form>
                </v-stepper-content>
                <v-stepper-content step="4">
                    <h1>Payment</h1>
                    <p class="my-5">There are two ways to pay for your Castle Howard Membership. The preferred option is Direct Debit. This comes with a <b>10%</b> discount to your Membership cost. We can also accept PayPal payemnts.</p>
                    <v-container fluid class="pa-0 my-5">
                        <v-row>
                            <v-col cols="12" :md="showDD ? '8' : '6'" class="transition">
                                <v-banner color="success" dark class="rounded-t"><v-icon left class="pl-0 ml-0 mr-3">mdi-star</v-icon><small>Preferred Payment Method</small></v-banner>
                                <v-card color="grey lighten-3" class="rounded-t-0 pb-1">
                                    <v-card-title>Direct Debit</v-card-title>
                                    <v-card-subtitle>Choose to pay by Direct Debit and we'll give you 10% off your Membership.</v-card-subtitle>
                                    <v-spacer></v-spacer>
                                    <v-card-text>
                                        <v-container class="pa-0">
                                            <v-row align="top" no-gutters justify="flex-start">
                                                    <v-img
                                                        max-width="100"
                                                        src="@/assets/directdebit.png"
                                                        >
                                                    </v-img>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                    <v-card v-if="showDD" class="pa-5 ma-5">
                                        <v-form @submit.prevent>
                                            <v-checkbox
                                                dense
                                                v-model="payment.billingDifferent"
                                                label="Billing Address different from Member Address?"
                                                ></v-checkbox>
                                            <v-text-field
                                                outlined
                                                dense
                                                v-model.trim="payment.nameAcc"
                                                label="Name(s) of Account Holder(s)"
                                                required>
                                            </v-text-field>
                                            <v-text-field
                                                outlined
                                                dense
                                                v-model.trim="payment.accNumber"
                                                label="Bank/Building Society Account Number"
                                                required>
                                            </v-text-field>
                                            <v-text-field
                                                outlined
                                                dense
                                                v-model.trim="payment.sortCode"
                                                label="Branch Sort Code"
                                                required>
                                            </v-text-field>
                                            <v-checkbox
                                                v-model="payment.authorised"
                                                label="Please tick to confirm you are the authorised signatory on the above account"></v-checkbox>
                                            <v-btn color="success" :disabled="!this.payment.authorised" @click="confirmPaymentDetails()">Confirm</v-btn>
                                        </v-form>
                                    </v-card>
                                    <v-chip filter label v-if="showDDSuccess" color="grey lighten-2" class="pa-3 mx-4 mt-0 mb-3">
                                        <v-icon class="mr-2">mdi-check</v-icon> Direct Debit Details Saved
                                        <v-btn class="ml-2" x-small @click="editPaymentDetails()">edit details</v-btn>
                                    </v-chip>
                                </v-card>
                            </v-col>
                            <v-col cols="12" :md="showDD ? '4' : '6'">
                                <v-banner color="grey lighten-3" class="rounded-t"><v-icon left class="pl-0 ml-0 mr-3">mdi-credit-card-outline</v-icon><small>Alternative Payment Method</small></v-banner>
                                <v-card color="grey lighten-4 mb-5" class="rounded-t-0">
                                    <v-card-title>Pay by Card/Paypal</v-card-title>
                                    <v-card-subtitle>You can choose to pay via Credit/Debit card or via Paypal. </v-card-subtitle>
                                    <v-spacer></v-spacer>
                                    <v-card-text>
                                        <v-btn color="grey lighten-2">Choose this<v-icon right>mdi-chevron-right</v-icon></v-btn>
                                    </v-card-text>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-form @submit.prevent class="my-5">
                        <v-btn color="grey" dark class="mr-5" large @click="previousStep()">Back</v-btn>
                        <v-btn color="success" large @click="nextStep()">Confirm Payment</v-btn>
                    </v-form>
                </v-stepper-content>
                <v-stepper-content step="5">
                    <h1>Thank You!</h1>
                    <p class="my-5">Your payment is now being processed. You will recieve an email confirmation to confirm your purchase.</p>
                    <v-divider></v-divider>
                    <p class="my-5">Thank you for becoming a part of the Castle Howard membership. To take full advantage of your new membership, enter a password below to set up your personal account. This account can be used for booking tickets, finding exclusive membership deals and much more.</p>
                    <v-card max-width="600" color="grey lighten-4" class="my-10 mx-auto pa-5">
                        <v-card-title>
                            Create Account
                        </v-card-title>
                        <v-card-subtitle>
                            Enter a secure password
                        </v-card-subtitle>
                        <v-card-text>
                            <v-form @submit.prevent class="my-0">
                                <v-text-field
                                    class="mt-0 pt-0"
                                    v-model.trim="primary.emailAddress"
                                    label="Email Address"
                                    readonly>
                                </v-text-field>
                                <v-text-field
                                    v-model="primary.password"
                                    type="password"
                                    label="Password"
                                    required>
                                </v-text-field>
                                <v-btn color="bg-chRed" dark large class="my-5">
                                    Join
                                </v-btn>
                                <v-btn color="grey lighten-2" large class="my-5 ml-2">
                                    Cancel
                                </v-btn>
                            </v-form>
                        </v-card-text>
                    </v-card>
                    <v-btn large class="my-5" to="/"><v-icon class="mr-3">mdi-home</v-icon> Back to Dashboard</v-btn>
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
            selectChild: 0,
            adults: [ 0, 1, 2, 3, 4, 5 ],
            child: [ 0, 1, 2, 3, 4, 5 ],
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
            totalDDCost: null,
            loader: null,
            loading: false,
            buttonText: 'Calculate Price',
            progress: 2,
            additionalMembers: 0,
            isGift: false,
            showDD: true,
            showDDSuccess: false,
            primary: {
                title: '',
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
                password: '',
                optOut: false,
            },
            gifter: {
                title: '',
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
            guest: {
                unnamed: false
            },
            payment: {
                billingDifferent: false,
                nameAcc: '',
                accNumber: '',
                sortCode: '',
                authorised: false,
            },
            paymentDetailsConfirmed: false,

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
        confirmPaymentDetails() {
            this.paymentDetailsConfirmed = true
            this.showDD = false
            this.showDDSuccess = true
        },
        editPaymentDetails() {
            this.paymentDetailsConfirmed = false,
            this.showDD = true,
            this.showDDSuccess = false,
            this.payment.authorised = false
        },
        toggleDD() {
            this.showDD = !this.showDD
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
            this.childsTotal = this.sumPrice(this.childPrice, this.selectChild)
            this.totalCost = this.adultsTotal + this.childsTotal;
            this.totalDDCost = (this.totalCost / 10) * 9 
            this.additionalMembers = this.selectAdults - 1
        },
    }    
}
</script>