<template>
 <select data>
    <slot></slot>
 </select>
</template>

<script>
import select2 from 'select2'

export default {
  name: 'Select',   
  props: ['options', 'value','placeholder'],
  mounted: function () {
    var vm = this
    $(this.$el)
      // init select2
      .select2({ data: this.options, width:'100%', placeholder:'Select' })
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
}
//./select
</script>
