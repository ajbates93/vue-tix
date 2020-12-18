<template>
    <transition name="fade">
        <div id="confirm">
            <section class="box box-full">
                <h1>Gold Membership</h1>
                <p>Family Membership Options:</p>
                <form @submit.prevent>
                    <div class="form-row">
                        <select v-model="usersForm.familyMembership">
                            <option disabled value="">[Select An Option]</option>
                            <option value="130">Gold Dual Adult (2 Adults)</option>
                            <option value="160">Gold Friend Family (1 Adult + 3 Children)</option>
                            <option value="190">Gold Friend Family (2 Adult + 3 Children)</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <p>Individual Memberships:</p>
                    </div>
                    <span>
                    <label for="adultsNo">Adults</label>
                    <select v-model="usersForm.adultsNo">
                        <option value="0">0</option>
                        <option value="85">1</option>
                        <option value="170">2</option>
                        <option value="255">3</option>
                        <option value="340">4</option>
                        <option value="425">5</option>
                    </select>
                    </span>
                    <span>
                    <label for="adultsGuestsNo">Adult Guests</label>
                    <select v-model="usersForm.adultsGuestNo">
                        <option value="0">0</option>
                        <option value="95">1</option>
                        <option value="190">2</option>
                        <option value="285">3</option>
                        <option value="380">4</option>
                        <option value="475">5</option>
                    </select>
                    </span>
                    <span>
                    <label for="childNo">Child (4+)</label>
                    <select v-model="usersForm.childNo">
                        <option value="0">0</option>
                        <option value="45">1</option>
                        <option value="90">2</option>
                        <option value="135">3</option>
                        <option value="180">4</option>
                        <option value="225">5</option>
                    </select>
                    </span>
                    <span>
                    <label for="childGuestNo">Child Guests (4+)</label>
                    <select v-model="usersForm.childGuestNo">
                        <option value="0">0</option>
                        <option value="20">1</option>
                        <option value="40">2</option>
                        <option value="60">3</option>
                        <option value="80">4</option>
                        <option value="100">5</option>
                    </select>
                    </span>
                </form>
                
            </section>
            <section class="box box-full">
                <h1>Your basket</h1>
                <p>You have selected:</p>
                <ul>
                    <li>Family Membership: £{{ formatPrice(usersForm.familyMembership) }}</li>
                    <li>Adults: £{{formatPrice(usersForm.adultsNo)}}</li>
                    <li>Adult Guests: £{{formatPrice(usersForm.adultsGuestNo)}}</li>
                    <li>Child: £{{formatPrice(usersForm.childNo)}}</li>
                    <li>Child Guests: £{{formatPrice(usersForm.childGuestNo)}}</li>
                </ul>
                <p>Total: <span></span></p>
            </section>
            <div class="box box-full button-container">
                <div class="button" @click="goBack()">Go Back</div>
                <div class="button button-success" @click="confirm()">Confirm Selection</div>
            </div>
        </div>
    </transition>
</template>

<script>
import router from "../router"

export default {
    data() {
        return {
            usersForm: {
                familyMembership: '',
                adultsNo: 0,
                adultsGuestNo: 0,
                childNo: 0,
                childGuestNo: 0
            },
            usersFormTotal: 0,
        }
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
        formatPrice(value) {
            this.getTotal()
            let val = (value/1).toFixed(2)
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        getTotal() {
            let total = this.usersForm.familyMembership 
                + this.usersForm.adultsNo 
                + this.usersForm.adultsGuestNo 
                + this.usersForm.childNo 
                + this.usersForm.childGuestNo 
            this.usersFormTotal = total
        }
    }    
}
</script>