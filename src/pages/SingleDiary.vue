<template>
  <LayoutsVue>
    <div class="container p-2 mx-auto space-y-2">
      <div v-if="!edit" class="mt-4">
        <h2 class="text-xl italic text-gray-600">{{diary.title}}</h2>
        <hr class="mt-1">
        <p class="mt-2" >
          <span v-for="(line,lineNumber) of diary.value.split('\n')" v-bind:key="lineNumber">
            {{ line }} <br />
          </span>
        </p>
      </div>
      <Form @submit="handleUpdate" class="mt-4" :validation-schema="schema" v-else>
        <Field 
          name="title"
          id="title"
          placeholder="Title"
          class="outline-none w-full focus:border-blue-600 text-xl italic"
          autocomplete="off"
          :value="diary.title"
        />
        <hr class="mt-1">
        <Field 
          name="value"
          id="value"
          as="textarea"
          placeholder="Enter your diary value"
          class="mt-2 outline-none w-full resize-none focus:border-blue-600 border-none scrollbar-hide"
          autocomplete="off"
          style="height: 75vh;"
          :value="diary.value"
        />

        <Button tooltip="save" v-if="edit" class="right-4 bottom-7 fixed bg-green-600 rounded-full p-4 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
        </Button>
      </Form>
    </div>
    <Button @click="handleEdit" tooltip="edit" v-if="!edit" class="fixed right-4 bottom-7 bg-green-600 rounded-full p-4 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </Button>
  </LayoutsVue>
</template>

<script>
import diaryService from '../services/diary.service';
import LayoutsVue from '../layouts/Layouts.vue';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from 'yup';
import Button from '../components/Button.vue';


export default {
  components: {
    Field,
    Form,
    ErrorMessage,
    LayoutsVue,
    Button
  },
  data() {
    const schema = yup.object().shape({
      title: yup.string(),
      value: yup.string(),
    });

    return {
      diary: {value: ''},
      edit: false,
      schema
    }
  },
  created(){
    this.getDiary(this.id)
  },
  computed: {
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    getDiary(id) {
      diaryService.getById(id)
      .then(res => {
        this.diary = res.data;
        this.edit = false;
      })
      .catch(err => console.log(err.response))
    },
    handleEdit() {
      return this.edit = !this.edit;
    },
    handleUpdate(diary) {
      diaryService.update(this.id,diary)
        .then(res => {
          this.getDiary(this.id)
          this.$toast.success(res.data.message)
        },
        error => {
          console.log(error.response)
        })
    }
  }
}
</script>