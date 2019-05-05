<template id="com-dialog" >

  <div class="visit-list">
    <div  v-if="!tcvs">
        <el-card class="box-card" v-if="jsonLength>0" >
            <el-form :inline="true" >
            <el-form-item label="用户名称：" v-if="queryCriteria.name">
               {{ queryCriteria.name }}
            </el-form-item>

            <el-form-item label="用户身份：" v-if="queryCriteria.havaCard">
                 {{ queryCriteria.havaCard }}
            </el-form-item>
            <el-form-item label="用户手机号：" v-if="queryCriteria.mobilePhone">
                 {{ queryCriteria.mobilePhone }}
            </el-form-item>

            <span  v-if="queryCriteria.contractStatus">
            <el-form-item label="门店类型" v-if="queryCriteria.contractStatus.length">
                <el-tag style="margin:0 10px 10px 0" v-for="(item,index) in queryCriteria.contractStatus" :key="index">{{ item == 0 ? '正常' : ( item == 1? '合同到期' : (item == 2? '解约': '转店中' )) }}</el-tag>
            </el-form-item>
            </span>
            <span v-if="queryCriteria.provinceLists ">
            <el-form-item label="所属省份" v-if="queryCriteria.provinceLists.length">
                <el-tag style="margin:0 10px 10px 0" v-for="(item,index) in queryCriteria.provinceLists" :key="index">{{ item.name }}</el-tag>
            </el-form-item>
            </span>
            <span v-if="queryCriteria.cityLists">
            <el-form-item label="所属城市" v-if="queryCriteria.cityLists.length">
                 <el-tag style="margin:0 10px 10px 0" v-for="(item,index) in queryCriteria.cityLists" :key="index">{{ item.name }}</el-tag>
            </el-form-item>
            </span>
            <span v-if="queryCriteria.shopLists">
            <el-form-item label="所属门店" v-if="queryCriteria.shopLists.length">
                 <el-tag style="margin:0 10px 10px 0" v-for="(item,index) in queryCriteria.shopLists" :key="index">{{ item.shopName }}</el-tag>
            </el-form-item>
            </span>
            <span  v-if="queryCriteria.age">
            <el-form-item label="年龄段：" v-if="queryCriteria.age.length">
                {{ queryCriteria.age[0] }} — {{ queryCriteria.age[1] }}
            </el-form-item>
            </span>
            </el-form> 
        </el-card>
      
        <el-card class="box-card" style="margin-top:10px;" v-if="activeName == 0 || hfid == 1">
            <el-form :inline="true" >
            <el-form-item label="回访状态" v-if="activeName == 0">
                <el-select v-model="state" placeholder="请选择" @change="getDatas()">
                  <el-option
                    v-for="item in statusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>  
            </el-form-item>

            <el-form-item label="奖品名称" v-if="hfid == 1">
                <el-select v-model="prizeId" clearable placeholder="请选择" @change="getDatas()">
                  <el-option
                    v-for="item in prizeList"
                    :key="item.prizeId"
                    :label="item.prizeName"
                    :value="item.prizeId">
                  </el-option>
                </el-select>  
            </el-form-item>            
            </el-form> 
        </el-card>

        <el-card class="box-card"  style="margin-top:10px;">
              <el-tabs v-model="activeName" type="card"  @tab-click="getDatas()" >
              <el-tab-pane label="待回访" name="1"></el-tab-pane>
              <el-tab-pane label="已回访" name="0"></el-tab-pane>
            </el-tabs>
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%">

                <el-table-column
                  label="姓名"
                  prop="name">
                </el-table-column>
                <el-table-column
                  prop="mobilePhone"
                  label="手机号">
                </el-table-column>
                <el-table-column
                  prop="prizeName"
                  width="220"
                  label="奖品名称">
                </el-table-column>
                <el-table-column
                  prop="babyNumber"
                  label="宝宝类型">
                    <template slot-scope="scope">
                        {{scope.row.babyNumber == 1 ? '一' :(scope.row.babyNumber == 2 ? '双':(scope.row.babyNumber == 3 ? '三':(scope.row.babyNumber == 4 ? '四' :scope.row.babyNumber ) ))}}胞胎
                    </template>
                </el-table-column>
                <el-table-column
                  prop="sex"
                  label="性别">
                </el-table-column>         
                <el-table-column
                  label="身份">
                    <template slot-scope="scope">
                        {{scope.row.havaCard == 0 ?  '非会员' : '会员'}}
                    </template>
                </el-table-column>
                <!-- <el-table-column
                  label="会员卡状态">
                    <template slot-scope="scope">
                        {{scope.row.cardStatus == 0 ?  '有效' : ''}}
                    </template>
                </el-table-column>                 -->
              <el-table-column
                  label="会员卡剩余次数">
                    <template slot-scope="scope">
                        {{scope.row.cardNumbers ?  scope.row.cardNumbers : ''}}
                    </template>
                </el-table-column>      
                <el-table-column
                  width="200"
                  label="领取时间">
                  <template slot-scope="scope">
                        {{scope.row.createTime | formatDate}}
                    </template>
                  
                </el-table-column>                        
                <!-- <el-table-column
                  prop="loginDate"
                  label="近期APP登录">
                </el-table-column>   -->
                <el-table-column
                  prop="reserveDate"
                  label="近期预约时间">
                </el-table-column>  
      
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="220">
                  <template slot-scope="scope">
                    <!-- <el-button type="text" size="small">发短信</el-button>  -->
                    <el-button type="text" size="small" @click="jumpFn(scope.row.id)">查看</el-button>
                    <el-button type="text" size="small" @click="follow(scope.row)">添加跟进记录</el-button>
                  </template>
                </el-table-column>                                                                                                          
              </el-table> 
                <!-- 分页 -->
      <div class="pagination"><el-pagination background layout="total, prev, pager, next " :total="total" @current-change="pageChange" :current-page.sync="pageNum"></el-pagination></div>
        </el-card>     
        </div>
      <div class="tcvs" v-if="tcvs">
       <div class="tcvs_main">
       <div style="padding:10px;"><el-button   size="medium" round icon="el-icon-arrow-left" @click="tcvs=false;memberIds=0; pageNum = 1; getData();">返回</el-button></div>
        <el-tabs v-model="selectCard" type="card" @tab-click="handleClick">
            <el-tab-pane label="详细信息" name="first"> <detail v-if="memberIds!=0&&tcvs" :memberIdx="memberIds" ></detail></el-tab-pane>
            <el-tab-pane label="跟进记录" name="second"><followup :followId="followId"></followup></el-tab-pane>
          </el-tabs>
        </div> 
       
      </div>
  </div>
</template>
<style lang="less">
.visit-list {
  .el-form-item{
    margin-right: 30px;
    margin-bottom: 0;
  }
 .pagination{
    margin-top: 20px;
    text-align: right;
  }  
  .tcvs{
    width: 100%;
    height: 100%;

    background: rgb(255, 255, 255);

  }  
}
</style>

<script>
import LaunchDetailComponent from '@views/launch/launch-detail';
import followUpComponent from '@views/visit/followUp';
import {formatDate} from '../../filter/format.js';
export default {
  components: {
    detail: LaunchDetailComponent,
    followup:followUpComponent
  },
  filters:{
      formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
  },  
  data() {
    return {
      prizeId:null,
      prizeList:[],
      followId:{},
        tcvs:false,
        memberIds:0,
        activeName:'1',
        pageSize:10,
        pageNum:1,
        state:'',
        total:0,
        selectCard:'first',
        statusList:[{
          label:'全部',
          value:''
        },{
          label:'参与',
          value:'参与'
        },{
          label:'不参与',
          value:'不参与'
        },{
          label:'已到店',
          value:'已到店'
        },{
          label:'未到店',
          value:'未到店'
        },{
          label:'未接通',
          value:'未接通'
        },{
          label:'考虑中',
          value:'考虑中'
        }],
        tableData:[],
        queryCriteria:[],
        hfid : 0,
        jsonLength:0
    };
  },
  methods: {
    handleClick(){

    },
    jumpFn(id) {
        // this.$router.push({ path: "/home/launchDetail/" + id });
        this.tcvs = true; 
        this.memberIds = id;
        let sid = this.$route.params.id;

        let idx ={
          id: id,
          sid: sid
        };
        this.followId = idx;
        this.selectCard = 'first';
    },
     follow(item) {
      
        this.tcvs = true; 
        this.memberIds = item.id;
        let sid = this.$route.params.id;
        let idx ={
          id: item.id,
          sid: sid,
          prizeId: item.prizeId && item.prizeId!='' ? item.prizeId : null
        };
        this.followId = idx;
        this.selectCard = 'second';
    },
    getquery(){
        let sid = this.$route.params.id;
         this.axios
          .post("/visit/selectVisitById", { visitId: sid })
          .then(res => {
           if(res.data.result.visit.visitInfo[0].queryCriteria){
            this.queryCriteria  = JSON.parse(res.data.result.visit.visitInfo[0].queryCriteria);
            }else{
               this.queryCriteria = {};
            }
          let jsonLength = 0;  
          for(var item in this.queryCriteria){  
              jsonLength++;  
          }
          this.jsonLength = jsonLength;

          })
          .catch(error => {
            //捕获失败
          });
    },
    getData(){
      let id = this.$route.params.id;
      this.hfid  = id;
      let paramJson = JSON.stringify({
          state:this.state, 
          visitType: Number(this.activeName), 
          visitId: Number(id),
          prizeId: this.prizeId ? Number(this.prizeId) : null
      })
      this.axios
          .post("/visit/memberVisitInfoList", { pageSize: this.pageSize, pageNum: this.pageNum, paramJson  })
          .then(res => {
            this.total = res.data.result.count;
            this.tableData = res.data.result.member;
             this.getquery();
             this.tcvs = false;
        })
          .catch(error => {
            //捕获失败
          });
    },
     pageChange(val){
        this.pageNum = val;
        this.getData();
    },
    getDatas(){
      this.pageNum = 1;
      this.getData();
    },
    getPrice(){
        this.axios
        .post("/visit/selectPrize", {   })
        .then(res => {
            if(res.data.code == 1000){
              this.prizeList = res.data.result;
            }
      })
        .catch(error => {
          //捕获失败
        });
    }
  },

  mounted() {
      this.getData();
      this.getPrice();


      
  },
  watch: {
    "$route.params.id": "getData",
  }
};
</script>
