<template>
  <div class="login" style="">
    <a-card title="HAO音乐机构管理系统" :bordered="false" style="width: 300px;padding: 15px;" >
     <a-form
    :model="formState"
    name="normal_login"
    class="login-form"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
  >
    <a-form-item
      label="Username"
      name="username"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username">
        <template #prefix>
          <UserOutlined class="site-form-item-icon" />
        </template>
      </a-input>
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password">
        <template #prefix>
          <LockOutlined class="site-form-item-icon" />
        </template>
      </a-input-password>
    </a-form-item>
    <div class="radio">
    <a-radio-group v-model:value="formState.value" name="radioGroup">
    <a-radio value="1">学生</a-radio>
    <a-radio value="2">老师</a-radio>
    <a-radio value="3">管理员</a-radio>
  </a-radio-group>
    </div>
    
    <!-- <div class="login-form-wrap">
      <a-form-item name="remember" no-style>
        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
      </a-form-item>
      <a class="login-form-forgot" href="">Forgot password</a>
    </div> -->

    <a-form-item style="margin-top:30px">
      <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button" @click="submitlogin(formState,value)">
        Log in
      </a-button>
      Or
      <a @click="Register">register now!</a>
    </a-form-item>
  </a-form>
    </a-card>
  </div>
  <!-- <input type="button" value="测试！" @click="tess(formState)"/> -->
</template>
<style scoped>
.login{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    border: 2px solid;
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#components-form-demo-normal-login .login-form-forgot {
  margin-bottom: 24px;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>

<script>
import { defineComponent, reactive, computed} from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import axios from 'axios'
import qs from 'qs'
export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },

  setup() {
    /* const value = ref('1'); */
    const formState = reactive({
      username: '',
      password: '',
      value: '1',
    });
    
    const onFinish = values => {
      console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    };

    const disabled = computed(() => {
      return !(formState.username && formState.password);
    });
    return {
      formState,
      onFinish,
      onFinishFailed,
      disabled,
    };
  },
methods:{
  /* tess(value){
    console.log(qs.stringify(value))
    let p=qs.stringify(value)
    axios.get('/test',{params:p}).then(res=>{
      console.log(res)
    })
  }, */
    Register(){
      this.$router.push('/register')
    },
    submitlogin(formState){
      
      console.log('提交！')
      if(formState.value=='1'){
        //提交请求至学生登录接口
      console.log('传值'+formState)
      axios.post('/login/student',qs.stringify(formState)).then(res=>{
        console.log(res)
        if(res.data.length){
          message.info('欢迎您！'+formState.username+'同学');
          let a=JSON.stringify(formState)
          localStorage.setItem('user',a)
          this.$store.commit('login',formState)
          let redirect=decodeURIComponent(this.$route.query.redirect || '/studentsign')
          this.$router.push({path:redirect})
        }
        else{
          message.info('密码或者账号错误！')
        }
      })
      }
      //提交请求至老师登录接口
      else if(formState.value=='2'){
        axios.post('/login/teacher',qs.stringify(formState)).then(res=>{
          if(res.data.length){
            message.info('欢迎您！'+formState.username+'老师');
            let a=JSON.stringify(formState)
          localStorage.setItem('user',a)
            this.$store.commit('login',formState)
            let redirect=decodeURIComponent(this.$route.query.redirect || '/teacherrelease')
            this.$router.push({path:redirect})
          }
          else{
            message.info('密码或者账号错误！')
          }
        })
      }
      //提交请求至老师登录接口
      else if(formState.value=='3'){
        axios.post('/login/admin',qs.stringify(formState)).then(res=>{
          if(res.data.length){
            message.info('欢迎您！'+formState.username+'管理员');
            let a=JSON.stringify(formState)
          localStorage.setItem('user',a)
            this.$store.commit('login',formState)
            let redirect=decodeURIComponent(this.$route.query.redirect || '/adminmans')
            this.$router.push({path:redirect})
          }
          else{
            message.info('密码或者账号错误！')
          }
        })
      }

    }
}
});
</script>