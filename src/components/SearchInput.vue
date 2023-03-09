<template>
  <input :value="value" @input="updateInput" placeholder="Recherchez vos films..." class='js-search' type="text">
</template>

<script>
export default {
  name: "SearchInput",
  props: {
    value: String
  },
  methods: {
    updateInput(event) {
      this.$emit('update:value', event.target.value);
      this.$emit('search', event.target.value);
    }
  }
}
</script>

<style scoped>

</style>