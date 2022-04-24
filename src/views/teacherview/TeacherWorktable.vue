<template>
<a-card style="width:100%;">
 <a-descriptions title="用户信息">
    <a-descriptions-item label="头像">
        <a-avatar :size="108" :src="teacherimg"></a-avatar>
    </a-descriptions-item>
    <a-descriptions-item label="老师用户名">{{teachername}}</a-descriptions-item>
    <a-descriptions-item label="老师编号">{{teacherindex}}</a-descriptions-item>
  </a-descriptions>
  </a-card>
   <a-button type="primary" @click="showModal" style="margin:10px;float:right">修改个人信息</a-button>
  <a-modal v-model:visible="visible" title="个人信息修改！" @ok="handleOk" @cancel="handleC">

      <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules" ref="formRef">
    <a-form-item label="用户名">
      {{formState.name}}
    </a-form-item>

    <a-form-item label="密码" name="password">
      <a-input v-model:value="formState.password" :placeholder="formState.password"/>
    </a-form-item>

    <a-form-item label="您的头像">
         <a-upload
    v-model:file-list="fileList"
    name="avatar"
    list-type="picture-card"
    :show-upload-list="false"
    :before-upload="beforeUpload"
    :customRequest="uploadImage"
  >
     <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width:100px"/>
    <div v-else>
      <loading-outlined v-if="loading"></loading-outlined>
      <plus-outlined v-else></plus-outlined>
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
    </a-form-item>
      </a-form>
    </a-modal> 
</template>
<script>
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { defineComponent,onMounted,ref,reactive,inject} from 'vue';
import axios from 'axios'
import qs from 'qs'
import { useStore } from "vuex";
import { message } from 'ant-design-vue';
export default defineComponent({
    inject:['reload'],
 components: {
    LoadingOutlined,
    PlusOutlined,
  },
  methods:{
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
            /* this.newimg=res.data.realurl */
            this.newimg=res.data.url
          }
          
    })
    },

  },
  setup(){
    const handleC=()=>{
      if(imageUrl.value==teacherimg.value){
        message.info('未保存！')
      }
      else{
let a=newimg.value;
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
      imageUrl.value=teacherimg.value
      }
    
    }
      const reload=inject('reload');
      const formRef = ref();
      const rules = {
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
    };
      const store=useStore();
      
    const visible = ref(false);
    const showModal = () => {
      visible.value = true;
    };

    const handleOk = e => {
      console.log(e);
      console.log('newimg:'+newimg.value)
     
      let fordata={
          jiu:teacherimg.value,
          name:formState.name,
          pas:formState.password,
          new:newimg.value,
      }
      if(teacherimg.value){
    let a=fordata.jiu;
    let b=a.split('/');
    /* b.splice(22,0,'upload/')
    console.log(b.join(''))
    fordata.jiu=b.join(''); */
      console.log('/uploads/'+b[3]);
      fordata.jiu='./uploads/'+b[3];
      axios.post('/uploadimage/delt',qs.stringify(fordata)).then(res=>{
              if(res.data=='100'){
                  message.info('您成功更新')
                  reload()
              }
              else{
                  message.info('发生了错误！！'+res.data)
              }
          })
      visible.value = false;
      }
      else{
       message.info('请联系管理员，出现了一些状况')
      }
       
    };
      const newimg=ref('');
      const teacherimg=ref('')
      const teachername=store.state.formState.username;
      const teacherindex=ref('')
      const password1=ref('')
      const formState = reactive({
      name: store.state.formState.username,
      password:password1,
      img: teacherimg,
    });
     const fileList = ref([]);
    const loading = ref(false);
    const imageUrl = ref('');
      onMounted(()=>{
          axios.get('/selectuser/teachermessage',{params:{namee:store.state.formState.username}}).then(res=>{
      /* datasql=JSON.parse(JSON.stringify(res.data));
      for(let i=0;i<datasql.length;i++){
        dataSource.value.push(datasql[i])
      } */
      console.log(res.data[0])
      teacherimg.value=res.data[0].teacherimg;
      teacherindex.value=res.data[0].index
      password1.value=res.data[0].password
      imageUrl.value=res.data[0].teacherimg;
    })
      })
      return{
        handleC,
          newimg,
          formRef,
          rules,
           labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
       loading,
      imageUrl,
      /* handleChange, */
      fileList,
          formState,
          password1,
          visible,
          showModal,
          handleOk,
          teacherimg,
          teachername,
          teacherindex
      }
  }
});
</script>