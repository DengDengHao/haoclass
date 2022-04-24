<template>
  <router-view v-if="isRouterAlive"/>
</template>
<script>
// 入口组件
export default {
  name: 'App',
  provide(){
		return{
			reload:this.reload
		}
	},
	data(){
		return{
			isRouterAlive:true
		}
	},
	methods: {
		reload() {
			this.isRouterAlive=false
			this.$nextTick(function(){
			this.isRouterAlive=true
			})
      console.log('刷新页面！')
		}
	},
  created() {
    /* sessionStorage.setItem('key',1); */
    if (localStorage.getItem('user')) {
      let a=JSON.parse(localStorage.getItem('user'))
      /* this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          a
        )
      ) */
      this.$store.commit('login',a)
    }
    
    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    // beforeunload事件在页面刷新时先触发
    /* window.addEventListener('beforeunload', () => {
      localStorage.setItem('user', this.$store.state.formState)
    }) */
  },
}
</script>
