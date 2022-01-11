import { createRouter, createWebHistory } from "vue-router";
import Home from '../pages/Home.vue';
import Singup from '../pages/Singup.vue';
import Singin from '../pages/Singin.vue';
import Diary from '../pages/Diary.vue';
import SingleDiary from '../pages/SingleDiary.vue';
import CreateDiary from '../pages/CreateDiary.vue';

const routes = [
  {
    path:"/",
    name:"home",
    component: Home,
  },
  {
    path:"/singup",
    name:"singup",
    component: Singup,
  },
  {
    path:"/singin",
    name:"singin",
    component: Singin,
  },
  {
    path:"/diary",
    name:"diary",
    component: Diary,
  },
  {
    path:"/create-diary",
    name:"create-diary",
    component: CreateDiary,
  },
  {
    path:"/diary/:id",
    name:"single-diary",
    component: SingleDiary,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to,from,next) => {
  const publicPages = ['/singup','/singin','/'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  if(authRequired && !loggedIn){
    next('/singin');
  }else{
    next();
  }
})

export default router;