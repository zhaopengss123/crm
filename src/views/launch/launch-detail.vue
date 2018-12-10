<template id="com-dialog" >

  <div class="task-detail">
    <div class="quote-title">客户详情  {{ detailData.sendee }}</div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>家长信息</span>
      </div>
      <div class="main">
       <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">姓名：{{userDetail.parentName}}</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">手机号：{{userDetail.mobilePhone}}</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">宝宝数量：{{userDetail.babyNumber}}</div></el-col>
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
                <el-col :span="8"><div class="grid-content bg-purple">宝宝姓名：{{userDetail.name}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">性别：{{userDetail.sex}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">昵称：{{userDetail.nick}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><div class="grid-content bg-purple">生日：{{userDetail.birthday}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">身高：{{userDetail.height?userDetail.height+'cm':''}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple">体重：{{userDetail.weight?userDetail.weight+'kg':''}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><div class="grid-content bg-purple"><b>门店归属：</b>{{userDetail.shopName}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple"><b>所属社区：</b>{{userDetail.communityName}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple"><b>会员卡类型：</b>{{userDetail.cardTypeName}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><div class="grid-content bg-purple"><b>会员卡状态：</b>{{userDetail.recordStatus?(userDetail.recordStatus==0?'未使用':(userDetail.recordStatus==1?'使用中':userDetail.recordStatus==2?'即将过期':(userDetail.recordStatus==3?'已过期':''))):''}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple"><b>办卡时间：</b>{{userDetail.createDate}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple"><b>失效时间：</b>{{userDetail.expireDate}}</div></el-col>
              </el-row>     
              <el-row>
                <el-col :span="8"><div class="grid-content bg-purple"><b>有效期剩余：</b>{{userDetail.differenceMonth}}</div></el-col>
              </el-row>                         
          </div>
      </div>
    </el-card>  

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>标签信息</span>
      </div>
      <div class="bq_main">
          
          <el-tag v-if="labelList.length"  v-for="(list, fileIndex) in labelList" :key="fileIndex">{{list.labelName}}</el-tag>
        
          <div class="bq_noList" v-else>暂无标签</div>
      </div>
    </el-card>


    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>行为记录</span>
      </div>
      <!-- @tab-click="handleClick" -->
      <el-tabs v-model="behaviorTab" type="card" >
        <el-tab-pane label="商品购买记录" name="0">
            <div class="main">
                <el-row v-for="(item,index) in commodityToken" :key="index">{{ item.orderShopName	}}   {{item.orderProductName}}   {{item.activityPrice}}元 </el-row>
                <el-row v-if="!commodityToken.length" style="color:#ccc; text-align:center;">暂无数据 </el-row>
            </div>
        </el-tab-pane>
        <el-tab-pane label="福利兑换记录" name="1">
             <div class="main">
                <el-row v-for="(item,index) in welfareTakenExchange" :key="index">{{item.reserveTime}}  {{ item.welfareShopName	}}   {{item.welfareProductName}}   {{item.productPrice}}元 </el-row>
                <el-row v-if="!welfareTakenExchange.length" style="color:#ccc; text-align:center;">暂无数据 </el-row>
            </div>
        </el-tab-pane>
        <el-tab-pane label="福利购买记录" name="2">
             <div class="main">
                <el-row v-for="(item,index) in welfareTakenBuy" :key="index">{{item.reserveTime}}  {{ item.welfareShopName	}}   {{item.welfareProductName}}   {{item.productPrice}}元 </el-row>
                <el-row v-if="!welfareTakenBuy.length" style="color:#ccc; text-align:center;">暂无数据 </el-row>
            </div>
        </el-tab-pane>
        <el-tab-pane label="消费记录" name="3">
             <div class="main">
              <el-row v-for="(item,index) in consumptionTaken" :key="index">{{item.consumeDate}}  {{ item.shopName	}}  {{item.consumption}}元 </el-row>
                <el-row v-if="!consumptionTaken.length" style="color:#ccc; text-align:center;">暂无数据 </el-row>
            </div>
        </el-tab-pane>
        <el-tab-pane label="预约记录" name="4">
            <div class="main">
                <el-row v-for="(item,index) in reserveTaken" :key="index">{{item.reserveDate}}  {{ item.reserveShopName	}}</el-row>
                <el-row v-if="!reserveTaken.length" style="color:#ccc; text-align:center;">暂无数据 </el-row>
            </div>
        </el-tab-pane>
      </el-tabs>
 
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
      labelList:[],
        detailData:{},
        divideParam: '1',
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
          }],
          userDetail:{},
          behaviorTab:0,
          commodityToken: [],
          welfareTakenExchange: [],
          welfareTakenBuy: [],
          consumptionTaken: [],
          reserveTaken: []
    };
  },
  methods: {
    //任务回显
    getData(){
      let id = this.$route.params.id;
      console.log(id);
      
      this.axios.post('/store/memberDetails', { memberId: id }).then(res => {
          this.userDetail = res.data.result.member;
          this.divideParam = res.data.result.member.divideParam;
      }).catch(error => { //捕获失败
      });
       //商品购买记录
       this.axios.post('/store/commodityToken', { memberId: id }).then(res => {
          this.commodityToken = res.data.result.commodityToken;
      }).catch(error => { //捕获失败
      })
       //福利兑换记录
       this.axios.post('/store/welfareTaken', { memberId: id,status: 0 }).then(res => {
          this.welfareTakenExchange = res.data.result.welfareTaken;
      }).catch(error => { //捕获失败
      })
       //福利购买记录
       this.axios.post('/store/welfareTaken', { memberId: id,status: 0 }).then(res => {
          this.welfareTakenBuy = res.data.result.welfareTaken;
      }).catch(error => { //捕获失败
      })
      //消费记录
       this.axios.post('/store/consumptionTaken', { memberId: id , divideParam: this.divideParam }).then(res => {
          this.consumptionTaken = res.data.result.consumptionTaken;
      }).catch(error => { //捕获失败
      })
      //预约记录
       this.axios.post('/store/reserveTaken', { memberId: id }).then(res => {
          this.reserveTaken = res.data.result.reserveTaken;
      }).catch(error => { //捕获失败
      }) 
      //标签信息    
      this.axios.post('/labelEditing/memberLabel', { memberId: id }).then(res => {
        this.labelList = res.data.result;
      }).catch(error => { //捕获失败
      })     
    },
    getRecordList(){
 
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
