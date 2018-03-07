<template>
  <div class="row">
    <!-- academic year -->
    <div class="form-group col-sm-3">        
        <label class="req">Academic Year: <span class="text-danger">*</span></label>
        <vaselect id="academic_year" v-model="academic_year" :url="getAcademicYearsUrl" :placeholder="academic_name" >
          <option disabled value="0">Select</option>
        </vaselect>        
    </div>
    <!-- reg number -->
    <div class="form-group col-sm-3">
        <label class="req">Admission No: <span class="text-danger">*</span></label>
        <input :class="{'input': true, 'border-warning': errors.has('adm_no') }"  class="form-control" v-model="adm_no" name="adm_no" id="adm_no"
                maxlength="45" type="text" placeholder="Admission No."/> 
        <span v-show="errors.has('adm_no')" class="help text-warning">{{ errors.first('adm_no') }}</span>
    </div>

    <!-- class -->
    <div class="form-group col-sm-3">
        <label class="req">Class: <span class="text-danger">*</span></label>        
        <!--  -->
        <vaselect id="course" v-model="course" :url="getCourseUrl" >
          <option disabled value="0">Select</option>
        </vaselect> 
    </div>
    <!-- class -->

    <!-- stream -->
    <div class="form-group col-sm-3">
        <label class="req">Stream: <span class="text-danger">*</span></label>        
        <vaselect id="stream" v-model="stream" :url="getStreamUrl" >
          <option disabled value="0">Select</option>
        </vaselect> 
    </div>
    <!-- ./stream -->
    <div class="form-group col-sm-12 pull-right">
      <button class="btn btn-primary btn-xs pull-right text-small" @click="createDetials">
        <i class="icon-floppy-disk position-left"></i>
        Save
        </button>
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
  </div>

</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VeeValidate from 'vee-validate';
import select2 from 'select2'
import Select from './SelectAjax'

Vue.use(Vuetify)
Vue.use(VeeValidate);
Vue.use(VueAxios, axios)
Vue.component('vaselect', Select)

export default {
  $_veeValidate: {
      validator: 'new'
  }, 
  data: function() {
    return {   
      adm_no:'',
      academic_year:'',
      academic_name:'Select Academic year',      
      course:'',
      stream:'',
      joining_date: "",
      getAcademicYearsUrl:getAcademicYearsUrl,
      getCourseUrl:getCourseUrl,
      getStreamUrl:getStreamUrl,
      getOfficialDetailsUrl:getOfficialDetailsUrl,
      updateOfficialDetailsUrl:updateOfficialDetailsUrl,
      alert_text:'',
      snackbar:false,
      menu: false,
      modal: false,
      a1: null,
      y: 'bottom',
      x: null,
      mode: '',
      timeout: 6000,
      alert_text: 'Hello, I\'m a snackbar',
      leave_date:"",
      dictionary: {
        custom: {
          joining_date: {
            required:() => 'Joining name required'
          },
          adm_no: {
            required:() => 'Admission Number required'
          }
        }
      }
    }
  },
  methods: { 
    getDetails(){   
      var self = this;        
      this.axios.get(self.getOfficialDetailsUrl)
          .then(function (response) {
              if(response.data.results.length != 0){
                response = response.data.results[0];              
                self.adm_no = response.adm_no;
                self.academic_year = response.academic_year;
                self.stream = response.stream;
                self.course = response.course;
                self.updateOfficialDetailsUrl = response.update_url;
                self.academic_name = response.academic_name;

                // trigger select change
                $("#academic_year").val(self.academic_year).trigger('change');                
                $("#stream").val(self.stream).trigger('change');
                $("#course").val(self.course).trigger('change');
                console.log(response);
              }
              
            })
          .catch(function (error) {
              console.log(error);
          });      
    },
    createDetials(){
      var self = this;
      var formData = new FormData();
      if(self.updateOfficialDetailsUrl){
        // update
        formData.append('student', parseInt(pk)); 
        formData.append('adm_no', this.adm_no); 
        formData.append('academic_year', this.academic_year);
        formData.append('stream', this.stream); 
        formData.append('course', this.course); 

        this.axios.put(self.updateOfficialDetailsUrl, formData)
            .then(function(response) {
                response = response.data;
                // pk = response.id;
                // updateOfficialDetailsUrl = response.update_url;
                self.alert_text = 'official details created successfuly';
                self.snackbar = true;
            })
            .catch(function(err) {
                console.log(err);
            });  
      }else{
        // create
        formData.append('student', parseInt(pk)); 
        formData.append('adm_no', this.adm_no); 
        formData.append('academic_year', this.academic_year);
        formData.append('stream', this.stream); 
        formData.append('course', this.course); 

        this.axios.post(createOfficialDetailsUrl, formData)
            .then(function(response) {
                response = response.data;
                // pk = response.id;
                self.updateOfficialDetailsUrl = response.update_url;
                self.alert_text = 'official details created successfuly';
                self.snackbar = true;
            })
            .catch(function(err) {
                console.log(err);
            }); 

      }
                
    }
  },
  mounted(){ 
    this.axios.defaults.xsrfHeaderName = "X-CSRFToken"
    this.axios.defaults.xsrfCookieName = 'csrftoken'         

    // if pk is set populate official details
    if(getOfficialDetailsUrl){
      this.getDetails();
    }
    
  }
}
</script>
