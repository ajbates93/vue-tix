<template>
  <v-app>
    <div id="app">
      <Header />
      <Navigation/>
      <v-main>
        <v-container fluid>
          <router-view/>
        </v-container>
      </v-main>
      <Footer/>
    </div>
  </v-app>
</template>

<script>
import Footer from "@/components/Footer.vue"
import Navigation from "@/components/Navigation.vue"
import Header from "@/components/Header.vue"

export default {
  components: {
    Footer,
    Header,
    Navigation
  }
}
</script>