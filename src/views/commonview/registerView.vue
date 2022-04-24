<template>
<a-page-header
    style="border: 1px solid rgb(235, 237, 240)"
    title="注册页面！"
    sub-title="请开始您的注册吧，请标明用户类型！"
    @back="clean"
  />
<div style="position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);width:600px;text-align:center">

  <a-form :rules="rules" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" ref="formRef">
      
    <a-form-item label="请输入您的用户名:" name="username">
      <a-input v-model:value="formState.username" placeholder="用户名不能重名，且必须大于三个字符"/>
    </a-form-item>
    <a-form-item label="请输入您的密码:" name="password">
      <a-input v-model:value="formState.password" placeholder="密码必须大于六个字符"/>
    </a-form-item>

    <a-form-item label="上传您的头像:" name="image">
     <!--  <img src="http://localhost:3000/1650450792211.jpg" alt="avatar" /> -->
   <a-upload
    ref="myimg"
    v-model:file-list="fileList"
    name="avatar"
    list-type="picture-card"
    :show-upload-list="false"
    :before-upload="beforeUpload"
    :customRequest="uploadImage"
  >
     <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <loading-outlined v-if="loading"></loading-outlined>
      <plus-outlined v-else></plus-outlined>
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
    </a-form-item>

    <a-form-item label="类别" name="type">
      <a-radio-group v-model:value="formState.type">
        <a-radio value="1">学生</a-radio>
        <a-radio value="2">老师</a-radio>
      </a-radio-group>
    </a-form-item>
    
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit" :disabled="disabled">register!</a-button>
    </a-form-item>
  </a-form>
  </div>
</template>
<script>
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, toRaw ,computed,ref} from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from "vue-router";
import axios from 'axios'
import qs from 'qs'
/* function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
} */
export default defineComponent({
  components: {
    LoadingOutlined,
    PlusOutlined,
  },
  methods:{
    clean(){
        if(this.imageUrl){
          let a=this.imageUrl;
          let b=a.split('/');
          console.log('./uploads/'+b[3]);
          axios.post('/uploadimage/delimg',qs.stringify({data:'./uploads/'+b[3]})).then(res=>{
        if(res.data=='100'){
message.info('删除未保存的图片！')
        }
        else{
          message.info('删除未保存的图片发生了意外')
        }
      })
        }
        this.$router.go(-1)
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('只能上传jpg/png格式的头像!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片不得大于2MB!')
      }
      return isJpgOrPng && isLt2M
    },
     uploadImage(file) {
       let formData=new FormData();
       formData.append('file',file.file)
    axios.post('/uploadimage',formData).then(res=>{
          if(res.data.stas=='200'){
            this.loading = false;
            message.info('上传完成')
            this.imageUrl=res.data.url
            
            this.formState.img=res.data.url
            console.log(this.formState.img)
          }
          
    })
    },

  },
  setup() {
    const myimg = ref(null);
    const fileList = ref([]);
    const loading = ref(false);
    const imageUrl = ref('');
    const imgurl=ref('')
    /* const handleChange = info => {
      if (info.file.status === 'uploading') {
        loading.value = true;
        return;
      }

      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, base64Url => {
          imageUrl.value = base64Url;
          loading.value = false;
        });
    }
 if (info.file.status === 'error') {
        loading.value = false;
        message.error('upload error');
      }
    }; */
    const rules = {
      username: [
        {
          required: true,
          message: 'Please input username',
          trigger: 'blur',
        },
        {
          min: 3,
          max: 12,
          message: 'Length should be 3 to 12',
          trigger: 'blur',
        },
      ],
      password: [
        {
          required: true,
          message: 'Please input password',
          trigger: 'blur',
        },
        {
          min: 6,
          max: 20,
          message: 'Length should be 6 to 10',
          trigger: 'blur',
        },
      ],
      type: [
        {
          required: true,
          message: 'Please select activity resource',
          trigger: 'change',
        },
      ]
    };
    

    const formRef = ref();
    const router = useRouter();
    const disabled = computed(() => {
      return !(formState.username && formState.password);
    });
    const formState = reactive({
      username: '',
      password:'',
      type: '1',
      img:''
    });

    const onSubmit = () => {
        formRef.value
        .validate()
        .then(() => {
        console.log('submit!', toRaw(formState));
      if(formState.type=='1'){
          axios.post('/register/student',qs.stringify(formState)).then(res=>{
              if(res.data=='100'){
                  message.info('您成功注册！请登录')
                  router.push('/login')
              }
              else{
                  message.info('发生了错误！也许您的用户名已经存在，请检查用户名后重试！'+res.data)
              }
          })

      }
      else if(formState.type=='2'){
          axios.post('/register/teacher',qs.stringify(formState)).then(res=>{
              if(res.data=='100'){
                  message.info('您成功注册！请登录')
                  router.push('/login')
              }
              else{
                  message.info('发生了错误！也许您的用户名已经存在，请检查用户名后重试！'+res.data)
              }
          })
      }
        })
        .catch(error => {
          console.log('error', error);
          message.info('不符合要求！')
        });
     
      
    };

    return {
      myimg,
      imgurl,
      loading,
      imageUrl,
      /* handleChange, */
      fileList,
        rules,
        formRef,
        disabled,
      labelCol: {
        span: 5,
      },
      wrapperCol: {
        span: 14,
      },
      formState,
      onSubmit,
    };
  },
});
</script>

