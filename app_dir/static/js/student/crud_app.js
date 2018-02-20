//initialize external plugins
Vue.use(VueFormWizard);


var parent = new Vue({
  el: '#vue-app',
  delimiters: ['${', '}'],
  data: {
    message: 'Crud form',
    first_name: '',
    last_name:'',
    middle_name:'',
    dob:'',
  },
  methods:{
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
});