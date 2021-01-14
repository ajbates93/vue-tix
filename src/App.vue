<template>
  <v-app>
    <div id="app">
      <Header />
      <Navigation/>
      <v-main color="">
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

<style>

/* Fonts ----------------------- */

@font-face {
	font-family: PracticeBlack;
	src: local("PracticeBlack"), url(./fonts/custom/PracticeBlack.otf) format('opentype');
}

@font-face {
	font-family: PracticeBlack;
	font-style: italic;
	src: local("PracticeBlack"), url(./fonts/custom/PracticeBlackIta.otf) format('opentype');
}

@font-face {
	font-family: PracticeRegular;
	src: local("PracticeRegular"), url(./fonts/custom/PracticeRegular.otf) format('opentype');
}

@font-face {
	font-family: PracticeRegularIta;
	src: local("PracticeRegular"), url(./fonts/custom/PracticeRegular.otf) format('opentype');
}
</style>