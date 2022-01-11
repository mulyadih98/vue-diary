<template>
  <div class="flex min-h-screen items-center justify-center bg-blue-600">
    <div class="p-4 bg-white rounded-md">
      <h1 class="text-center text-2xl mb-2">Regiseter Diary App</h1>
      <hr>
      <div class="bg-red-400 p-4 m-1 rounded-md" v-if="message">
        <p class="text-white">{{message}}</p>
      </div>
      <Form class="space-y-2" @submit="handleLogin" :validation-schema="schema">
          <div class="flex flex-col p-4">
            <div class="my-2 flex flex-col">
              <Field 
                type="name" 
                id="name" 
                name="name"
                placeholder="Username"
                class="outline-none border-b focus:border-blue-600"
              />
              <ErrorMessage name="name" class="text-xs text-red-600 mt-1" />
            </div>
            <div class="my-2 flex flex-col">
              <Field 
                type="email" 
                id="email" 
                name="email"
                placeholder="Email Address"
                class="outline-none border-b focus:border-blue-600"
              />
              <ErrorMessage name="email" class="text-xs text-red-600 mt-1" />
            </div>
            <div class="my-2 flex flex-col">
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                class=" outline-none border-b focus:border-blue-600 "
              />
              <ErrorMessage name="password" class="text-xs text-red-600 mt-1" />
            </div>
            <button class="bg-blue-600 rounded-lg py-1 text-white my-4 { loading? 'bg-gray-600': '' }" :disabled="loading">
              Sing up
            </button>
            <p class="text-sm text-center">Already a Member ? <router-link to="/singin" class="text-blue-600">Sing in</router-link></p>
          </div>
      </Form>
    </div>
  </div>
</template>

<script>
  import { Form, Field, ErrorMessage } from  'vee-validate';
  import * as yup from 'yup';
  
  export default {
    name: 'Singup',
    components: {
      Field,
      Form,
      ErrorMessage
    },
    data(){
      const schema = yup.object().shape({
        name: yup.string().required(),
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
    created(){
      if(this.loggedIn){
        this.$router.push('/diary');
      }
    },
    methods: {
      handleLogin(user) {
        this.login = true;
        this.$store.dispatch('register',user).then(
          response => {
            this.message = response.message;
          },
          error => {
            const {email, password} = error.response.data.errors;
            if(email){
              this.message = email[0];
            }

            if(password) {
              this.message = password[0];
            }
          }
        )
      }
    }
  }
</script>