<template>
  <div class="menubar" :class="{'active' : menuActive}">
    <el-menu
      default-active="/home/tasklist" 
      @open="handleOpen" 
      router 
      :collapse="menuActive"
      @close="handleClose"
      @select="handSelect"
      >
     <el-menu-item index="/home/LaunchWork">
        <i class="el-icon-cus-survey"></i>
        <span slot="title" >客户管理</span>
      </el-menu-item>   

      <el-submenu index="/home/launchWork" >
        <template slot="title"><i class="el-icon-message"></i><span slot="title">回访名单</span></template>
        <div v-for="(item,index) in list" :key="index"><el-menu-item  v-bind:index="'/home/visit/'+item.id">{{ item.name }}</el-menu-item></div>
      </el-submenu>



    </el-menu>
  </div>
</template>
<script>
export default {
  name: "Menu",
  data() {
    return {
      isCollapse: true,
      list:[]
    };
  },
  computed: {
    menuActive () {
      return this.$store.state.MenuStore.menuActive
    }
  },
  methods: {
    getData(){
        this.axios
          .post("/visit/selectVisitList", { })
          .then(res => {
            this.list = res.data.result;
          })
          .catch(error => {
            //捕获失败
          })
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handSelect(key, keyPath){
      console.log(key, keyPath);
    }
  },
    mounted() {
      this.getData();
  },
};
</script>

<style lang="less" scoped>
@import "~@less/global.less";
.el-menu {
  height: 100%;
}
.menubar {
  width: @menu-width;
  height: 100%;
  padding-top: @header-height + 1;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 8;
  overflow-y: auto;
  &.active{
    width: 64px;
  }


}

.el-submenu__title i,
.el-menu-item i {


  color: #333;
}
.el-submenu .el-menu-item{
  overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;
}
.el-menu-item.is-active i {
  color: inherit;
}
</style>
