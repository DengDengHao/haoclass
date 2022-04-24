<template>
<div class="menu">
  <a-layout class="mainlayout">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="logo" style="height:64px;text-align:center;line-height:64px">
        <h1 style="color:#FFFFFF">HAO音乐</h1>
      </div>
      <a-menu :selectedKeys="[$route.path]" theme="dark" mode="inline" @click="jumpmenu">
        <a-menu-item key='/teacherrelease'>
          <video-camera-outlined />
          <span>课程发布</span>
        </a-menu-item>
        <a-menu-item key='/teacherdeal'>
          <upload-outlined />
          <span>预约管理</span>
        </a-menu-item>
         <a-menu-item key='/teacherworktable'>
          <user-outlined />
          <span>个人中心</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 10">
        <menu-unfold-outlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
          style="left:15px"
        />
        <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" style="left:15px"/>
        <a-button type="primary" style="float:right;top:15px;" @click="logout">登出</a-button>
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
       <router-view/>
      </a-layout-content>
    </a-layout>
  </a-layout>
</div>
</template>
<script>
import { message } from 'ant-design-vue';
import { UserOutlined, VideoCameraOutlined, UploadOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  methods:{
jumpmenu(menu){
  this.$router.push(menu.key)
},
logout(){
  this.$store.commit('logout');
  this.$router.push('/');
  message.info('已成功登出！');
}
  },
  setup() {
    const value = ref();
    const onPanelChange = (value, mode) => {
      console.log(value, mode);
    };
    return {
      value,
      onPanelChange,
      selectedKeys: ref(['1']),
      collapsed: ref(false),
      
    };
  },

});
</script>
<style>
.menu{
  height: 100vh; 
}
.mainlayout{
   height: 100%; 
  }
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>