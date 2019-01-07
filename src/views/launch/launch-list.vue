<template>
  <div class="el-content tack-list">
    <!-- <app-tip>任务列表</app-tip> -->
    <div class="formQuery clear">
      <el-form :inline="true" ref="form" :model="form">
          <el-form-item label="用户查找">
            <el-input v-model="form.name" placeholder="请输入用户名称" ></el-input>
          </el-form-item>

           <el-form-item label="用户身份">
             <el-select v-model="form.havaCard" placeholder="请选择" >
              <el-option
                v-for="item in userType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>

          </el-form-item>
               <el-form-item label="所属省份">
             <el-select v-model="form.province" placeholder="请选择" @change="selectProvince()">
              <el-option
                v-for="item in provinceList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>     
          </el-form-item>
           <el-form-item label="所属城市">
              <el-select v-model="form.city"  placeholder="请选择所属省份">
              <el-option
                v-for="item in cityList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select> 
          </el-form-item> 

           <el-form-item label="所属门店">
              <el-select v-model="form.storeId" placeholder="请选择所属城市" >
              <el-option
                v-for="item in shopList"
                :key="item.storeId"
                :label="item.shopName"
                :value="item.storeId">
              </el-option>
            </el-select>    
          </el-form-item>  

           <el-form-item label="门店状态">
              <el-select v-model="form.status" placeholder="请选择门店状态" >
              <el-option
                v-for="item in statusList"
                :key="item.key"
                :label="item.name"
                :value="item.key">
              </el-option> 
            </el-select>    
          </el-form-item>  

           <el-form-item label="门店类型">
              <el-select v-model="form.status" placeholder="请选择门店类型" >
              <el-option
                v-for="item in statusList"
                :key="item.key"
                :label="item.name"
                :value="item.key">
              </el-option> 
            </el-select>    
          </el-form-item> 

           <el-form-item label="手机号">
            <el-input v-model="form.mobilePhone" placeholder="请输入用户手机号" ></el-input>
          </el-form-item>                  
   
      </el-form>
      <div class="operateBox">
          <el-button size="medium" type="primary" @click="share()">筛选</el-button>
          <el-button size="medium" @click="clearQuery">清空筛选条件</el-button>
      </div>
    </div>
    <div class="table-wrap">
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
              label="身份">
                <template slot-scope="scope">
                    {{scope.row.havaCard == 0 ?  '非会员' : '会员'}}
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
              width="120">
              <template slot-scope="scope">
                <!-- <el-button type="text" size="small">发短信</el-button>  -->
                <el-button type="text" size="small" @click="jumpFn(scope.row.id)">查看</el-button>
              </template>
            </el-table-column>                                                                                                          
          </el-table>  
    </div>

  <!-- 分页 -->
      <div class="pagination"><el-pagination background layout="prev, pager, next" :total="total" @current-change="pageChange" :current-page.sync="pageNum"></el-pagination></div>
  <!-- <app-pagination requestUrl="/mission/missionList" @response="getData" :query="form" ref="pagination"></app-pagination> -->
  </div>
</template>
<style lang="less" scoped>
.tack-list {
  .scopeName {
    color: #409eff;
    cursor: pointer;
  }
  .scopeName:hover {
    text-decoration: underline;
  }
  .curHand {
    cursor: pointer;
  }
  .cell .el-button {
    padding: 9px 12px;
  }
  .font-size-18 {
    font-size: 18px !important;
  }
  .color-red {
    color: #fa5555;
  }
  .color-blue {
    color: #409eff;
    &:hover {
      text-decoration: underline;
    }
  }
  .operateBox {
    float: none;
    margin-bottom: 40px;
  }
  .line {
    text-align: center;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .red {
    color: #f00;
  }
  .font-18 {
    font-size: 22px;
  }
  .el-icon-star-on {
    color: red;
  }
  .el-table th > .cell,
  .el-table td div,
  .el-table td .cell {
    word-break: keep-all;
  }
  .el-form-item{
    margin-left: 10px;
  }
    .pagination{
    margin-top: 20px;
    text-align: right;
  }
}
</style>
<script>
import PaginationComponent from "@/components/pagination";
export default {
  components: {
    appPagination: PaginationComponent
  },
  data() {
    return {
      form: {
        
      },
      status: 0,
      statusList:[
        {
          key:0 ,
          name:'全部'
        },
        {
          key:1,
          name:'正常'
        },
        {
          key:2,
          name:'解约'
        }
      ],
      pageNum:1,
      pageSize:10,
      total:1,
      provinceList: [],
      cityList: [],
      tableData:[],
      arrDate:'',
      userType:[{
        label:'会员',
        value:1        
      },{
        label:'非会员',
        value:0
      }],
      shopList:[],
         
    };
  },
  methods: {
    //状态跳转
    jumpFn(id) {
       
        this.$router.push({ path: "/home/launchDetail/" + id });
    },
        getProvince(){
      this.axios.post('linkage/getAllProvince', {}).then(res => {
        this.provinceList = res.data.result;
      }).catch(error => { //捕获失败
      })
    },
    selectProvince(){
        let provinceCode = this.form.province;
          this.axios.post('linkage/getCityByProvince', { provinceCode }).then(res => {
            this.cityList = res.data.result;
            this.form.city = this.cityList[0].code;
            this.selectShopList()
          }).catch(error => { //捕获失败
          })
    },
    selectShopList(){
        this.axios.post('/store/listShop', { city: this.form.city }).then(res => {
          this.shopList = res.data.result.shop;
        }).catch(error => { //捕获失败
        })
    },
    share(){
      this.pageNum = 1;
      this.getData();
    },
    clearQuery(){
      this.form = {};
      this.arrDate = [];
    },
    getData(){
      let arrNum = ['一','二','三','四','五','六'];
      let paramJson = JSON.stringify(this.form);
       this.axios.post('/store/listMember', { paramJson,pageNum: this.pageNum, pageSize: this.pageSize }).then(res => {
            this.tableData = res.data.result.member;
              this.total = res.data.result.count;
              this.tableData.map( item=>{
                if(item.babyNumber){
                 item.babyNumber  =  arrNum[item.babyNumber-1] + '胞胎';
                 
                 }else{
                    item.babyNumber = "";
                 }
              });
          }).catch(error => { //捕获失败
        })
    },
    timeChange(){
      console.log(this.arrDate);
      this.form.startDate = this.arrDate[0];
      this.form.endDate = this.arrDate[1];
    },
    pageChange(val){
        this.pageNum = val;
        this.getData();
    }
   
  },
  mounted() {
    this.getProvince();
    this.getData();
  }
};
</script>



