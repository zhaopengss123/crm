<template>
  <div class="el-content tack-list">
    <!-- <app-tip>任务列表</app-tip> -->
    <div class="formQuery clear">
      <el-form :inline="true" ref="form" :model="form">
          <el-form-item label="用户查找">
            <el-input v-model="form.name" placeholder="请输入门店名称" ></el-input>
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
                v-for="item in userType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>    
          </el-form-item>  

          <el-form-item label="近期使用时间">
              <el-date-picker
                v-model="form.arrDate"
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
          </el-form-item>                     
   
      </el-form>
      <div class="operateBox">
          <el-button size="medium" type="primary" @click="getData()">筛选</el-button>
          <el-button size="medium">清空筛选条件</el-button>
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
              prop="havaCard"
              label="身份">
            </el-table-column>

            <el-table-column
              prop="loginDate"
              label="近期APP登陆">
            </el-table-column>  
            <el-table-column
              prop="reserveDate"
              label="近期预约时间">
            </el-table-column>  
  
            <el-table-column
              fixed="right"
              label="操作"
              width="200">
              <template slot-scope="scope">
                <el-button type="text" size="small">发短信</el-button> 
                <el-button type="text" size="small" @click="jumpFn(scope.row.id)">查看</el-button>
              </template>
            </el-table-column>                                                                                                          
          </el-table>  
    </div>

  <!-- 分页 -->
      <div class="pagination"><el-pagination background layout="prev, pager, next" :total="1000"></el-pagination></div>
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
        pageNum: 1,
        arrDate:'',
      },
      provinceList: [],
      cityList: [],
      tableData:[],
      userType:[{
        label:'全部',
        value:''
      },{
        label:'会员',
        value:0        
      },{
        label:'非会员',
        value:1
      }],
      
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          id:1
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          id:1
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          id:1
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          id:1
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          id:1
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          id:1
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          id:1
        }],     
    };
  },
  methods: {
    //状态跳转
    jumpFn(id) {
       
        this.$router.push({ path: "/home/launchDetail/" + id });
    },
        getProvince(){
      this.axios.post('http://tusercenter.beibeiyue.cn/c/area/getAllProvince', {}).then(res => {
        this.provinceList = res.data.result;
      }).catch(error => { //捕获失败
      })
    },
    selectProvince(){
        let provinceCode = this.form.province;
          this.axios.post('http://tusercenter.beibeiyue.cn/c/area/getCityByProvince', { provinceCode }).then(res => {
            this.cityList = res.data.result;
            this.form.city = this.cityList[0].code;
          }).catch(error => { //捕获失败
          })
    },
    getData(){
      let arrNum = ['一','二','三','四','五','六'];
      let paramJson = JSON.stringify(this.form);
       this.axios.post('/store/listMember', { paramJson }).then(res => {
            this.tableData = res.data.result;
              this.tableData.map( item=>{
                 item.babyNumber  =  arrNum[item.babyNumber-1] + '胞胎';
                 item.havaCard  =  item.havaCard == 0 ? item.havaCard = '非会员' : '会员';
              });
          }).catch(error => { //捕获失败
        })
    }
   
  },
  mounted() {
    this.getProvince();
    this.getData();
  }
};
</script>



