<template>
<a-tabs v-model:activeKey="activeKey" @change="put(activeKey)">
    <a-tab-pane key="1" tab="预约管理">
      <a-table bordered :data-source="dataSource1" :columns="columns" rowKey="classnum">
    <template #operation="{ record }">
      <a-popconfirm
        v-if="dataSource1.length"
        title="确定通过预约吗?"
        @confirm="onDelete1(record.classnum)"
      >
        <a>确认</a>
      </a-popconfirm>
      </template>
  </a-table>
    </a-tab-pane>
    <a-tab-pane key="2" tab="待处理预约">
       <a-table bordered :data-source="dataSource2" :columns="columns" rowKey="classnum">
    <template #operation="{ record }">
      <a-popconfirm
        v-if="dataSource2.length"
        title="确定通过结束此次预约课程吗?"
        @confirm="onDelete2(record.classnum)"
      >
        <a>结课</a>
      </a-popconfirm>
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
    sessionStorage.setItem('key',n)
  },
   onDelete1(n){
      let data={
        num:n
      }
      axios.post('/dealbooking/deal',qs.stringify(data)).then(res=>{
        if(res.data=='100'){
          this.reload()
          message.info('已接受！')
        }
        else{
          message.info('出现了意外！')
        }
      })
    },
    onDelete2(n){
      let data={
        num:n
      }
      axios.post('/dealbooking/delete',qs.stringify(data)).then(res=>{
        if(res.data=='100'){
          this.reload()
          message.info('已结课！')
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
    const columns = [
      {
        title: '预约号',
        dataIndex: 'bookingnum',
      },{
        title: '课程号',
        dataIndex: 'classnum',
      },
      {
        title: '课程时间',
        dataIndex: 'daytime',
      },
      {
        title: '学生姓名',
        dataIndex: 'studentname',
      },
      {
        title: '上课方式',
        dataIndex: 'classway',
      },
      {
        title:'学生备注',
        dataIndex:'note'
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
    onMounted(()=>{
    let ins = getCurrentInstance();
    if(sessionStorage.getItem('key')){
      ins.data.activeKey=sessionStorage.getItem('key')
    }
    else{
       ins.data.activeKey='1';
    }
    
    let  datasql;
    let da=localStorage.getItem('user');
    let daa=JSON.parse(da)
    axios.get('/selectbooking/wei',{params:{data:daa.username}}).then(res=>{
      datasql=JSON.parse(JSON.stringify(res.data));
      for(let i=0;i<datasql.length;i++){
        console.log(datasql[i])
        dataSource1.value.push(datasql[i])
      }
      
    })
    axios.get('/selectbooking/yishang',{params:{data:daa.username}}).then(res=>{
      datasql=JSON.parse(JSON.stringify(res.data));
      for(let i=0;i<datasql.length;i++){
        console.log(datasql[i])
        dataSource2.value.push(datasql[i])
      }
      
    })
    })
    
    return {
      columns,
      dataSource1,
      dataSource2,
      /* activeKey: ref(sessionStorage.getItem('key')), */
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