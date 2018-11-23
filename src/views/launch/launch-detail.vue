<template id="com-dialog" >

  <div class="task-detail">
    <div class="quote-title">客户详情  {{ detailData.sendee }}</div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <div class="main">
       <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">家长姓名：北京石妞妞</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">手机号：15911112222</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">姓名：未知</div></el-col>
      </el-row>
       <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">昵称：北京石妞妞</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">生日：2018-03-10</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">来源渠道：北京石妞妞</div></el-col>
      </el-row>     
       <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">宝宝数量：1</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">收货地址：北京市朝阳区乾玉缘28号大飒飒大师多中心</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">关系：父子</div></el-col>
      </el-row>     
      <el-row>
        备注：大大撒大萨达撒大所大撒大就撒旷达科技萨科技科技大萨达撒多撒多撒多撒多撒大所
      </el-row>    
      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>会员卡</span>
      </div>
      <div class="main">
          <div>
              <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">宝宝姓名：北京石妞妞</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">性别：男</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">昵称：大萨达</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">生日：2018-13-25</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">身高：170cm</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">体重：180kg</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><div class="grid-content bg-purple"><b>门店归属：</b>密集恐惧哦</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple"><b>所属社区：</b>密集恐惧哦</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple"><b>会员卡类型：</b>密集恐惧哦</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><div class="grid-content bg-purple"><b>会员卡状态：</b>密集恐惧哦</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple"><b>办卡时间：</b>密集恐惧哦</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple"><b>失效时间：</b>密集恐惧哦</div></el-col>
              </el-row>     
              <el-row>
                <el-col :span="8"><div class="grid-content bg-purple"><b>会员卡状态：</b>密集恐惧哦</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple"><b>办卡时间：</b>密集恐惧哦</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple"><b>有效期剩余</b>12个月</div></el-col>
              </el-row>                         
          </div>
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


    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>行为记录</span>
      </div>
      <div class="main">
          <el-row>2018-09-21 11:00    兴隆家园店   金卡    3000元 </el-row>
          <el-row>2018-09-21 11:00    兴隆家园店   金卡    3000元 </el-row>
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
