<template>
  <div class="row">
    <!-- academic year -->
    <div class="form-group col-sm-3">
        <label class="req">Academic Year: <span class="text-danger">*</span></label>
        <select data-width='100%' id="academic_year" v-model="academic_year" >
        <option disabled value="0">Select</option>
        </select> 
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
        <select data-width='100%' id="course" v-model="course" >
        <option disabled value="0">Select</option>
        </select> 
    </div>
    <!-- class -->

    <!-- stream -->
    <div class="form-group col-sm-3">
        <label class="req">Stream: <span class="text-danger">*</span></label>
        <select data-width='100%' id="stream" v-model="stream" >
        <option disabled value="0">Select</option>
        </select> 
    </div>
    <!-- ./stream -->
  </div>
</template>

<script>
import Vue from 'vue'
import Vuetify from 'vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VeeValidate from 'vee-validate';
import select2 from 'select2'
import Select from './Select'

Vue.use(Vuetify)
Vue.use(VeeValidate);
Vue.use(VueAxios, axios)
Vue.component('vselect', Select)

export default {
  $_veeValidate: {
      validator: 'new'
  }, 
  data: function() {
    return {   
      adm_no:'',
      academic_year:'',
      academic_years:[
        { "text": "2018-2019", "id": "1"},
        { "text": "2017-2018", "id": "2"},
      ],
      course:'',
      stream:'',
      joining_date: "",
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
    format(item){ return item.name; },
    selectAjax(){
      var self = this;
      // academic year
      $('#academic_year').select2({width:'100%',
        formatSelection: self.format,
        formatResult: self.format,
        ajax: {
          url: function (params) {
            return getAcademicYearsUrl+'?' + params.term;
          },
          // url: getAcademicYearsUrl,
          processResults: function (data) {
            // Tranforms the top-level key of the response object from 'items' to 'results'
            // console.log(data.results);
            data = data.results;
            return {
                  results :
                      data.map(function(item) {                    
                          return {
                              id : item.id,
                              text : item.name
                          };
                      }
              )};
          }
        },
        debug: true,
        delay: 250,
      
      });
      // ./academic year

      // ============================

      // courses
      $('#course').select2({width:'100%',
        formatSelection: self.format,
        formatResult: self.format,
        ajax: {
          url: function (params) {
            return getCourseUrl+'?' + params.term;
          },
          processResults: function (data) {
            // Tranforms the top-level key of the response object from 'items' to 'results'
            // console.log(data.results);
            data = data.results;
            return {
                  results :
                      data.map(function(item) {                    
                          return {
                              id : item.id,
                              text : item.name
                          };
                      }
              )};
          }
        },
        debug: true,
        delay: 250,
      
      });
      // ./courses

      // ============================

      // stream
      $('#stream').select2({width:'100%',
        formatSelection: self.format,
        formatResult: self.format,
        ajax: {
          url: function (params) {
            return getStreamUrl+'?' + params.term;
          },
          processResults: function (data) {
            // Tranforms the top-level key of the response object from 'items' to 'results'
            // console.log(data.results);
            data = data.results;
            return {
                  results :
                      data.map(function(item) {                    
                          return {
                              id : item.id,
                              text : item.name
                          };
                      }
              )};
          }
        },
        debug: true,
        delay: 250,
        
      });
      // ./stream
    }
  },
  mounted(){    
    this.selectAjax();
    
  }
}
</script>
