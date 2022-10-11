<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      app
      class="pt-4"
      color="grey lighten-3"
      mini-variant
    >
    </v-navigation-drawer>
     
    <v-main>
      <!--  -->
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

  export default {
    components:
    {
     
    },
     data (){
        return {
          drawer: null,
         
        }       
      },

      methods: {
      
    }

}
</script>