<template>
<a-tabs v-model:activeKey="activeKey" @change="put(activeKey)">
    <a-tab-pane key="1" tab="学生管理">
      <a-table bordered :data-source="dataSource1" :columns="columns1" rowKey="studentname">
    <template #operation="{ record }">
        <template v-if="isS(record.studentname)">
      该学生还有课程
      </template>
      <template v-else>
        <a-popconfirm
        v-if="dataSource1.length"
        title="确定删除该学生吗?"
        @confirm="onDelete1(record.studentname)"
      >
        <a>删除</a>
      </a-popconfirm>
      </template>
      </template>
  </a-table>
    </a-tab-pane>
    <a-tab-pane key="2" tab="老师管理">
       <a-table bordered :data-source="dataSource2" :columns="columns2" rowKey="teachername">
    <template #operation="{ record }">
      <template v-if="isT(record.teachername)">
      该老师还有课程
      </template>
      <template v-else>
        <a-popconfirm
        v-if="dataSource2.length"
        title="确定删除该老师吗?"
        @confirm="onDelete2(record.teachername)"
      >
        <a>删除</a>
      </a-popconfirm>
      </template>
      </template>
  </a-table>
    </a-tab-pane>
  </a-tabs>
    
</template>

<script>
import { /* computed, */ defineComponent/* , reactive */, ref ,onMounted,getCurrentInstance} from 'vue';
/* import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue'; */
/* import { cloneDeep } from 'lodash-es'; */
import axios from 'axios'
import qs from 'qs'
import { message } from 'ant-design-vue';
export default defineComponent({
  inject:['reload'],
  components: {
   /*  CheckOutlined,
    EditOutlined, */
  },
methods:{
  put(n){
    console.log('当前TAB的KEY为'+n)
    
    sessionStorage.setItem('key1',n)
  },
    isS(n){
     for(let i=0;i<this.studentlist.length;i++){
       if(n==this.studentlist[i].studentname)
       return true;
     }
     return false;
    },
    isT(n){
       for(let i=0;i<this.teacherlist.length;i++){
       if(n==this.teacherlist[i].teachername)
       return true;
     }
     return false;
    },
   onDelete1(n){
      let data={
        namee:n
      }
      axios.post('/deleteuser/student',qs.stringify(data)).then(res=>{
        if(res.data=='100'){
          this.reload()
          message.info('已删除该学生！')
        }
        else{
          message.info('出现了意外！')
        }
      })
    },
    onDelete2(n){
      let data={
        namee:n
      }
      axios.post('/deleteuser/teacher',qs.stringify(data)).then(res=>{
        if(res.data=='100'){
          this.reload()
          message.info('删除该老师！')
        }
        else{
          message.info('出现了意外！')
        }
      })
    }
},
 data() {
    return {
      activeKey: ref('1')
    };
  },
  setup() {
    const columns1 = [
      {
        title: '用户号',
        dataIndex: 'index',
      },{
        title: '用户名',
        dataIndex: 'studentname',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        slots: {
          customRender: 'operation',
        },
      },
    ];
    const columns2 = [
      {
        title: '用户号',
        dataIndex: 'index',
      },{
        title: '用户名',
        dataIndex: 'teachername',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        slots: {
          customRender: 'operation',
        },
      },
    ];
 
    const dataSource1 = ref([
    ]);
    const dataSource2 = ref([
    ]);
    const studentlist=ref([
    ]);
    const teacherlist=ref([
    ]);

    onMounted(()=>{
    let ins = getCurrentInstance();
    if(sessionStorage.getItem('key1')){
      ins.data.activeKey=sessionStorage.getItem('key1')
    }
    else{
       ins.data.activeKey='1';
    }
    let  datasql;
    /* let da=localStorage.getItem('user');
    let daa=JSON.parse(da) */
    axios.get('/selectuser/student'/* ,{params:{data:daa.username}} */).then(res=>{
      datasql=JSON.parse(JSON.stringify(res.data));
      for(let i=0;i<datasql.length;i++){
        console.log(datasql[i])
        dataSource1.value.push(datasql[i])
      }
      
    })
    axios.get('/selectuser/teacher'/* ,{params:{data:daa.username}} */).then(res=>{
      datasql=JSON.parse(JSON.stringify(res.data));
      for(let i=0;i<datasql.length;i++){
        console.log(datasql[i])
        dataSource2.value.push(datasql[i])
      }
      
    })
    axios.get('/selectuser/querys'/* ,{params:{namee:n}} */).then(res=>{
          datasql=JSON.parse(JSON.stringify(res.data));
      for(let i=0;i<datasql.length;i++){
        console.log(datasql[i])
        studentlist.value.push(datasql[i])
      }
      console.log('这是还有课程的学生列表'+studentlist.value)
      })

      axios.get('/selectuser/queryt'/* ,{params:{namee:n}} */).then(res=>{
            datasql=JSON.parse(JSON.stringify(res.data));
      for(let i=0;i<datasql.length;i++){
        console.log(datasql[i])
        teacherlist.value.push(datasql[i])
      }
      console.log('这是还有课程的老师列表'+teacherlist.value)
        })


    })
    
    return {
      studentlist,teacherlist,
      columns1,
      columns2,
      dataSource1,
      dataSource2,
      /* activeKey: ref('1') */
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