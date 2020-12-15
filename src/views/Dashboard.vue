<template>
  <div id="dashboard">
    <section class="box box-full">
      <h1>Purchase Membership</h1>
      <p>Choose the tier of our membership scheme which most suits you; from enjoying great days out with your family to joining us at our Summer Garden Party and taking part in our programme of Friends tours and talks. </p>
    </section>
    <section class="box button-box box-full">
      <div class="button-box-left">
        <h3>Gold Friend Membership</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porttitor, risus vitae dapibus blandit, velit est maximus urna, nec maximus nibh nisi eget eros. Proin euismod urna at fringilla pulvinar. Etiam eros nulla, volutpat nec eros et, ornare posuere est. Etiam vel sollicitudin justo, at porta augue.</p>
        <div class="number-pickers">
          <form @submit.prevent>
            <i class="fas fa-user"></i>
            <span>
              <label for="adultsNo">Adults</label>
              <select v-model="usersForm.adultsNo">
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </span>
            <span>
              <label for="adultsGuestsNo">Adult Guests</label>
              <select v-model="usersForm.adultsGuestNo">
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </span>
            <span>
              <label for="childNo">Child (4+)</label>
              <select v-model="usersForm.childNo">
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </span>
            <span>
              <label for="childGuestNo">Child Guests (4+)</label>
              <select v-model="usersForm.childGuestNo">
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </span>
          </form>
          <!-- <p>AdultsNo: {{usersForm.adultsNo}}</p>
          <p>AdultsGuestNo: {{usersForm.adultsGuestNo}}</p>
          <p>ChildNo: {{usersForm.childNo}}</p>
          <p>ChildGuestNo: {{usersForm.childGuestNo}}</p> -->
        </div>
      </div>
      <div class="button-box-right">
        <!-- <div class="button"><a @click="confirm()">Confirm Selection</a></div> -->
        <div @click="confirm()" class="button">Confirm Selection</div>
      </div>
    </section>
    <section class="box button-box box-full">
      <div class="button-box-left">
        <h3>Silver Friend Membership</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus porttitor, risus vitae dapibus blandit, velit est maximus urna, nec maximus nibh nisi eget eros. Proin euismod urna at fringilla pulvinar. Etiam eros nulla, volutpat nec eros et, ornare posuere est. Etiam vel sollicitudin justo, at porta augue.</p>
        <div class="number-pickers">
          <form @submit.prevent>
            <i class="fas fa-user"></i>
            <span>
              <label for="adultsNo">Adults</label>
              <select v-model="usersForm.adultsNo">
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </span>
            <span>
              <label for="adultsGuestsNo">Adult Guests</label>
              <select v-model="usersForm.adultsGuestNo">
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </span>
            <span>
              <label for="childNo">Child (4+)</label>
              <select v-model="usersForm.childNo">
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </span>
            <span>
              <label for="childGuestNo">Child Guests (4+)</label>
              <select v-model="usersForm.childGuestNo">
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </span>
          </form>
          <!-- <p>AdultsNo: {{usersForm.adultsNo}}</p>
          <p>AdultsGuestNo: {{usersForm.adultsGuestNo}}</p>
          <p>ChildNo: {{usersForm.childNo}}</p>
          <p>ChildGuestNo: {{usersForm.childGuestNo}}</p> -->
        </div>
      </div>
      <div class="button-box-right">
        <!-- <div class="button"><a @click="confirm()">Confirm Selection</a></div> -->
        <div @click="confirm()" class="button">Confirm Selection</div>
      </div>
    </section>
    <section class="box button-box box-full">
      <div class="button-box-left">
        <h3>Ryedale Resident Membership</h3>
        <p>There is a special Friends offer for our closest neighbours, Ryedale District Residents. Enjoy three free children's passes for every named adult membership purchased.</p>
        <div class="number-pickers">
          <form @submit.prevent>
            <i class="fas fa-user"></i>
            <span>
              <label for="adultsNo">Adults</label>
              <select v-model="usersForm.adultsNo">
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </span>
            <span>
              <label for="adultsGuestsNo">Adult Guests</label>
              <select v-model="usersForm.adultsGuestNo">
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </span>
            <span>
              <label for="childNo">Child (4+)</label>
              <select v-model="usersForm.childNo">
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </span>
            <span>
              <label for="childGuestNo">Child Guests (4+)</label>
              <select v-model="usersForm.childGuestNo">
                <option>0</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </span>
          </form>
          <!-- <p>AdultsNo: {{usersForm.adultsNo}}</p>
          <p>AdultsGuestNo: {{usersForm.adultsGuestNo}}</p>
          <p>ChildNo: {{usersForm.childNo}}</p>
          <p>ChildGuestNo: {{usersForm.childGuestNo}}</p> -->
        </div>
      </div>
      <div class="button-box-right">
        <!-- <div class="button"><a @click="confirm()">Confirm Selection</a></div> -->
        <div @click="confirm()" class="button">Confirm Selection</div>
      </div>
    </section>
  </div>
</template>

<script>

export default {
  data() {
    return {
      usersForm: {
        adultsNo: 0,
        adultsGuestNo: 0,
        childNo: 0,
        childGuestNo: 0
      }
    }
  },
  methods: {
    confirm() {
      this.$store.dispatch("confirm", {
        adultsNo: this.usersForm.adultsNo,
        adultsGuestNo: this.usersForm.adultsGuestNo,
        childNo: this.usersForm.childNo,
        childGuestNo: this.usersForm.childGuestNo
      })
    }
  }
  
}
</script>
