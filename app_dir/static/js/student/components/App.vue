<template>
  <form-wizard @on-complete="onComplete">
     <tab-content title="Personal details"
                  icon="ti-user">
       <!-- Personal details -->
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
                  <label class="req">First Name: </label>
                  <input class="form-control" v-model="first_name" name="Student" id="first_name"
                          maxlength="45" type="text" placeholder="First name"/> 
                  <span class="text-warning" v-if="!$v.first_name.required">Field is required</span>
                  <span class="text-warning" v-if="!$v.first_name.minLength">Name must have at least {{$v.first_name.$params.minLength.min}} letters.</span>              
              </div>
              <!-- middle name -->
              <div class="form-group col-sm-4">
                  <label>Middle Name: </label>
                  <input class="form-control" v-model="middle_name" name="middle name"
                          id="middle_name" maxlength="45" type="text" placeholder="Middle name">
                  <div class="school_val_error" id="middle_name_err" style="display:none"></div>
              </div>
              <!-- last name -->
              <div class="form-group col-sm-4">
                  <label>Last Name:</label>
                  <input class="form-control" v-model="last_name" name="last_name" id="last_name"
                          maxlength="45" type="text" placeholder="Last name">
                  <div class="school_val_error" id="last_name_err" style="display:none"></div>
              </div>
            </div>
            <div class="row">
              <!-- dob -->
                <div class="form-group col-sm-4">
                    <label for="reg_input_name" class="req">Date of Birth</label>                                    
                     <v-datepicker v-model="dob" placeholder="YYYY-MM-DD"></v-datepicker>
                </div>
                <!-- ./dob -->

                <!-- gender -->
                <div class="form-group col-sm-4">
                    <label for="Gender">Gender</label>
                    <vselect :options="genders" >
                      <option disabled value="0">Select</option>
                   </vselect>                  
                </div>
                <!-- ./gender   -->
                <!-- pob -->
                <div class="form-group col-sm-4">
                    <label for="reg_input_name">Birth Place</label>
                    <input maxlength="45" class="form-control" v-model="pob" name="pob"
                            id="pob" type="text"  placeholder="Birth place"/>
                    
                </div> 
                <!-- ./pob                              -->
            </div>
            <div class="row">                
                <div class="col-sm-4">
                   <label>Nationality</label>
                    <vselect :options="countries" >
                    <option disabled value="0">Select</option>
                   </vselect>
                </div>                
                
                <div class="form-group col-sm-4">
                    <label for="reg_input">Religion</label>
                    <vselect v-model="religion" :options="religions" :placeholder="religion" >
                    <option disabled value="0">Select</option>
                   </vselect>
                </div>         
                 
          </div>
          </div>
       </div>
       <!-- ./personal details -->       
       
         
       
     </tab-content>
     <tab-content title="Additional Info"
                  icon="ti-settings">
       My second tab content
     </tab-content>
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
  import Vuelidate from 'vuelidate'
  import { required, minLength } from 'vuelidate/lib/validators'

  // local component
  import Select from './Select'
  import VueDatePicker from './DatePicker'

  // components
  Vue.use(VueFormWizard)
  Vue.use(Vuelidate)
  Vue.component('vselect', Select)
  Vue.component('v-datepicker', VueDatePicker)

  // global variables
  var countries = require("./countries.js");
  export default {    
    data: function() {
      return {
        imageData: "",
        default_imageData: "/static/images/users/default-avatar.png",
        first_name:'',
        middle_name:'',
        last_name:'',
        dob:'',
        pob:'',
        language: "en-US",
        result: null,
        countries:countries,        
        selected:{code:'KE',name:'Kenya'},
        gender:'',
        genders:[
          { "text": "Male", "id": "male"},
          { "text": "Female", "id": "female"},
        ],        
        religion:'',
        religions: [
          { "text": "Christian", "id": "christian"},
          { "text": "Muslim", "id": "muslim"},
          { "text": "Others", "id": "others"},
        ],
        attemptSubmit: false,
      }       
    },
    validations: {
      first_name: {
        required,
        minLength: minLength(2)
      },
    },
    methods: {
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
       }
    },
    computed: {
      missingName: function () { return this.first_name === ''; },
      missingLastName: function () { return this.last_name === ''; },
    }
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
.vue-select1{
  width:auto;
}
</style>
