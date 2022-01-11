<template>
  <div class="relative">
    <button @click="handleClick" v-click-outside="onClickOutside" class="text-white capitalize font-semibold">{{name}}</button>
    <ul class="absolute bg-white mt-2 right-0 rounded-md shadow-md" v-if="show">
      <li class="m-2 cursor-pointer " @click="handleLogout">Logout</li>
    </ul>
  </div>
</template>

<script>
import vClickOutside from 'click-outside-vue3';

export default {
  name: 'menuvue',
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    name() {
      const {user} = this.$store.state.auth;
      if(user) return user.name;
      else return '';
    }
  },
  methods: {
    handleLogout(){
      this.$store.dispatch('logout');
      this.$router.push('/singin');
    },
    onClickOutside(event) {
      return this.show = false;
    },
    handleClick() {
      return this.show = !this.show;
    }
  }
}
</script>