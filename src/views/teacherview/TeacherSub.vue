<template>
<h1>请输入您想发布的课程信息</h1>
<br>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="课程类别">
      <a-radio-group v-model:value="formState.type" button-style="solid">
        <a-radio-button value="钢琴">钢琴</a-radio-button>
        <a-radio-button value="吉他">吉他</a-radio-button>
        <a-radio-button value="唱歌">唱歌</a-radio-button>
        <a-radio-button value="二胡">二胡</a-radio-button>
      </a-radio-group>
     <!--  <a-input v-model:value="formState.name" /> -->
    </a-form-item>

     <a-form-item label="上传您的课程图片:" name="image">
   <a-upload
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
    <a-form-item label="课时数量">
      <a-input-number id="inputNumber" v-model:value="formState.value" :min="1" :max="15" />
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px" @click="back">Cancel</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, toRaw,ref} from 'vue';
import axios from 'axios'
import qs from 'qs'
import { message } from 'ant-design-vue';
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
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
            
            this.formState.img=res.data.url
            console.log(this.formState.img)
          }
          
    })
    },
  },
  setup() {
     const fileList = ref([]);
    const loading = ref(false);
    const imageUrl = ref('');
    const imgurl=ref('')
    const router = useRouter();
    const store=useStore();
    const formState = reactive({
      type: '钢琴',
      value:'1',
      username:store.state.formState.username,
      img:''
    });

    const onSubmit = () => {
      console.log('submit!', toRaw(formState));
      axios.post('/insertclass',qs.stringify(formState)).then(res=>{
        if(res.data=='100'){
          message.info('您已成功发布课程！')
          router.push('/teacherrelease')
        }
        else{
          message.info('发生了错误！')
        }
      })
    };
    const back=()=>{
      router.push('/teacherrelease')
    };

    return {
      imgurl,
      loading,
      imageUrl,
      fileList,
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      formState,
      onSubmit,
      back
    };
  },
});
</script>