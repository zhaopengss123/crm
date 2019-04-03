<template id="com-dialog" >

  <div class="visit-list">

        <el-card class="box-card" >
            <el-form :inline="true" >

            <el-form-item label="所属省份">
                <el-tag style="margin:0 10px 10px 0" v-for="(item,index) in queryCriteria.provinceLists" :key="index">{{ item.name }}</el-tag>
            </el-form-item>

            <el-form-item label="所属城市">
                 <el-tag style="margin:0 10px 10px 0" v-for="(item,index) in queryCriteria.cityLists" :key="index">{{ item.name }}</el-tag>
            </el-form-item>

            <el-form-item label="所属门店">
                 <el-tag style="margin:0 10px 10px 0" v-for="(item,index) in queryCriteria.shopLists" :key="index">{{ item.shopName }}</el-tag>
            </el-form-item>

            <el-form-item label="年龄段" v-if="queryCriteria.age">
                {{ queryCriteria.age[0] }} — {{ queryCriteria.age[1] }}
            </el-form-item>
            </el-form> 
        </el-card>

        <el-card class="box-card" style="margin-top:10px;">
            <el-form :inline="true" >
            <el-form-item label="回访状态">
                <el-select v-model="state" placeholder="请选择" @change="getDatas()">
                  <el-option
                    v-for="item in statusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
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
                  prop="babyNumber"
                  label="宝宝类型">
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
                <el-table-column
                  label="会员卡状态">
                    <template slot-scope="scope">
                        {{scope.row.cardStatus == 0 ?  '有效' : '无效'}}
                    </template>
                </el-table-column>                
              <el-table-column
                  label="会员卡剩余次数">
                    <template slot-scope="scope">
                        {{scope.row.cardNumbers ?  scope.row.cardNumbers : ''}}
                    </template>
                </el-table-column>             
                <el-table-column
                  prop="loginDate"
                  label="近期APP登录">
                </el-table-column>  
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
                    <el-button type="text" size="small" @click="follow(scope.row.id)">添加跟进记录</el-button>
                  </template>
                </el-table-column>                                                                                                          
              </el-table> 
                <!-- 分页 -->
      <div class="pagination"><el-pagination background layout="prev, pager, next" :total="total" @current-change="pageChange" :current-page.sync="pageNum"></el-pagination></div>
        </el-card>         

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
}
</style>

<script>
export default {
  // components: {
  //   comDialog
  // },
  data() {
    return {
        activeName:'1',
        pageSize:10,
        pageNum:1,
        state:'',
        total:0,
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
          label:'到店',
          value:'到店'
        },{
          label:'未到店',
          value:'未到店'
        },{
          label:'未接通',
          value:'未接通'
        }],
        tableData:[],
        queryCriteria:[]
    };
  },
  methods: {
    jumpFn(id) {
        this.$router.push({ path: "/home/launchDetail/" + id });
    },
     follow(id) {
        let sid = this.$route.params.id;
        let idx = JSON.stringify({
          id: id,
          sid: sid
        });
        this.$router.push({ path: "/home/followup/" + idx });
    },
    getquery(){
        let sid = this.$route.params.id;
         this.axios
          .post("/visit/selectVisitById", { visitId: sid })
          .then(res => {
            this.queryCriteria  = JSON.parse(res.data.result.visit.visitInfo[0].queryCriteria);
          })
          .catch(error => {
            //捕获失败
          });
    },
    getData(){
      let id = this.$route.params.id;
      let paramJson = JSON.stringify({
          state:this.state, 
          visitType: Number(this.activeName), 
          visitId: Number(id)
      })
      this.axios
          .post("/visit/memberVisitInfoList", { pageSize: this.pageSize, pageNum: this.pageNum, paramJson  })
          .then(res => {
            this.total = res.data.result.count;
            this.tableData = res.data.result.member;
             this.getquery();
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
     
    }
  },

  mounted() {
      this.getData();
      
  },
  watch: {
    "$route.params.id": "getData",
  }
};
</script>
