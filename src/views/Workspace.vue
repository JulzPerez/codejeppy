<template>
  <div id="middle-panel-area">
    <v-container >
       <v-row style="height: 50px;">
         <v-col>
           
              <v-btn
                small
                class="ma-2"
                outlined
                color="indigo"
                @click="createNewProject"
              >
                New File
              </v-btn>
              <v-btn
                small
                class="ma-2"
                outlined
                color="indigo"
                @click="openProject"
              >
                Open File
              </v-btn>
              <v-btn
                small
                class="ma-2"
                outlined
                color="indigo"
                @click="runProject"
                
              >
                Run
              </v-btn>
              <v-btn
                small
                class="ma-2"
                outlined
                color="indigo"
                
                
              >
                Settings
              </v-btn>
          
         </v-col>
     
       </v-row>
       <v-row>
         <Split style="height: 600px;" direction="vertical">
            <SplitArea :size=70>
            <!--  <vue-tabs-chrome v-model="tab" :tabs="tabs" /> -->
              <VueCodeMirror />
            </SplitArea>
            <SplitArea :size=30>
              <h5>Build Messages</h5>
              <Messages />
            </SplitArea>
          </Split>
       </v-row>
     </v-container>
    
  </div>
</template>

<script>

import VueCodeMirror from "@/components/Editor/CodeMirror"
import Messages from "@/components/Editor/Messages"

//import {ipcRenderer} from 'electron'

const {dialog} = require('@electron/remote')
//const { c } = require('compile-run');

const fs = require('fs')
const path = require('path');

const { exec /* , execFile */ } = require("child_process");
//import VueTabsChrome from 'vue-tabs-chrome'

export default {
  name: "Workspace",
   components: {
     VueCodeMirror,
     Messages,
     //VueTabsChrome
  },
  data() {
    return {
        tab: 'google',
        tabs: [],
        exitCode: null,
        
    };
  },

  methods: {
      createNewProject() {      
        this.$store.dispatch('resetCompileError'); 
      
         let content = "#include <stdio.h>";
            content += "\n\n\n";
            content += "int main()\n";
            content += "{\n \t printf(\"Hello World!\"); \n\n\n \t return 0; \n } "; 
        
        
        dialog.showSaveDialog({}
          ).then(result => {
            let file = result.filePath;
            
            if (file === undefined) {
              console.log('The user clicked the button but didn\'t created a file');
              return ;
            }

            //create folder first where main.c resides
            if (!fs.existsSync(file)) {
              fs.mkdirSync(file, {
                recursive: true
              });
            }

            //create main.c file with content
            let sourceFile = file+'\\'+'main.c'
           
            fs.writeFile(sourceFile, content, (err) => {
              if (err) {
                console.log('an error ocurred with file creation ' + err.message);               
                return;
              }
              console.log('FILE WAS SUCCESFULLY CREATED.'); 
                return;
            })

            this.$store.commit("setFile",sourceFile);
            this.readAndLoadFileContent(sourceFile);

            //clear compile error state
            //var errors = [];
            //this.$store.dispatch('setCompileError',errors);

            //connect Database
            this.connectDatabase(file);        
          
          }).catch(err => {
            console.log(err)
          })   
          
      },

      connectDatabase(dbFile) {
        //create the sqlite3 database file for logs
            let file = dbFile+"\\LogsDB.db";
            console.log("File Path for the database: "+file);
            let logsDB = new sqlite3.Database(file, (err) => {
              if (err) {
                console.error(err.message);
                return;
              }else{
                console.log('LOGS database was successfully created!');
              }
              
            });
            console.log('LOGS database:'+logsDB);
      },

      openProject() {  
        this.$store.dispatch('resetCompileError'); 
        let dialogOptions = {
            title:"Select project folder",
            properties: ["openDirectory"]
        };
          dialog.showOpenDialog(
             dialogOptions
          ).then((folderPaths) => {
              // folderPaths is an array that contains all the selected paths
              if(folderPaths === undefined){
                  console.log("No folder selected");
                  return;
              }else{
                  console.log("Open file from folder: "+folderPaths.filePaths[0]);
                  var sourceFile = folderPaths.filePaths[0]+"\\main.c";
                  this.$store.commit("setFile",sourceFile);
                  this.readAndLoadFileContent(sourceFile);

              }
          }).catch(err=>console.log('Handle Error',err));
           
      },
      runProject() {

        this.saveChangesToFile()

        this.$store.dispatch('resetCompileError');

        var fpath = path.dirname(this.$store.getters.file);
        //var basename = path.basename(this.$store.getters.file);
        console.log("Getting path of the source code: "+fpath);
        var output_file = fpath+"\\main_output";
        console.log("Path to output: "+output_file);

        var cmd = "C:\\TDM-GCC-64\\bin\\gcc -fdiagnostics-format=json "+this.$store.getters.file +" -o "+output_file;
        console.log("Attempting to compile: "+cmd);      
       

        /* const compile = */  exec(cmd, (error, stdout, stderr) => {
          
            if (error) {
                console.log(error.status);
                this.parseErrorMessageString(error.message,1);
                console.log("HEY from error...");
                console.log(error.message);
                //return;
            }
            if (stderr) {
              console.log(stderr.status);
                this.parseErrorMessageString(stderr,2); 
                console.log(stderr);
                console.log(stdout);
                console.log("HEY from stderr");             
                //return;
            }
           //this.executeSourceFile(output_file);
           //console.log(error.code);
          }); 
         
         this.executeSourceFile(output_file);
      },

      executeSourceFile(sourceFile){
              var cmd = sourceFile+".exe";
               console.log("Attempting to execute console application: "+cmd);
              exec(cmd, (error, stdout, stderr) => {
              if (error) {
                  console.log(`error generated in electron: ${error.message}`);
                 
                  return;
              }
              if (stderr) {
                  console.log(`stderr: ${stderr}`);
                  
                  return;
              }
           
            }); 
          
         
      },

      parseErrorMessageString(errorMessage,errCode) {
        var jsonErrorMessage
        if(errCode==1){
            var stringArray = errorMessage.split('\n')[1];
            jsonErrorMessage = JSON.parse(stringArray);
        }else{
            jsonErrorMessage = JSON.parse(errorMessage);
        }        
          
          var errors = [];          
          var i;
          for(i=0; i < jsonErrorMessage.length; i++){
              errors.push({errorType:jsonErrorMessage[i].kind , message:jsonErrorMessage[i].message ,
               errorLine:jsonErrorMessage[i].locations[0].caret.line,
               errorFile: jsonErrorMessage[i].locations[0].caret.file});
          }
          
          this.$store.dispatch('setCompileError',errors);
         
      },

      saveChangesToFile(){
          let cFilename = this.$store.getters.file;
          let content = this.$store.getters.code;

          fs.writeFile(cFilename, content, (err) => {
            if (err) {
              console.log('An error ocurred while saving file: ' + err.message);           
              return;
            }
            console.log('FILE WAS SUCCESFULLY SAVED. ');        
            return;
          })
      },

      readAndLoadFileContent(file){

        //let file = this.$store.getters.file;

          fs.readFile(file, 'utf-8', (err, data) => {
            if(err){
                console.log("An error ocurred while reading the file :" + err.message);
                return;
            }        
            this.$store.commit('setNewCode', data)
          });   

          this.$store.commit('setEditorShow',true)
      }

 

  },

  created() {

           
  },

};
</script>

<style scoped>
</style>
