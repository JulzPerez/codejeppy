const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      
    }
  },

  lintOnSave:false,
  
  transpileDependencies: [
    'vuetify'
  ]
})
