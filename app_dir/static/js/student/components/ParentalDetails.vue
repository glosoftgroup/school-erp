<template>
  <div class="row">
    <!-- academic year -->
    <div class="form-group col-sm-3">        
        <label class="req">Academic Year: <span class="text-danger">*</span></label>
              
    </div>
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
    }
  }
}
</script>

