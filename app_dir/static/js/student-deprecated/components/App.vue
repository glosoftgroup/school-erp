<template>
  <form-wizard @on-complete="onComplete" 
      title="Student Admission Form"
      subtitle="Please fill all required fields">
     
       <!-- Personal details -->
     <tab-content title="Personal details"
                :before-change="validateAsync"
                  icon="icon-user"                  
                  >
       <div class="row">
          <!-- image -->
          <div class="col-md-3">
            <div class="form-group">     
                <div class="fileinput fileinput-new" data-provides="fileinput">
                  <div class="fileinput-new thumbnail text-center" >
                    <h6 class="text-center">Student Photo</h6>                   
                    <span v-if="imageData.length > 0">
                    <img data-src="holder.js/100%x100%" alt="..." :src="imageData">
                    </span>
                    <span v-else>
                    <img data-src="holder.js/100%x100%" alt="..." :src="default_imageData">
                    </span>
                  </div>
                 <div style="text-align: center;">
                    <span class="btn btn-warning btn-file">
                      <span class="fileinput-new"></span>
                      <span class="fileinput-exists">Upload</span>
                      <input type="file" @change="previewImage" name="image" id="image">
                    </span>
                    <a  v-if="imageData.length > 0" href="javascript:;" class="btn btn-default fileinput-exists" data-dismiss="fileinput" @click="removePreviewImage">Remove</a>
                  </div>
                </div>
              </div>
          </div>
          <!-- ./image -->
          <div class="col-md-9">
            <div class="row">
              <!-- first name -->
              <div class="form-group col-sm-4">
                  <label class="req">First Name:<span class="text-danger">*</span></label>
                  <input  v-validate="'required'" :class="{'input': true, 'border-warning': errors.has('first_name') }"  class="form-control" v-model="first_name" name="first_name" id="first_name"
                          maxlength="45" type="text" placeholder="First name"/> 
                  <span v-show="errors.has('first_name')" class="help text-warning">{{ errors.first('first_name') }}</span>
                  
              </div>
              <!-- middle name -->
              <div class="form-group col-sm-4">
                  <label>Middle Name: <span class="text-danger">*</span> </label>
                  <input v-validate="'required'" :class="{'input': true, 'border-warning': errors.has('middle_name') }" class="form-control" v-model="middle_name" name="middle_name"
                          id="middle_name" maxlength="45" type="text" placeholder="Middle name">
                  <span v-show="errors.has('middle_name')" class="help text-warning">{{ errors.first('middle_name') }}</span>
              </div>
              <!-- last name -->
              <div class="form-group col-sm-4">
                  <label>Last Name: <span class="text-danger">*</span></label>
                  <input v-validate="'required'" :class="{'input': true, 'border-warning': errors.has('last_name') }" class="form-control" v-model="last_name" name="last_name" id="last_name"
                          maxlength="45" type="text" placeholder="Last name">
                  <span v-show="errors.has('last_name')" class="help text-warning">{{ errors.first('last_name') }}</span>
              </div>
            </div>
            <div class="row">
              <!-- dob -->               
                <div class="form-group col-sm-4"> 
                  
                   <v-app id="">
                    <v-dialog
                      ref="dialog"
                      persistent
                      v-model="modal"
                      lazy
                      full-width
                      width="290px"
                      :return-value.sync="dob"
                    >
                      <v-text-field
                        slot="activator"
                        label="Date of Birth"
                        v-model="dob"
                        name='dob'
                        v-validate="'required'"
                        prepend-icon="icon-calendar" 
                        
                      ></v-text-field>
                      <v-date-picker v-model="dob" scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.dialog.save(dob)">OK</v-btn>
                      </v-date-picker>
                    </v-dialog>
                    <span v-show="errors.has('dob')" class="help text-warning">{{ errors.first('dob') }}</span>                
                    </v-app>                   
                    
                </div>
                <!-- ./dob -->

                <!-- gender -->
                <div class="form-group col-sm-4">
                    <label for="Gender">Gender</label>
                    <vselect :options="genders" id="gender" v-model="gender" >
                      <option disabled value="0">Select</option>
                   </vselect> 
                                     
                </div>
                <!-- ./gender   -->
                <!-- pob -->
                <div class="form-group col-sm-4">
                    <label for="reg_input_name">Birth Place <span class="text-danger">*</span></label>
                    <input v-validate="'required'" :class="{'input': true, 'border-warning': errors.has('pob') }" maxlength="45" class="form-control" v-model="pob" name="pob"
                            id="pob" type="text"  placeholder="Birth place"/>
                    <span v-show="errors.has('pob')" class="help text-warning">{{ errors.first('pob') }}</span>                 
                </div> 
                <!-- ./pob                              -->
            </div>
            <div class="row">                
                <div class="col-sm-4">
                   <label>Nationality</label>
                    <vselect id="nationality" :options="countries" v-model="nationality" >
                    <option disabled value="0">Select</option>
                   </vselect>
                </div>                
                
                <div class="form-group col-sm-4">
                    <label for="reg_input">Religion</label>
                    <vselect id="religion" v-model="religion" :options="religions" :placeholder="religion" >
                    <option disabled value="0">Select</option>
                   </vselect>
                </div>  
                <div class="form-group col-sm-12 pull-right">
                  <button class="btn btn-primary btn-xs pull-right text-small" @click="validateAsync">
                    <i class="icon-floppy-disk position-left"></i>
                    Save
                    </button>
                </div>
                 
          </div>
          </div>
       </div> 
       <v-snackbar
        :timeout="timeout"
        :top="y === 'top'"
        :bottom="y === 'bottom'"
        :right="x === 'right'"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :vertical="mode === 'vertical'"
        v-model="snackbar"
      >
        {{ alert_text }}
        <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn>
      </v-snackbar>     
     </tab-content>
      <!-- ./personal details -->  

     <!-- official details -->
     <tab-content title="Official Details"
                  icon="icon-office">
                  <OfficialDetails/>
     
     </tab-content>
     <!-- .official details -->
     
     <!-- parentals details -->
     <tab-content title="Official Details"
                  icon="icon-user-tie">
     </tab-content>
     <!-- ./parental -->
     <tab-content title="Last step"
                  icon="ti-check">
       Yuhuuu! This seems pretty damn simple
     </tab-content>
 </form-wizard>

</template>


<script>
  import Vue from 'vue'
  import VueFormWizard from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'  
  import Vuetify from 'vuetify'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import VeeValidate from 'vee-validate';
  import select2 from 'select2'

  // local component
  import Select from './Select'
  import OfficialDetails from './OfficialDetails'
  // import VueDatePicker from './DatePicker'

  // components
  Vue.use(VueFormWizard)
  Vue.use(Vuetify)
  Vue.use(VeeValidate);
  Vue.use(VueAxios, axios)

  // local components
  Vue.component('OfficialDetails', OfficialDetails);
  Vue.component('vselect', Select)

  // global variables
  var countries = require("./countries.js");
  export default { 
    $_veeValidate: {
      validator: 'new'
    }, 
    data: function() {
      return {        
        image: "",
        imageData:'',
        menu: false,
        modal: false,
        a1: null,
        snackbar: false,
        y: 'bottom',
        x: null,
        mode: '',
        timeout: 6000,
        alert_text: 'Hello, I\'m a snackbar',
        default_imageData: "/static/images/users/default-avatar.png",
        first_name:'',
        middle_name:'',
        last_name:'',
        dob:'',
        pob:'',
        adm_no:'null',
        language: "en-US",
        result: null,
        countries:countries, 
        nationality:'KE',
        selected:{code:'KE',name:'Kenya'},
        academic_year:null,
        academic_years:[
          { "text": "2018-2019", "id": "1"},
          { "text": "2017-2018", "id": "2"},
        ],
        gender:'male',
        genders:[
          { "text": "Male", "id": "male"},
          { "text": "Female", "id": "female"},
        ],        
        religion:'christian',
        religions: [
          { "text": "Christian", "id": "christian"},
          { "text": "Muslim", "id": "muslim"},
          { "text": "Others", "id": "others"},
        ],
        attemptSubmit: false,
        dictionary: {
          custom: {
            pob: {
              required: () => 'Place of birth can not be empty',
              // custom messages
            },
            middle_name: {
              required:() => 'Middle name required'
            },
            first_name: {
              required:() => 'First name required'
            },
            last_name: {
              required:() => 'Last name required'
            },
            adm_no: {
              required:() => 'Admission Number required'
            }
          }
        }
      }       
    },   
    methods: { 
      studentDetails(){
        var self = this;
        // add or update student details if pk is provided
        this.axios.defaults.xsrfHeaderName = "X-CSRFToken"
        this.axios.defaults.xsrfCookieName = 'csrftoken'
        // const config = { headers: { 'Content-Type': 'multipart/form-data'} };
        if(pk){ 
          var formData = new FormData(); // Currently empty
          
          if(document.getElementById("image").value) {
            this.image = document.getElementById("image").files[0];
            formData.append('image', this.image);
          }          
          
          formData.append('first_name', this.first_name); 
          formData.append('middle_name', this.middle_name);
          formData.append('last_name', this.last_name); 
          formData.append('pob', this.pob); 
          formData.append('dob', this.dob);
          formData.append('adm_no', this.adm_no);
          formData.append('gender', this.gender); 
          formData.append('religion', this.religion);
          formData.append('nationality', this.nationality);          

          this.axios.put(updateUrl, formData)
          .then(function(response) {
              console.log('submited');
              self.alert_text = 'Data updated successfuly';
              self.snackbar = true;
          })
          .catch(function(err) {
              console.log(err);
          });
          // ./update
        }else{ 
          
          var formData = new FormData(); // Currently empty
          
          if(document.getElementById("image").value) {
            this.image = document.getElementById("image").files[0];
            formData.append('image', this.image);
          } 
          formData.append('first_name', this.first_name); 
          formData.append('middle_name', this.middle_name);
          formData.append('last_name', this.last_name); 
          formData.append('pob', this.pob); 
          formData.append('dob', this.dob);
          formData.append('adm_no', this.adm_no);
          formData.append('gender', this.gender); 
          formData.append('religion', this.religion);
          formData.append('nationality', this.nationality);
          formData.append('image', this.image);

          this.axios.post(createUrl, formData)
          .then(function(response) {
              response = response.data;
              pk = response.id;
              updateUrl = response.update_url;
              self.alert_text = 'student created successfuly';
              self.snackbar = true;
          })
          .catch(function(err) {
              console.log(err);
          });
          // ./create
        }       

      },    
      validateAsync: function(){              
        return new Promise((resolve, reject) => {
              
              this.$validator.validateAll().then((result) => {
              if (result) {
                  this.studentDetails()
                  resolve(true)
                  return;
                }
                reject('This is a custom validation error message. Click next again to get rid of the validation')                
              });                
           
          })
      },
      onComplete: function(){
          alert('Yay. Done!');
      },
      removePreviewImage: function(){
         this.imageData = '';
      },
      previewImage: function(event) {
        // Reference to the DOM input element
        var input = event.target;
        // Ensure that you have a file before attempting to read it
        if (input.files && input.files[0]) {
            // create a new FileReader to read this image and convert to base64 format
            var reader = new FileReader();
            // Define a callback function to run, when FileReader finishes its job
            reader.onload = (e) => {
                // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                // Read image as base64 and set to imageData
                this.imageData = e.target.result;
            }
            // Start the reader job - read file as a data url (base64 format)
            reader.readAsDataURL(input.files[0]);
        }
      },
      getDetails(){
        if(pk){
        var self = this;        
        this.axios.get(updateUrl)
            .then(function (response) {
                response = response.data;
                self.first_name = response.first_name;
                self.middle_name = response.middle_name;
                self.last_name = response.last_name;
                self.dob = response.dob;
                self.pob = response.pob;
                self.religion = response.religion;
                self.gender = response.gender;
                self.nationality = response.nationality;
                self.adm_no = response.adm_no;
                if(response.image){
                  self.imageData = response.image;
                }
                $("#nationality").val(self.nationality).trigger('change');
                
                $("#religion").val(self.religion).trigger('change');
                $("#gender").val(self.gender).trigger('change');
            })
            .catch(function (error) {
                console.log(error);
            });
        }
      }
    },
    mounted () {
      this.$validator.localize('en', this.dictionary)

      // check pk for editing
      this.getDetails()
    },
    watch: {
 
    },
  }
</script>

<style >
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.thumbnail img{
  width: 150px; height: auto;
  margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.fileinput-exists .thumbnail{
  max-width: 200px; max-height: 150px;
}
.application--wrap{
  min-height: auto;
}
.application.theme--light{
  background: #fff;
  margin-top: 16px;
}
.input-group--text-field input, .input-group--text-field textarea {
    font-size: 13px;
}
</style>