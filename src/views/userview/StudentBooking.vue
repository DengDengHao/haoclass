<template>
<h1>正在预约...</h1>
<a-form
    ref="formRef"
    :rules="rules"
    :model="formState"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    style="margin:20px"
  >
  
     <a-form-item label="Activity time" required name="date1">
      <a-date-picker
        v-model:value="formState.date1"
        show-time
        type="date"
        placeholder="Pick a date"
        style="width: 100%"
      />
    </a-form-item>
    <a-form-item label="上课方式" required>
      <a-select v-model:value="formState.way" placeholder="please select your zone">
        <a-select-option value="机构">机构</a-select-option>
        <a-select-option value="网课">网课</a-select-option>
        <a-select-option value="家教">家教</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="想和老师说的话" name="note" >
      <a-input v-model:value="formState.note" placeholder="可以打上你和老师想说的话哟"/>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }" >
      <a-button type="primary" @click="onSubmit">提交</a-button>
      <a-button style="margin-left: 10px" @click="backk">返回</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from "vue-router";
import { message } from 'ant-design-vue';
import qs from 'qs'
import axios from 'axios';
import moment from 'moment'
export default defineComponent({
  methods:{
    onSubmit(){
      let datat={
        classnums:this.$route.query.classnum,
        datea:moment(this.formState.date1).format("YYYY-MM-DD HH:mm:ss"),
        classway:this.formState.way,
        note:this.formState.note
      }
      console.log(datat)
      axios.post('/insertbooking',qs.stringify(datat)).then(res=>{
        if(res.data=='100'){
          message.info('您已成功提交预约！')
          this.$router.push('/studentbook')
        }
        else{
          message.info('发生了错误！')
        }
      })
    }
  },
  setup() {
    const router=useRouter();
    const formRef = ref();
    const formState = reactive({
      way: undefined,
      date1: undefined,
      note: '',
    });
    const rules = {
      date1: [
        {
          required: true,
          message: 'Please pick a date',
          trigger: 'change',
          type: 'object',
        },
      ],
      way: [
        {
          required: true,
          message: 'Please select way zone',
          trigger: 'change',
        },
      ],
      
    };

    const backk = () => {
      router.go(-1)
    };

    return {
      formRef,
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      
      formState,
      rules,
      backk,
    };
  },
});
</script>
