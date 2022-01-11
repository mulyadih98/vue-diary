<template>
  <div class="flex min-h-screen items-center justify-center bg-blue-600">
    <div class="p-4 bg-white rounded-md">
      <h1 class="text-center text-2xl mb-2">Login Diary App</h1>
      <hr>
      <div class="bg-red-400 p-4 m-1 rounded-md" v-if="message">
        <p class="text-white">{{message}}</p>
      </div>
      <Form class="space-y-2" @submit="handleLogin" :validation-schema="schema">
          <div class="flex flex-col p-4">
            <div class="my-4 flex flex-col">
              <Field 
                type="email" 
                id="email" 
                name="email"
                placeholder="Email Address"
                class="outline-none border-b focus:border-blue-600"
                autocomplete="off"
              />
              <ErrorMessage name="email" class="text-xs text-red-600 mt-1" />
            </div>
            <div class="my-4 flex flex-col">
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                class=" outline-none border-b focus:border-blue-600 "
              />
              <ErrorMessage name="password" class="text-xs text-red-600 mt-1" />
            </div>
            <a href="" class="my-1 text-gray-400 text-xs">Forgot Password ?</a>
            <button class="bg-blue-600 rounded-lg py-1 text-white my-4 { loading? 'bg-gray-600': '' }" :disabled="loading">
              Sing in
            </button>
            <p class="text-sm text-center">Not a Member ? <router-link to="/singup" class="text-blue-600">Singup</router-link></p>
          </div>
      </Form>
    </div>
  </div>
</template>

<script>
  import { Form, Field, ErrorMessage } from  'vee-validate';
  import * as yup from 'yup';
  import authService from '../services/auth.service';
  
  export default {
    name: 'Singin',
    components: {
      Field,
      Form,
      ErrorMessage
    },
    data(){
      const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required().min(6)
      });
      return {
        loading: false,
        message: '',
        schema
      }
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      }
    },
    created() {
      if(this.loggedIn){
        this.$router.push('/diary')
      }
    },
    methods: {
      handleLogin(user) {
        this.login = true;
        this.$store.dispatch('login', user).then(
          () => {
            this.$router.push('/diary');
          },
          (error) => {
            this.loading = false;
            this.message = error.response.data.message;
          }
        );
      }
    }
  }
</script>