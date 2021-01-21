<template>
        <v-col :cols="this.colsTotal" :md="this.mdTotal">
            <v-select outlined v-model="guest.dobDay" label="Day" :items="days" required></v-select>
            <v-select outlined v-model="guest.dobMonth" label="Month" :items="months" required></v-select>
            <v-select outlined v-model="guest.dobDay" label="Year" :items="years" required></v-select>    
        </v-col>
</template>

<script>
export default {
    props: ['cols', 'md'],
    data: () => {
        return {
            colsTotal: this.cols,
            mdTotal: this.md,
            guest: {
                dobDay: '',
                dobMonth: '',
                dobYear: '',
            },
            days: ['1', '2', '3', '4', '5'],
            months: ['January', 'February'],
            years: ['2021', '2020', '2019']
        }
    },
    methods: {

    }
}
</script>