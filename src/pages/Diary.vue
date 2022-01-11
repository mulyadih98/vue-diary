<template>
  <LayoutsVue>
    <div class="container px-2 pt-8 mx-auto space-y-4">
      <div class="flex items-center justify-center h-screen" v-if="!diaries">
        <p class="italic text-gray-500">Anda belum memiliki catatan</p>
      </div>
      <DiaryCard @delete-diary="handleDelete()" v-for="diary in diaries" :key="diary.id" :id="diary.id" :title="diary.title" :value="diary.value"/>
    </div>
    <ButtonCreate class="bottom-5 right-5 fixed"/>
  </LayoutsVue>
</template>

<script>
import Header from '../components/Header.vue';
import DiaryCard from '../components/DiaryCard.vue';
import ButtonCreate from '../components/ButtonCreate.vue';
import diaryService from '../services/diary.service';
import LayoutsVue from '../layouts/Layouts.vue';

export default {
  name: 'DiaryPage',
  components: {
    Header, DiaryCard, ButtonCreate,LayoutsVue
  },
  data(){
    return {
      diaries: []
    }
  },
  created(){
    this.getDiary();
  },
  methods: {
    getDiary() {
      return diaryService.getAll().then(
        response => {
          this.diaries= response.data
        },
        error => {
          if(error.response.status == 401) localStorage.removeItem('user')
        }
      )
    },
    handleDelete() {
      this.getDiary();
    }
  }
}
</script>