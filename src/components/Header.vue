<template>
    <v-app-bar color="white" app>
        <a class="left-logo" href="/">
            <img class="sticky-logo" src="@/assets/small-image-logo.jpg" alt="Castle Howard, Historic House North Yorkshire" title="Castle Howard, Historic House North Yorkshire" />
        </a>
        <v-app-bar-nav-icon @click="showDrawer()"></v-app-bar-nav-icon>
        <a class="right-logo push" href="/">
            <img class="static-logo" src="@/assets/medium-text-logo.jpg" alt="Castle Howard, Historic House North Yorkshire" title="Castle Howard, Historic House North Yorkshire" />
        </a>
        <!-- <ul>
            <li><router-link class="header-link" to="/">Membership</router-link></li>
            <li><router-link class="header-link" to="/information">Information</router-link></li>
        </ul> -->
    </v-app-bar>
</template>

<script>
export default {
    data: () => ({
    }),
    methods: {
        showDrawer() {
            this.$store.dispatch('toggleDrawer', true)
        }
    }
}
</script>