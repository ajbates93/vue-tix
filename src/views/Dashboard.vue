<template>
  <v-container id="dashboard">
    <v-card elevation="3" class="mx-auto my-6 pa-6">
      <h1>Purchase Membership</h1>
      <p>Choose the tier of our membership scheme which most suits you; from enjoying great days out with your family to joining us at our Summer Garden Party and taking part in our programme of Friends tours and talks. </p>
    </v-card>
    
    <v-card elevation="3" class="mx-auto my-6 pa-6">
      <v-container class="mx-auto pa-0">
        <v-row no-gutters>
          <v-col cols="12" sm="6" md="8">
            <h3>Silver Friend Membership</h3>
            <v-btn color="bg-chSilver" dark large @click="toggleSilverBenefits()" class="my-2"><span style="margin-right: 3px" v-if="!this.showSilverBenefits">Show</span><span style="margin-right: 3px" v-else>Hide </span> Benefits</v-btn>
            <transition name="fade">
              <div class="my-2" v-if="this.showSilverBenefits">
                <ul class="membership-benefits">
                  <li>Free access to the house, parkland, gardens and adventure playground </li>
                  <li>Free access to daytime events included in standard admission</li>
                  <li>Loyalty scheme - equivalent to percentage of purchases in the cafés and shops (5% for silver Friends)</li>
                  <li>Invitations to Friends previews</li>
                  <li>Invitation to the Friends Summer Garden Party hosted by the Hon. Nicholas and Mrs Howard</li>
                  <li>Fast track access on Bank Holidays and selected event days</li>
                  <li>A programme of exclusive Friends events, including tours and lectures</li>
                  <li>Exclusive Friends promotions and special offers</li>
                  <li>Friends newsletter and email updates</li>
                </ul>
              </div>
            </transition>
          </v-col>
          <v-col cols="6" md="4" class="align-self-end d-flex justify-end">
            <v-btn color="bg-chRed" to="/confirm" dark large class="my-2">
              View Pricing
              <v-icon right>mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card elevation="3" class="mx-auto my-6 pa-6">
      <v-container class="mx-auto pa-0">
        <v-row no-gutters>
          <v-col cols="12" sm="6" md="8">
            <h3>Gold Friend Membership</h3>
            <v-btn @click="toggleGoldBenefits()" dark large color="bg-chGold" class="my-2"><span style="margin-right: 3px" v-if="!this.showGoldBenefits">Show</span><span style="margin-right: 3px" v-else>Hide</span> Benefits</v-btn>
            <transition name="fade">
              <div class="my-2" v-if="this.showGoldBenefits">
                <p>With our Gold Friend Membership, you get access to the full set of benefits that the Silver Membership offers, as well as: </p>
                <ul class="membership-benefits">
                  <li>Priority booking for selected events</li>
                  <li>Two free visits to the Yorkshire Arboretum on selected dates</li>
                  <li>Two free boat trips on the Great Lake</li>
                  <li>Discount on selected ticketed events organised by third parties</li>
                  <li>Loyalty scheme - equivalent to percentage of purchases in the&nbsp;cafés and shops (10% for Gold Friends)</li>
                  <li>Free ticket to the Friends Summer Garden Party hosted by the Hon. Nicholas and Mrs Howard</li>
                </ul>
              </div>
            </transition>
          </v-col>
          <v-col cols="6" md="4" class="align-self-end d-flex justify-end">
            <v-btn color="bg-chRed" to="/gold" dark large class="my-2">
              View Pricing
              <v-icon right>mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-card elevation="3" class="mx-auto my-6 pa-6">
      <v-container class="mx-auto pa-0">
        <v-row no-gutters>
          <v-col cols="12" sm="6" md="8">
            <h3>Ryedale Resident Membership</h3>
            <v-btn @click="toggleRyedaleBenefits()" dark large color="bg-chRed" class="my-2"><span style="margin-right: 3px" v-if="!this.showRyedaleBenefits">Show</span><span style="margin-right: 3px" v-else>Hide</span> Benefits</v-btn>
            <transition name="fade">
              <p class="my-2" v-if="this.showRyedaleBenefits">There is a special Friends offer for our closest neighbours, Ryedale District Residents. Enjoy three free children's passes for every named adult membership purchased.</p>
            </transition>
          </v-col>
          <v-col cols="6" md="4" class="align-self-end d-flex justify-end">
            <v-btn color="bg-chRed" to="/gold" dark large class="my-2">
              View Pricing
              <v-icon right>mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>

export default {
  data() { 
    return {
      showSilverBenefits: false,
      showGoldBenefits: false,
      showRyedaleBenefits: false,
    }
  },
  methods: {
    toggleSilverBenefits() {
      this.showSilverBenefits = !this.showSilverBenefits
    },
    toggleGoldBenefits() {
      this.showGoldBenefits = !this.showGoldBenefits
    },
    toggleRyedaleBenefits() {
      this.showRyedaleBenefits = !this.showRyedaleBenefits
    }
  }
}
</script>
