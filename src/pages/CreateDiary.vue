<template>
  <LayoutsVue>
    <div class="container mx-auto  p-4">
      <Form @submit="handleSubmit" class="mt-4" :validation-schema="schema">
        <Field 
          type="title"
          name="title"
          id="title"
          placeholder="Title"
          class="outline-none w-full focus:border-blue-600"
          autocomplete="off"
        />
        <hr class="mt-1">
        <Field 
          type="value"
          name="value"
          id="value"
          as="textarea"
          placeholder="Enter your diary value"
          class="mt-2 outline-none w-full focus:border-blue-600"
          autocomplete="off"
          style="height: 75vh;"
        />
        <button class="absolute right-4 bottom-4 bg-green-600 p-4 rounded-full shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
        </button>
      </Form>
    </div>
  </LayoutsVue>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from 'yup';
import diaryService from "../services/diary.service";
import LayoutsVue from "../layouts/Layouts.vue";

export default {
  name: 'create-diary',
  components: {
    Field,
    Form,
    ErrorMessage,
    LayoutsVue
  },
  data(){
    const schema = yup.object().shape({
      title: yup.string(),
      value: yup.string(),
    });

    return {
      schema
    }
  },
  methods: {
    handleSubmit(diary){
      diaryService.add(diary).then(
        response => {
          if(response.status == 200){
            this.$router.push('/diary');
          }
        },
        error => {
          console.log(error.data)
        }
      )
    }
  }
}
</script>