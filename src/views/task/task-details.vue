<template id="com-dialog" >

  <div class="task-detail">
    <div class="quote-title">门店详情  {{ detailData.sendee }}</div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <div class="main">
       <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">门店名称：{{detailData.shopName}}</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">门店代码：{{detailData.shopCode}}</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">门店缩写：{{detailData.shortName}}</div></el-col>
      </el-row>
       <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">加盟方式：{{detailData.type == 0 ? '加盟店':(detailData.type == 1?'直营店':'其他' ) }}</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">门店级别：{{detailData.level}}</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">门店类型：{{detailData.shopType}}</div></el-col>
      </el-row>    
       <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">门店品牌：{{detailData.shopBrand}}</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">详细地址：{{detailData.shopAddress}}</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">门店面积：{{detailData.shopArea}}</div></el-col>
      </el-row>      
       <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">电费单价：{{detailData.electricityPrice}}</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">水费单价：{{detailData.waterPrice}}</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">房租单价：{{detailData.housePrice}}</div></el-col>
      </el-row> 
       <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">店长数：{{detailData.managerNum}}</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">人员成本：{{detailData.employeePrice}}</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">其他成本：{{detailData.otherPrice}}</div></el-col>
      </el-row>   
       <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">锅炉信息：{{detailData.boilerType}}</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">开业时间：{{detailData.openDate}}</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">试营业截止日期：{{detailData.probationDate}}</div></el-col>
      </el-row>
       <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">门店到期日：{{detailData.expirationDate}}</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">门店电话：{{detailData.shopTel}}</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple">营业执照号：{{detailData.businessLicenseNum}}</div></el-col>
      </el-row>   
       <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">省：{{detailData.province}}</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">市：{{detailData.city}}</div></el-col>
          <el-col :span="8"><div class="grid-content bg-purple">区：{{detailData.area}}</div></el-col>       
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
                :data="memberList"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="姓名">
                </el-table-column>
                <el-table-column
                  prop="mobilePhone"
                  label="手机号">
                </el-table-column>
                <el-table-column
                  label="宝宝类型">
                    <template slot-scope="scope">
                        {{scope.row.babyNumber == 0||scope.row.babyNumber == 1?'一胞胎':(scope.row.babyNumber == 2?'双胞胎':(scope.row.babyNumber == 3?'三胞胎':scope.row.babyNumber+'胞胎'))}}
                    </template>
                </el-table-column>
                <el-table-column
                  prop="source"
                  label="来源渠道">
                </el-table-column>
                <el-table-column
                  label="身份">
                    <template slot-scope="scope">
                        {{scope.row.havaCard == 0 ? '非会员': '会员'}}
                    </template>                  
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="近期购买时间">
                </el-table-column>      
                <el-table-column
                  prop="loginDate"
                  label="近期APP登录">
                </el-table-column> 
                <el-table-column
                  prop="reserveDate"
                  label="近期预约时间">
                </el-table-column>                                                                                           
              </el-table>
            </template>
      </div>
      <div class="pagination"><el-pagination background layout="prev, pager, next" :total="memberTotal" @current-change="memberChange" :current-page.sync="memberPageNum"></el-pagination></div>
    </el-card>  

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>会员列表</span>
      </div>
      <div class="main">
           <template>
              <el-table
                :data="memberInsiderList"
                style="width: 100%">
                          <el-table-column
                  prop="name"
                  label="姓名">
                </el-table-column>
                <el-table-column
                  prop="mobilePhone"
                  label="手机号">
                </el-table-column>
                <el-table-column
                  prop="babyNumber"
                  label="宝宝类型">
                    <template slot-scope="scope">
                        {{scope.row.babyNumber == 0||scope.row.babyNumber == 1?'一胞胎':(scope.row.babyNumber == 2?'双胞胎':(scope.row.babyNumber == 3?'三胞胎':scope.row.babyNumber+'胞胎'))}}
                    </template>                  
                </el-table-column>
                <el-table-column
                  prop="source"
                  label="来源渠道">
                </el-table-column>
                <el-table-column
                  label="身份">
                    <template slot-scope="scope">
                        {{scope.row.havaCard == 0 ? '非会员': '会员'}}
                    </template>                   
                </el-table-column>
                <el-table-column
                  prop="address"
                  label="近期购买时间">
                </el-table-column>      
                <el-table-column
                  prop="loginDate"
                  label="近期APP登录">
                </el-table-column> 
                <el-table-column
                  prop="reserveDate"
                  label="近期预约时间">
                </el-table-column>                                                                                           
              </el-table>
            </template>
      </div>
      <div class="pagination"><el-pagination background layout="prev, pager, next" :total="memberInsiderTotal" @current-change="memberInsiderChange" :current-page.sync="memberInsiderPageNum"></el-pagination></div>      
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
  .main .el-col{
    padding: 0 5px;
  }
  .pagination{
    margin-top: 20px;
    text-align: right;
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
        memberTotal:1,
        memberPageNum:1,
        memberInsiderTotal:1,
        memberInsiderPageNum: 1,
        tableData: [],
        memberList: [],
        memberInsiderList:[]
    };
  },
  methods: {
    //任务回显
    getData(){
      let id = this.$route.params.id;
      let arrNum = ['一','二','三','四','五','六'];
      this.axios.post('/store/storeDetails', { storeId: id }).then(res => {
        if(res.data.result.store.length){ this.detailData = res.data.result.store[0] };
        this.memberList = res.data.result.member; 
        this.memberList.map(item=>{
          item.babyNumber  =  arrNum[item.babyNumber-1] + '胞胎';
          item.havaCard  =  item.havaCard == 0 ? item.havaCard = '非会员' : '会员';
        })
        this.memberInsiderList = res.data.result.memberInsider;
        this.memberInsiderList.map(item=>{
          item.babyNumber  =  arrNum[item.babyNumber-1] + '胞胎';
          item.havaCard  =  item.havaCard == 0 ? item.havaCard = '非会员' : '会员';
        })
      }).catch(error => { //捕获失败
      })
 
    },
    getstoreMember(){
      let id = this.$route.params.id;
        this.axios.post('/store/storeMember', { storeId: id, pageNum: this.memberPageNum }).then(res => {
        this.memberTotal = res.data.result.countMember;
        this.memberList = res.data.result.member; 
        this.memberList.map(item=>{
          item.babyNumber  =  arrNum[item.babyNumber-1] + '胞胎';
          item.havaCard  =  item.havaCard == 0 ? item.havaCard = '非会员' : '会员';
        })
      }).catch(error => { //捕获失败
      })
    },
    memberChange(val){
      this.memberPageNum= val;
      this.getstoreMember();
    },
    getstoreMemberInsider(){
        let id = this.$route.params.id;
        this.axios.post('/store/storeMemberInsider', { storeId: id, pageNum: this.memberInsiderPageNum  }).then(res => {
        this.memberInsiderTotal = res.data.result.countMemberInsider;
        this.memberInsiderList = res.data.result.memberInsider; 
        this.memberInsiderList.map(item=>{
          item.babyNumber  =  arrNum[item.babyNumber-1] + '胞胎';
          item.havaCard  =  item.havaCard == 0 ? item.havaCard = '非会员' : '会员';
        })
      }).catch(error => { //捕获失败
      })      
    },
    memberInsiderChange(val){
      this.memberInsiderPageNum= val;
      this.getstoreMemberInsider();
    },
    
  },

  mounted(){
    this.getData(); 
    this.getstoreMember();
    this.getstoreMemberInsider();
  },
  //路由监听
  watch:{
    "$route.params.id": "getData"
  },

};
</script>
