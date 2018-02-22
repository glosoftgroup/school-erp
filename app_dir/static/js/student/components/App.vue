<template>
  <form-wizard @on-complete="onComplete">
     <tab-content title="Personal details"
                  icon="ti-user">
       <!-- Personal details -->
       <div class="row">
        <div class="col-md-4">
            <label for="image" class="text-center" style="padding-left:50px;">Student Photo</label>
              <div class="form-group">     
                <div class="fileinput fileinput-new" data-provides="fileinput">
                  <div class="fileinput-new thumbnail"  v-if="imageData.length > 0">
                    <img data-src="holder.js/100%x100%" alt="..." :src="imageData">
                  </div>
                  <div class="fileinput-preview fileinput-exists thumbnail"></div>
                  <div style="text-align: center;">
                    <span class="btn btn-warning btn-file">
                      <span class="fileinput-new"></span>
                      <span class="fileinput-exists">Change</span>
                      <input type="file" @change="previewImage" name="image" id="image">
                    </span>
                    <a href="#" class="btn btn-default fileinput-exists" data-dismiss="fileinput">Remove</a>
                  </div>
                </div>
              </div>
          </div>
          <div class="col-md-8">
             <div class="form-group">
              <v-select placeholder="Search" label="countryName" v-model="selected" :options="options"></v-select>
            </div>
            <div class="form-group">
               <v-datepicker></v-datepicker>
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
  import vSelect from 'vue-select'
  import Datepicker from 'vuejs-datepicker';

  // components
  Vue.use(VueFormWizard)
  Vue.component('v-select', vSelect)
  Vue.component('v-datepicker', Datepicker)
  export default {
    data: function() {
      return {
        imageData: "",
        options: [
      { countryCode: "AU", countryName: "Australia" },
      { countryCode: "CA", countryName: "Canada" },
      { countryCode: "CN", countryName: "China" },
      { countryCode: "DE", countryName: "Germany" },
      { countryCode: "JP", countryName: "Japan" },
      { countryCode: "MX", countryName: "Mexico" },
      { countryCode: "CH", countryName: "Switzerland" },
      { countryCode: "US", countryName: "United States" }
    ],
        selected:{countryCode:'KE',countryName:'Kenya'}
      }       
    },
     methods: {
      onComplete: function(){
          alert('Yay. Done!');
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
.thumbnail{
  width: 150px; height: auto;
}
.fileinput-exists .thumbnail{
  max-width: 200px; max-height: 150px;
}
</style>
