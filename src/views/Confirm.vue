<template>
    <div id="confirm">
        <section class="box box-full">
            <h1>Gold Membership</h1>
            <p>You have selected:</p>
            <ul>
                <li>Adults: {{usersForm.adultsNo}}</li>
                <li>Adult Guests: {{usersForm.adultsGuestNo}}</li>
                <li>Child: {{usersForm.childNo}}</li>
                <li>Child Guests: {{usersForm.childGuestNo}}</li>
            </ul>
        </section>
        <section class="box box-full">
            <h1>What date would suit you?</h1>
            <DatePicker v-model="usersDate" :disabled-dates="this.$store.state.disabledDates"></DatePicker>
        </section>
        <div class="box box-full button-container">
            <div class="button" @click="goBack()">Go Back</div>
            <div class="button button-success" @click="confirm()">Confirm Selection</div>
        </div>
    </div>
</template>

<script>
import DatePicker from "vuejs-datepicker"
import router from "../router"

export default {
    data() {
        return {
            usersForm: {
                adultsNo: this.$store.state.usersForm.adultsNo,
                adultsGuestNo: this.$store.state.usersForm.adultsGuestNo,
                childNo: this.$store.state.usersForm.childNo,
                childGuestNo: this.$store.state.usersForm.childGuestNo
            },
            usersDate: new Date()
        }
    },
    components: {
        DatePicker
    },
    methods: {
        getDate() {
            return new Date();
        },
        goBack() {
            router.go(-1)
        }
    }    
}
</script>