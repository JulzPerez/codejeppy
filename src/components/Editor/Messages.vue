<template>
 
      <v-data-table
      
      dense
      :headers="headers"
      :items = "compilationError"
      :hide-default-footer="true"
      class="elevation-1"
      ></v-data-table>

</template>

  <script>

import { mapGetters } from 'vuex'

export default {
  name: "Messages",
  data() {
    return {
      //compilationError: [],
      selectedRow: null,

      headers: [
       /*  {
          text: 'Filename',
          align: 'start',
          sortable: false,
          //value: 'name',
        }, */
        {
          text: 'Message Type',
          align: 'start',
          sortable: false,
          value: 'errorType',
        },
        { text: 'Error Line', 
          value: 'errorLine',
          sortable: false,
        },
        { text: 'Error Message', 
          value: 'message',
          sortable: false,
        },
      
      ],
    };
  },

  computed: {
       ...mapGetters({
                compileErrorFromStore: 'compileError',
                //compileErrorFromStore: 'compileError'
            }),
        compilationError: {
           get(){
             return this.compileErrorFromStore
           },
           /* set(newCode){
             return newCode
           }, */          
        },
  }
};
</script>

<style scoped>
</style>
