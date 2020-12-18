<template>
    <div id="confirm">
        <section class="box box-full">
            <h1>Gold Membership</h1>
            <p>Family Membership Options:</p>
            <form @submit.prevent>
                <div class="form-row">
                    <select>
                        <option>Gold Dual Adult (2 Adults)</option>
                        <option>Gold Friend Family (1 Adult + 3 Children)</option>
                        <option>Gold Friend Family (2 Adult + 3 Children)</option>
                    </select>
                </div>
                <div class="form-row">
                    <p>Additional Memberships:</p>
                </div>
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
            
        </section>
        <section class="box box-full">
            <h1>Your selection</h1>
            <p>You have selected:</p>
            <ul>
                <li>Adults: {{usersForm.adultsNo}}</li>
                <li>Adult Guests: {{usersForm.adultsGuestNo}}</li>
                <li>Child: {{usersForm.childNo}}</li>
                <li>Child Guests: {{usersForm.childGuestNo}}</li>
            </ul>
        </section>
        <div class="box box-full button-container">
            <div class="button" @click="goBack()">Go Back</div>
            <div class="button button-success" @click="confirm()">Confirm Selection</div>
        </div>
    </div>
</template>

<script>
import router from "../router"

export default {
    data() {
        return {
            usersForm: {
                adultsNo: 0,
                adultsGuestNo: 0,
                childNo: 0,
                childGuestNo: 0
            },
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
        }
    }    
}
</script>