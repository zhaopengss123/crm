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
        <el-col :span="8"><div class="grid-content bg-purple">手机号：<span style="color:#409EFF; cursor:pointer" v-if="!seePhone" @click="SeeUserPhone()">查看</span>{{seePhone ? userDetail.mobilePhone: ''}}</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">宝宝数量：{{userDetail.babyNumber}}</div></el-col>
      </el-row>    
 
      </div>
    </el-card>

    <el-card class="box-card" v-if="userDetail.memberInfo">
      <div slot="header" class="clearfix">
        <span>会员卡</span>
      </div>
      <div class="main mainCard" style="font-size:14px;" v-for="(item,index) in userDetail.memberInfo" :key ="index">
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
                <el-col :span="8"><div class="grid-content bg-purple"><b>会员卡类型：</b>{{item.cardTypeName}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="8"><div class="grid-content bg-purple"><b>会员卡状态：</b>{{item.recordStatus?(item.recordStatus==0?'未使用':(item.recordStatus==1?'使用中':item.recordStatus==2?'即将过期':(item.recordStatus==3?'已过期':''))):''}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple"><b>办卡时间：</b>{{item.createDate}}</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple"><b>失效时间：</b>{{item.expireDate}}</div></el-col>
              </el-row>     
              <el-row>
                <el-col :span="8"><div class="grid-content bg-purple"><b>有效期剩余：</b>{{item.differenceMonth>30?parseInt(item.differenceMonth/30)+'月'+ item.differenceMonth%30 + '天' : item.differenceMonth + '天' }}</div></el-col>
                 <el-col :span="8"><div class="grid-content bg-purple"><b>会员卡剩余卡次：</b>{{item.cardTimes? item.cardTimes :0 }}次</div></el-col>
              </el-row>                         
          </div>
      </div>
    </el-card>  

    <el-card class="box-card" v-else>
      <div slot="header" class="clearfix">
        <span>宝宝信息</span>
      </div>
      <div class="main mainCard" style="font-size:14px;" >
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
               
              </el-row>
                          
          </div>
      </div>
    </el-card>  


    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>标签信息</span>
      </div>
      <div class="bq_main">
          
          <el-tag style="margin-bottom:20px;" v-if="labelList.length"  v-for="(list, fileIndex) in labelList" :key="fileIndex">{{list}}</el-tag>
        
          <div class="bq_noList"  v-if="!labelList.length" >暂无标签</div>
      </div>
    </el-card>


    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>行为记录</span>
      </div>
      <!-- @tab-click="handleClick" -->
      <el-tabs v-model="behaviorTab" type="card"  @tab-click="tabClick"  >
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
      
      <div class="pagination"><el-pagination background layout="prev, pager, next" :total="total" @current-change="pageChange" :current-page.sync="pageNum"></el-pagination></div>
    <div class="total">共{{total? total : 0}}条数据</div>
    </el-card>

  </div>
</template>
<style lang="less">
.task-detail{
  .total{
    color: #666;
    font-size: 14px;
    float: right;
    margin: 25px 0;
    margin-right: 20px;
  }
  .pagination{
    float: right;
  }
  .main .el-row{
    padding-bottom: 20px;
  }
  .main{
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
.pagination{
   float: right;
   margin-bottom: 20px;
}
.mainCard{
  margin: 20px 0;
  padding-bottom: 10px;
  border-bottom: solid 1px #eee;
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
         tableData: [],
          userDetail:{},
          behaviorTab:0,
          commodityToken: [],
          welfareTakenExchange: [],
          welfareTakenBuy: [],
          consumptionTaken: [],
          reserveTaken: [],
          pageNum: 1,
          total:0,
          id:0,
          tableIndex:0,
          pageSize:10,
          seePhone: false,
    };
  },
  methods: {
    SeeUserPhone(){
        this.seePhone = true;
    },
    //任务回显
    getData(){
      let id = this.$route.params.id;
      this.id = id;
      
      this.axios.post('/store/memberDetails', { memberId: id }).then(res => {
          this.userDetail = res.data.result.member;
          this.divideParam = res.data.result.member.divideParam;

        //消费记录
        this.axios.post('/store/consumptionTaken', { memberId: id , divideParam: this.divideParam ,  pageNum: 1  }).then(res => {
            this.consumptionTaken = res.data.result.consumptionTaken;
        }).catch(error => { //捕获失败
        })

     }).catch(error => { //捕获失败
      });
       //商品购买记录
       this.axios.post('/store/commodityToken', { memberId: id, pageNum: 1, pageSize: this.pageSize }).then(res => {
          this.commodityToken = res.data.result.commodityToken;
      }).catch(error => { //捕获失败
      })
       //福利兑换记录
       this.axios.post('/store/welfareTaken', { memberId: id,status: 0 , pageNum: 1 }).then(res => {
          this.welfareTakenExchange = res.data.result.welfareTaken;
      }).catch(error => { //捕获失败
      })
       //福利购买记录
       this.axios.post('/store/welfareTaken', { memberId: id,status: 1 , pageNum: 1 }).then(res => {
          this.welfareTakenBuy = res.data.result.welfareTaken;
      }).catch(error => { //捕获失败
      })
    
      //预约记录
       this.axios.post('/store/reserveTaken', { memberId: id ,  pageNum: 1 }).then(res => {
          this.reserveTaken = res.data.result.reserveTaken;
      }).catch(error => { //捕获失败
      }) 
      //标签信息    
      this.axios.post('/store/memberLabelInfo', { memberId: id }).then(res => {
        this.labelList = res.data.result;
      }).catch(error => { //捕获失败
      })     
    },
    getRecordList(){
 
    },
    pageChange(val){
      this.pageNum = val;
      console.log(this.tableIndex);
        if( this.tableIndex == 0 ){
            this.getCommodityToken();
        }else if(this.tableIndex==1){
            this.getwelfareTaken();
        }else if(this.tableIndex==2){
            this.getWelfareTakens();
        }else if(this.tableIndex==3){
            this.getConsumptionTaken();
        }else if(this.tableIndex==4){
            this.getReserveTaken();
        }
    },
    tabClick(data){
      this.tableIndex = data.index;
      this.pageNum = 1;

 
        if( data.index == 0 ){
            this.getCommodityToken();
        }else if(data.index==1){
            this.getwelfareTaken();
        }else if(data.index==2){
            this.getWelfareTakens();
        }else if(data.index==3){
            this.getConsumptionTaken();
        }else if(data.index==4){
            this.getReserveTaken();
        }
    },
    getCommodityToken(){
      //商品购买记录
       this.axios.post('/store/commodityToken', { memberId: this.id, pageNum: this.pageNum, pageSize: this.pageSize }).then(res => {
          this.commodityToken = res.data.result.commodityToken;
          this.total = res.data.result.count;
      }).catch(error => { //捕获失败
      })
    },
    getwelfareTaken(){
        //福利兑换记录
       this.axios.post('/store/welfareTaken', { memberId: this.id,status: 0 , pageNum: this.pageNum, pageSize: this.pageSize  }).then(res => {
          this.welfareTakenExchange = res.data.result.welfareTaken;
          this.total = res.data.result.count;
      }).catch(error => { //捕获失败
      })
    },
    getWelfareTakens(){
       //福利购买记录
       this.axios.post('/store/welfareTaken', { memberId: this.id,status: 1 , pageNum: this.pageNum, pageSize: this.pageSize }).then(res => {
          this.welfareTakenBuy = res.data.result.welfareTaken;
          this.total = res.data.result.count;
      }).catch(error => { //捕获失败
      })
      },
    getConsumptionTaken(){
      //消费记录
      this.axios.post('/store/consumptionTaken', { memberId: this.id , divideParam: this.divideParam ,  pageNum: this.pageNum, pageSize: this.pageSize   }).then(res => {
          this.consumptionTaken = res.data.result.consumptionTaken;
          this.total = res.data.result.count;
      }).catch(error => { //捕获失败
      })
    },
    getReserveTaken(){
      //预约记录
       this.axios.post('/store/reserveTaken', { memberId: this.id ,  pageNum: this.pageNum, pageSize: this.pageSize  }).then(res => {
          this.reserveTaken = res.data.result.reserveTaken;
          this.total = res.data.result.count;
      }).catch(error => { //捕获失败
      }) 
    },
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
