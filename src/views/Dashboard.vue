<template>
  <div id="dashboard">
    <section class="box box-full">
      <h1>Purchase Membership</h1>
      <p>Choose the tier of our membership scheme which most suits you; from enjoying great days out with your family to joining us at our Summer Garden Party and taking part in our programme of Friends tours and talks. </p>
    </section>
    
    <section class="box button-box box-full">
      <div class="button-box-left">
        <h3>Silver Friend Membership</h3>
        <a @click="toggleSilverBenefits()" class="button button-silver"><span v-if="!this.showSilverBenefits">Show</span><span v-else>Hide</span> Benefits</a>
        <transition name="fade">
          <div v-if="this.showSilverBenefits">
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
      </div>
      <div class="button-box-right">
        <router-link to="/confirm" class="button">View Pricing ></router-link>
      </div>
    </section>
    <section class="box button-box box-full">
      <div class="button-box-left">
        <h3>Gold Friend Membership</h3>
        <a @click="toggleGoldBenefits()" class="button button-gold"><span v-if="!this.showGoldBenefits">Show</span><span v-else>Hide</span> Benefits</a>
        <transition name="fade">
          <div v-if="this.showGoldBenefits">
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
      </div>
      <div class="button-box-right">
        <router-link to="/gold" class="button">View Pricing ></router-link>
      </div>
    </section>
    <section class="box button-box box-full">
      <div class="button-box-left">
        <h3>Ryedale Resident Membership</h3>
        <a @click="toggleRyedaleBenefits()" class="button button-ryedale"><span v-if="!this.showRyedaleBenefits">Show</span><span v-else>Hide</span> Benefits</a>
        <transition name="fade">
          <p v-if="this.showRyedaleBenefits">There is a special Friends offer for our closest neighbours, Ryedale District Residents. Enjoy three free children's passes for every named adult membership purchased.</p>
        </transition>
      </div>
      <div class="button-box-right">
        <router-link to="/gold" class="button">View Pricing ></router-link>
      </div>
    </section>
  </div>
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
