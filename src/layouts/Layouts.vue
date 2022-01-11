<template>
  <HeaderVue logo="My Diary" />
  <slot></slot>
</template>

<script>
  import HeaderVue from "../components/Header.vue";

  export default {
    components: {
      HeaderVue
    }
  }
</script>