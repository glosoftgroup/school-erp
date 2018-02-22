//initialize external plugins
Vue.use(VueFormWizard);

//select2 component
Vue.component('select2', {
  props: ['options', 'value'],
  template: '#select2-template',
  mounted: function () {
    var vm = this
    $(this.$el)
      // init select2
      .select2({ data: this.options })
      .val(this.value)
      .trigger('change')
      // emit event on change.
      .on('change', function () {
        vm.$emit('input', this.value)
      })
  },
  watch: {
    value: function (value) {
      // update value
      $(this.$el).val(value)
    },
    options: function (options) {
      // update options
      $(this.$el).empty().select2({ data: options })
    }
  },
  destroyed: function () {
    $(this.$el).off().select2('destroy')
  }
});
//./select

//datepicker component
Vue.component('datepicker', {
  props: ['options', 'value'],
  template: '#datepicker-template',
  mounted: function () {
    var vm = this
    $(this.$el)
      // init datepicker
      .daterangepicker({
            singleDatePicker: true,
            locale:{format: 'YYYY-MM-DD'},
            showDropdowns:true,
            autoUpdateInput:false
        },function(chosen_date) {
        // emit event on change.
        console.log(chosen_date);
        vm.$emit('input', chosen_date.format('YYYY-MM-DD'));
        // $('.datepicker').val(chosen_date.format('YYYY-MM-DD'));

    });
  },
  watch: {
    value: function (value) {
      // update value
      $(this.$el).val(value)
    }
  },
  destroyed: function () {
    // $(this.$el).off().select2('destroy')
  }
});
//./datepicker

var parent = new Vue({
  el: '#vue-app',
  delimiters: ['${', '}'],
  data: {
    message: 'Crud form',
    first_name: '',
    last_name:'',
    middle_name:'',
    adm_no:'',
    academic_year:'',
    dob:'',
    join_date:null,
    leave_date:null,
    options:[],
    selected:false
  },
  methods:{
    onSearch(search, loading) {
      loading(true);
      this.search(loading, search, this);
    },
    onComplete: function(){
          alert('Yay. Done!');
    },
    beforeTabSwitch: function(){
          alert("This is called before switching tabs")
          return true;
    },
    setLoading: function(value) {
            this.loadingWizard = value
    },
    handleValidation: function(isValid, tabIndex){
       console.log('Tab: '+tabIndex+ ' valid: '+isValid)
    },
    handleErrorMessage: function(errorMsg){
      this.errorMsg = errorMsg
    },
    validateAsync:function() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if(this.count < 1){
           this.count ++
              reject('This is a custom validation error message. Click next again to get rid of the validation')
          }else{
           this.count = 0
           resolve(true)
          }
        }, 1000)
      })
     },
  }
})