<template>
<h1>您的课程</h1><a-divider />
  <a-table bordered :data-source="dataSource" :columns="columns" rowKey="classnum">
    <template #operation="{ record }">
      <template v-if="record.classcishu>0&&!isbooking(record.classnum)">
      <a-button type="primary" @click="jump(record.classnum)">预约</a-button>
      </template>
      <template v-if="record.classcishu>=0&&isbooking(record.classnum)">
      等待老师处理预约
      </template>
       <template v-if="record.classcishu==0&&!isbooking(record.classnum)">
      已结课，等待老师处理
      </template>
    </template>
  </a-table>
</template>

  

<script>
import { /* computed, */ defineComponent/* , reactive */, ref ,onMounted} from 'vue';
import axios from 'axios'
import qs from 'qs'
import { message } from 'ant-design-vue';
export default defineComponent({
  inject:['reload'],
methods:{
   onDelete(c,n,t){
      console.log('当前classnum为：'+c+',teachername为'+n)
      let data={
        num:c,
        name:n,
        names:this.$store.state.formState.username,
        type:t
      }
      axios.post('/classsign',qs.stringify(data)).then(res=>{
        if(res.data=='100'){
          this.reload()
          message.info('您已成功报名！')
        }
        else{
          message.info('出现了意外！')
        }
      })
    },
    jump(n){
      this.$router.push({
        path:'/studentbooking',
        query:{classnum:n}
      })
    },
    isbooking(n){
      for(let i=0;i<this.hasbooking.length;i++){
        if(n==this.hasbooking[i].classnum){
          return true;//已经提交了预约
        }
      }
      return false;//未预约
    }
    
},

  setup() {
    const hasbooking=ref([
    ]);
    const columns = [
      {
        title: '课程号',
        dataIndex: 'classnum',
        width: '30%',
      },
      {
        title: '课程类别',
        dataIndex: 'classtype',
      },
      
      {
        title:'老师姓名',
        dataIndex:'teachername'
      },
      {
        title: '课时数',
        dataIndex: 'classcishu',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        slots: {
          customRender: 'operation',
        },
      },
    ];
 
    const dataSource = ref([
    ]);
    onMounted(()=>{
    let  datasql;
    let da=localStorage.getItem('user');
    let daa=JSON.parse(da)
    axios.get('/yuyue',{params:{data:daa.username}}).then(res=>{
      datasql=JSON.parse(JSON.stringify(res.data));
      for(let i=0;i<datasql.length;i++){
        dataSource.value.push(datasql[i])
      }
    })
    axios.get('/isbooking').then(res=>{
        for(let i=0;i<res.data.length;i++){
        hasbooking.value.push(res.data[i])
      }
      })
      
    })
    
    return {
      columns,
      dataSource,
      hasbooking
    };
  },
});
</script>
<style lang="less">
.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}
</style>