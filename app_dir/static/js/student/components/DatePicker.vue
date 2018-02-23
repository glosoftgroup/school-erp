<template>
 <input class="form-control" />
</template>

<script>
//datepicker component
export default {
  name:'datepicker',
  props: ['options', 'value'],
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
}
//./select
</script>

