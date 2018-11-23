<template id="com-dialog" >

  <div class="task-detail">
    <div class="quote-title">门店详情  {{ detailData.sendee }}</div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <div class="main">
       <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">门店名称：北京石妞妞</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">门店名称：北京石妞妞</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">门店名称：北京石妞妞</div></el-col>
      </el-row>
       <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">门店名称：北京石妞妞</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">门店名称：北京石妞妞</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">门店名称：北京石妞妞</div></el-col>
      </el-row>      
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>潜在客户列表</span>
      </div>
      <div class="main">
           <template>
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="姓名">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="手机号">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="宝宝类型">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="关系">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="来源渠道">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="身份">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="近期购买时间">
                </el-table-column>      
                <el-table-column
                  prop="address"
                  label="近期APP登陆">
                </el-table-column> 
                <el-table-column
                  prop="address"
                  label="近期预约时间">
                </el-table-column>                                                                                           
              </el-table>
            </template>
      </div>
    </el-card>  

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>会员列表</span>
      </div>
      <div class="main">
           <template>
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="姓名">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="手机号">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="宝宝类型">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="关系">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="来源渠道">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="身份">
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="近期购买时间">
                </el-table-column>      
                <el-table-column
                  prop="address"
                  label="近期APP登陆">
                </el-table-column> 
                <el-table-column
                  prop="address"
                  label="近期预约时间">
                </el-table-column>                                                                                           
              </el-table>
            </template>
      </div>
    </el-card> 

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>标签信息</span>
      </div>
      <div class="bq_main">
          
          <el-tag v-if="tableData.length"  v-for="(list, fileIndex) in tableData.length" :key="fileIndex">标签一</el-tag>
        
          <div class="bq_noList" v-else>暂无标签</div>
      </div>
    </el-card>


  </div>
</template>
<style lang="less">
.task-detail{
  .main .el-row{
    padding-bottom: 20px;
  }
  .main:first-child{
    font-size: 14px;
  }
  .quote-title {
    margin-bottom: 20px;
    padding: 12px 15px;
    line-height: 22px;
    border-left: solid 5px #00a2ca;
    border-radius: 0 2px 2px 0;
    background-color: #f2f2f2;
  }
 .box-card{
   margin-top: 30px;
 }
 .box-card:last-child{
   margin-bottom: 200px;
 }
 .bq_main{
   margin-bottom: 40px;
 }
 .bq_noList{
   color: #ccc;
   font-size: 14px;
   text-align: center; 

    }
.el-tag{ 
  float: left;
  margin-left: 10px;
  }
}
</style>

<script>
export default {
  // components: {
  //   comDialog
  // },
  data() {
    return {
        detailData:{},
         tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
    };
  },
  methods: {
    //任务回显
    getData(){
      let id = this.$route.params.id;
      console.log(id);
 
    }

  },

  mounted(){
    this.getData(); 
 
  },
  //路由监听
  watch:{
    "$route.params.id": "getData"
  },

};
</script>
