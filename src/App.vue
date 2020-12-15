<template>
  <div id="app">
    <Navigation/>
    <main role="main" id="main">
      <router-view/>
    </main>
    <Footer/>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue"
import Navigation from "@/components/Navigation.vue"

export default {
  components: {
    Footer,
    Navigation
  }
}
</script>
