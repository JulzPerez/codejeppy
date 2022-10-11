import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    code: '',
    file: '',
    showVCodeMirror: false,
    compileError: []
  },
  mutations: {
    setNewCode(state,newCode) {
      state.code = newCode;
      //console.log('Code', newCode)
    },
    setFile(state, file){
      state.file = file;
      //console.log("File: "+file);
    },
    setEditorShow(state,value) {
      state.showVCodeMirror = value;
      //console.log("Show Editor: "+value);
    },

    SET_COMPILE_ERROR: (state,errors) => {  
      state.compileError = errors;     
    }, 
    RESET_COMPILE_ERROR: (state) => {  
      state.compileError = [];     
    },
  },
  getters: {
    code: (state) => {
        return state.code
    },

    compileError: (state) => {
        return state.compileError
    },

    file: state => state.file,
    showVCodeMirror: state => state.showVCodeMirror
  },
  actions: {
    setCompileError: (context, payload) => {
      context.commit('SET_COMPILE_ERROR', payload);    
    },
    resetCompileError: (context) => {
      context.commit('RESET_COMPILE_ERROR');    
    },
    // other actions
  }
})

export default store