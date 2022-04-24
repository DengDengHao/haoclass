<template>
  <a-descriptions title="课程信息" bordered>
    <a-descriptions-item label="课程编号">{{classnum}}</a-descriptions-item>
    <a-descriptions-item label="课程类别">{{classtype}}</a-descriptions-item>
    <a-descriptions-item label="老师姓名">{{classteacher}}</a-descriptions-item>
    <a-descriptions-item label="报名状态" >
      <a-badge status="processing" text="未报名" />
    </a-descriptions-item>
    <a-descriptions-item label="课程图片"><img :src="classimg"/></a-descriptions-item>
    <a-descriptions-item label="课时次数">{{classcishuu}}</a-descriptions-item>
     <a-descriptions-item label="老师介绍">{{classnote}}</a-descriptions-item>
  </a-descriptions>
 <a-button type="primary" @click="() => {this.$router.go(-1)}" style="margin:10px;float:right">返回</a-button>
</template>
<script>
import { defineComponent,/*  reactive, */onMounted,ref} from 'vue';
import axios from 'axios'
/* import qs from 'qs'
import { message } from 'ant-design-vue'; */
import { useRoute } from "vue-router";
export default defineComponent({
  setup() {
    const classnum=ref('');
    const classtype=ref('');
    const classimg=ref('');
    const classteacher=ref('');
    const classcishuu=ref('');
    const classnote=ref('');
     /* const dataSource = ref([
    ]); */
    const route = useRoute();
    const dataa=route.query.classnum;
   onMounted(()=>{
    /* let  datasql; */
    /* let da=localStorage.getItem('user');
    let daa=JSON.parse(da) */
    axios.get('/classview',{params:{num:dataa}}).then(res=>{
     /*  datasql=JSON.parse(JSON.stringify(res.data));
      for(let i=0;i<datasql.length;i++){
        dataSource.value.push(datasql[i])
      } */
      console.log(res.data[0].classimg)
      classnum.value=res.data[0].classnum;
      classtype.value=res.data[0].classtype;
      classteacher.value=res.data[0].teachername;
      classimg.value=res.data[0].classimg;
      classcishuu.value=res.data[0].classcishu;
      classnote.value=res.data[0].classnote;

    })
    })
    return {
      classnum,classimg,classtype,classteacher,classcishuu,classnote,
     /* dataSource, */
     dataa
    };
  },
});
</script>