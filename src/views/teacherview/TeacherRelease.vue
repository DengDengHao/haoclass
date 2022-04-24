<template>

  <h1>您的课程</h1><a-button class="editable-add-btn" @click="handleAdd" style="margin-bottom: 8px">Add</a-button>
  <a-table bordered :data-source="dataSource" :columns="columns" rowKey="classnum">
    <!-- <template #name="{ text, record }">
      <div class="editable-cell">
        <div v-if="editableData[record.key]" class="editable-cell-input-wrapper">
          <a-input v-model:value="editableData[record.key].name" @pressEnter="save(record.key)" />
          <check-outlined class="editable-cell-icon-check" @click="save(record.key)" />
        </div>
        <div v-else class="editable-cell-text-wrapper">
          {{ text || ' ' }}
          <edit-outlined class="editable-cell-icon" @click="edit(record.key)" />
        </div>
      </div>
    </template> -->
    <template #operation="{ record }">
      <template v-if="record.RegisStatus=='未报名'">
      <a-popconfirm
        v-if="dataSource.length"
        title="Sure to delete?"
        @confirm="onDelete(record.classnum)"
      >
        <a>删除</a>
      </a-popconfirm>
      </template>
      <template v-if="record.RegisStatus=='已报名'&&record.classcishu>0">
        已开课
      </template>
      <template v-if="record.RegisStatus=='已报名'&&record.classcishu==0">
        <a-popconfirm
        v-if="dataSource.length"
        title="确定结课吗?"
        @confirm="onDeleten(record.classnum)"
      >
        <a>结课</a>
      </a-popconfirm>
      </template>
      <template v-if="record.RegisStatus=='报名中'||record.RegisStatus=='结课中'">
        请等待管理员通过
      </template>
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
handleAdd(){
  /* let datas=this.$store.state.formState.username */
     /*  const newData = {
        key: `${count.value}`,
        name: `Edward King ${count.value}`,
        age: 32,
        address: `London, Park Lane no. ${count.value}`,
      };
      dataSource.value.push(newData); */
      this.$router.push({path:'/teachersub'})
    },
   onDelete(n){
      console.log('当前key为：'+n)
      let data={
        id:n,
        name:this.$store.state.formState.username
      }
      axios.post('/deleteclass/shanchu',qs.stringify(data)).then(res=>{
        if(res.data=='100'){
          this.reload()
          message.info('您已成功删除！')
        }
        else{
          message.info('出现了意外！')
        }
      })
    },
    onDeleten(n){
      console.log('当前key为：'+n)
      let data={
        id:n,
        name:this.$store.state.formState.username
      }
      axios.post('/deleteclass/jieke',qs.stringify(data)).then(res=>{
        if(res.data=='100'){
          this.reload()
          message.info('您已成功删除！')
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
        title: '课程号',
        dataIndex: 'classnum',
        width: '30%',
      },
      {
        title: '课程类别',
        dataIndex: 'classtype',
      },
      {
        title: '课时数',
        dataIndex: 'classcishu',
      },
      {
        title:'课程状态',
        dataIndex:'RegisStatus'
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
    axios.get('/teacherclass',{params:{data:daa.username}}).then(res=>{
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