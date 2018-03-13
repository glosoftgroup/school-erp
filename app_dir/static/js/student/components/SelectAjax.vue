<template>
 <select data>
    <slot></slot>
 </select>
</template>

<script>
import select2 from 'select2'

export default {
  name: 'Select',   
  props: ['options', 'value','placeholder','url'],
  methods:{
      format(item){ return item.name; },
  },
  mounted: function () {
    var vm = this
    $(this.$el)
      // init select2
      .select2({ 
        // data: this.options,
        width:'100%',
        placeholder: this.placeholder,
        formatSelection: this.format,
        formatResult: this.format,
        ajax: {
          url: function (params) {
            return vm.url+'?' + params.term;
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
      })
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
    // options: function (options) {
    //   // update options
    //   $(this.$el).empty().select2({ data: options })
    // }
  },
  destroyed: function () {
    $(this.$el).off().select2('destroy')
  }
}
//./select
</script>
