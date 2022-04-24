import { createRouter, createWebHistory } from 'vue-router'
import StudentHome from '../views/userview/StudentHome.vue'
import LoginView from '../views/commonview/loginView.vue'
import studentWorktable from '../views/userview/StudentWorktable.vue'
import teacherhome from '../views/teacherview/TeacherHome.vue'
import teacherdeal from '../views/teacherview/TeacherDeal.vue'
import teacherrelease from '../views/teacherview/TeacherRelease.vue'
import teacherworktable from '../views/teacherview/TeacherWorktable.vue'
import store from '../store/index.js'
import Register from '../views/commonview/registerView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path:'/register',
    name:'register',
    component:Register
  },
  {
    path: '/studentmenu',
    name: 'studenthome',
    component: StudentHome,
    meta:{
      loginRequest:true
    },
    children:[
    {
      path:'/studentworktable',
      name:'studentWorktable',
      component:studentWorktable,
      meta:{
        loginRequest:true
      },
    },
    {
      path:'/studentsign',
      name:'studentSign',
      component:()=>import('../views/userview/StudentSign.vue'),
      meta:{
        loginRequest:true
      }
    },
    {
      path:'/studentbooking',
      name:'studentBooking',
      component:()=>import('../views/userview/StudentBooking.vue'),
      meta:{
        loginRequest:true
      }
    },
    {
      path:'/studentbook',
      name:'studentBook',
      component:()=>import('../views/userview/StudentBook.vue'),
      meta:{
        loginRequest:true
      }
    },
    {
      path:'/classview',
      name:'classview',
      component:()=>import('../views/commonview/classView.vue'),
      meta:{
        loginRequest:true
      }
    },
    ]
  },
  {
    path: '/teachermenu',
    name: 'teachermenu',
    component: teacherhome,
    meta:{
      loginRequest:true
    },
    children:[
    {
      path:'/teacherworktable',
      name:'teacherworktable',
      component:teacherworktable,
      meta:{
        loginRequest:true
      },
    },
    {
      path:'/teacherrelease',
      name:'teacherrelease',
      component:teacherrelease,
      meta:{
        loginRequest:true
      }
    },
    {
      path:'/teacherdeal',
      name:'teacherdeal',
      component:teacherdeal,
      meta:{
        loginRequest:true
      }
    },
    {
      path:'/teachersub',
      name:'teachersub',
      component:()=>import('../views/teacherview/TeacherSub.vue'),
      meta:{
        loginRequest:true
      }
    },
    
    ]
  },
  {
    path: '/adminmenu',
    name: 'adminmenu',
    component: ()=>import('../views/adminview/AdminHome.vue'),
    meta:{
      loginRequest:true
    },
    children:[
    {
      path:'/adminworktable',
      name:'adminworktable',
      component: ()=>import('../views/adminview/AdminWorktable.vue'),
      meta:{
        loginRequest:true
      },
    },
    {
      path:'/adminmant',
      name:'adminmant',
      component: ()=>import('../views/adminview/AdminMant.vue'),
      meta:{
        loginRequest:true
      }
    },
    {
      path:'/adminmans',
      name:'adminmans',
      component: ()=>import('../views/adminview/AdminMans.vue'),
      meta:{
        loginRequest:true
      }
    },
    
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.loginRequest){
      console.log(localStorage.getItem('user'),store.state.formState)
      if(localStorage.getItem('user')){
          next()
      }else{
          next({
              path:'/login',
              query:{
                  redirect:to.fullPath
              }
          })
      }
  }else{
      next()
  }
})

export default router
