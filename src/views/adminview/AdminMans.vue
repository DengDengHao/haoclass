<template>
    <h1>报名管理</h1>
    <a-table bordered :data-source="dataSource" :columns="columns" rowKey="classnum">
    <template #operation="{ record }">
      <a-popconfirm
        v-if="dataSource.length"
        title="确定通过报名吗?"
        @confirm="onDelete(record.classnum,record.teachername,record.studentname)"
      >
        <a>确认</a>
      </a-popconfirm>
      </template>
  </a-table>
</template>

<script>
import { /* computed, */ defineComponent/* , reactive */, ref ,onMounted} from 'vue';
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
   onDelete(n,t,s){
      let data={
        id:n,
        te:t,
        st:s
      }
      axios.post('/passsign',qs.stringify(data)).then(res=>{
        if(res.data=='100'){
          this.reload()
          message.info('已通过！')
        }
        else{
          message.info('出现了意外！')
        }
      })
    }
},

  setup() {
    const columns = [
      {
        title: '报名号',
        dataIndex: 'signnum',
        width: '30%',
      },{
        title: '课程号',
        dataIndex: 'classnum',
      },
      {
        title: '课程类别',
        dataIndex: 'classtype',
      },
      {
        title: '老师姓名',
        dataIndex: 'teachername',
      },
      {
        title:'学生姓名',
        dataIndex:'studentname'
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
    /* let da=localStorage.getItem('user');
    let daa=JSON.parse(da) */
    axios.get('/selectsign'/* ,{params:{data:daa.username}} */).then(res=>{
      datasql=JSON.parse(JSON.stringify(res.data));
      for(let i=0;i<datasql.length;i++){
        dataSource.value.push(datasql[i])
      }
    })
    })
    
    return {
      columns,
      dataSource
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