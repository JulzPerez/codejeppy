<template>
  <div id="middle-top-panel-area">
   
    <vue-tabs-chrome v-model="tab" :tabs="tabs" />
    <VueCodeMirror v-if="activated"/> 
  </div>
</template>

<script>

import VueCodeMirror from "@/components/Editor/CodeMirror";
import VueTabsChrome from 'vue-tabs-chrome'

export default {
  name: "MiddleTopPanel",
  components: {
   VueCodeMirror,
    VueTabsChrome
  },

  data() {
    return {
      activated: true,
      tab: 'google',
        tabs: [
          {
            label: 'google',
            key: 'google',     
            closable: false,      
            //favicon: require('./assets/google.jpg')
          },
         
          
        ]
    }
  },

  
 
};
</script>

<style scoped>
</style>
