<template>
  <div class="bg-green-600 px-4 py-2">
    <div class="container flex justify-between items-center mx-auto">
      <h1 class="text-2xl text-white font-bold cursor-default" @click="handleLogo">{{ logo }}</h1>

      <MenuVue/>
    </div>
  </div>
</template>

<script>
import MenuVue from "./Menu.vue"

export default {
  props:['logo', 'menus'],
  name: 'headerpage',
  components: {
    MenuVue
  },
  methods: {
    handleLogo() {
      return this.$router.push('/diary');
    }
  }
}
</script>