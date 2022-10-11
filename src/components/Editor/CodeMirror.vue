<template>
    <!-- Two-way Data-Binding -->
        
    <codemirror v-model="code" :options="cmOptions" @input="onCmCodeChange" @ready="onCmReady" @focus="onCmFocus" v-if="this.$store.state.showVCodeMirror"/>

</template>

<script>
import { codemirror } from 'vue-codemirror'
// import base style
import 'codemirror/lib/codemirror.css'
// import language js
import 'codemirror/mode/clike/clike.js'
// import theme style
import 'codemirror/theme/cobalt.css'
import 'codemirror/theme/blackboard.css'
import 'codemirror/theme/base16-light.css'
// import more 'codemirror/some-resource...'
import 'codemirror/addon/edit/closebrackets.js'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/matchtags'
import 'codemirror/addon/hint/show-hint.js'

//import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
    name: "VueCodeMirror",
    components: {
        codemirror
    },

   data () {
    return {
      drawer: null,
      activated: false,
      //code: '',
        cmOptions: {
          tabSize: 4,
          styleActiveLine: true,
          lineNumbers: true,
          line: true,
          //foldGutter: true,
          //styleSelectedText: true,
          mode: 'text/x-c++src',
          //keyMap: "sublime",
          matchBrackets: true,
          autoCloseBrackets: true,
          //showCursorWhenSelecting: true,
          theme: "blackboard",
          extraKeys: { "Ctrl": "autocomplete" },
          hintOptions:{
            completeSingle: false
            }
        }
    }
  },
  methods: {
    onCmReady(cm) {
      console.log('the editor is readied!', cm)
    },
    onCmFocus(cm) {
      console.log('the editor is focused!', cm)
    },
    onCmCodeChange(newCode) {
      this.code = newCode
    //state
    this.$store.commit('setNewCode', newCode)

    },

  },

  computed: {
      ...mapGetters({
                codeFromStore: 'code',
                //compileErrorFromStore: 'compileError'
            }),
        code: {
           get(){
             return this.codeFromStore
           },
           set(newCode){
             return newCode
           },          
        },

  },

  mounted() {
    console.log('the current CodeMirror instance object:', this.codemirror)
    // you can use this.codemirror to do something...
    //this.bus.$on('copyCodeFromFile', this.initializeCode)
  },
  created() {
  /*   ipcRenderer.on('fileCreated', (event,arg, path) => {
           if(arg === "success")
           {
              ipcRenderer.send('readFileContent', path);
           }              
        });
    ipcRenderer.on('getContentData', (event, path, data) => {
        this.code = data;
        console.log("This is from getCOntentData: "+path);
        this.$emit('getFilePath', path);
    }) */
  },
  
}
</script>

<style>
.CodeMirror {
  border: 1px solid #eee;
  height: 500px;
}
</style>

