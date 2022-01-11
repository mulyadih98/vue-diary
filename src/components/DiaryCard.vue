<template>
    <div class="bg-white shadow-lg border rounded-lg px-4 py-2">
      <div class="flex justify-between items-center">
        <p class="text-xl">{{title}}</p>
        <ButtonVue @click="handleDelete()" tooltip="hapus" class="block relative">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </ButtonVue>
      </div>
      <hr>
      <router-link :to="paramId">
        <p class="text-sm py-1">
          <span v-for="(line,lineNumber) of value.substr(0,150).split('\n')" v-bind:key="lineNumber">
            {{ line }} <br>
          </span>
        </p>
      </router-link>
    </div>
</template>

<script>
import diaryService from '../services/diary.service';
import ButtonVue from "./Button.vue";

export default {
  components: { ButtonVue },
  props: ['title', 'value', "id"],
  computed: {
    paramId() {
      return '/diary/'+this.id;
    }
  },
  methods: {
    handleDelete() {
      diaryService.delete(this.id)
        .then(() => this.$emit('deleteDiary'))
    }
  },

}
</script>