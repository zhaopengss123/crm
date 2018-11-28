<template>
  <div class="el-content tack-list">
    <!-- <app-tip>任务列表</app-tip> -->
    <div class="formQuery clear">
      <el-form :inline="true" ref="form" :model="form" label-width="80px">
          <el-form-item label="门店名称">
            <el-input v-model="form.missionName" placeholder="请输入门店名称" ></el-input>
          </el-form-item>
         <!--  <el-form-item label="工单类别">
            <el-input v-model="form.projectName" @keyup.enter.native="doLogin"></el-input>
          </el-form-item> -->

           <el-form-item label="所属品牌">
                <el-cascader
                  placeholder="请选择"
                  v-model="form.brandId"
                  :options="brandIdList"
                  :show-all-levels="false"
                  change-on-select
                  :props="{value:'value', label:'label'}" 
            
                  clearable
                ></el-cascader>
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
              <el-select v-model="form.city" @change="selectcity()" placeholder="请选择">
              <el-option
                v-for="item in cityList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select> 
          </el-form-item>                    
         <el-form-item label="所属区域">
             <el-select v-model="form.area" placeholder="请选择">
              <el-option
                v-for="item in areaList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select> 
          </el-form-item> 
      </el-form>
      <div class="operateBox">
          <el-button size="medium" type="primary">查询</el-button>
          <el-button size="medium">清空筛选条件</el-button>
      </div>
    </div>
    <div class="table-wrap">
          <el-table
            ref="multipleTable"
            :data="queryTable"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
              label="门店名称">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="品牌名称">
            </el-table-column>
            <el-table-column
              prop="address"
              label="所在城市">
            </el-table-column>
            <el-table-column
              prop="address"
              label="所在区域">
            </el-table-column>
            <el-table-column
              prop="address"
              label="门店状态">
            </el-table-column>
            <el-table-column
              prop="address"
              label="门店类型">
            </el-table-column>
            <el-table-column
              prop="address"
              label="会员总数">
            </el-table-column>
            <el-table-column
              prop="address"
              label="有效会员数">
            </el-table-column>  
            <el-table-column
              prop="address"
              label="通卡会员数">
            </el-table-column>  
            <el-table-column
              prop="address"
              label="有效会员数">
            </el-table-column>  
            <el-table-column
              prop="address"
              label="APP安装量">
            </el-table-column>  
            <el-table-column
              fixed="right"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="jumpFn(scope.row.id)">查看</el-button>
              </template>
            </el-table-column>                                                                                                          
          </el-table>
    </div>
  <!-- 分页 -->
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
        missionStatus: ""
      },
      pageSize: null,
      pageNum: null,
      queryTable: [],
      provinceList: [],
      cityList: [],
      areaList: [],
      brandIdList: [{
        value:'12',
        label:'鱼乐贝贝'
      },{
        value:'1',
        label:'贝贝约'
      },{
        value:'17',
        label:'泡泡塘'
      },{
          value:'18',
          label:'鱼儿亲子'         
      }],
        multipleSelection: []      
    };
  },
  methods: {
    proProvince(){

    },
    proCity(){

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
            this.selectcity();
          }).catch(error => { //捕获失败
          })
    },
    selectcity(){
        let cityCode = this.form.city;
          this.axios.post('http://tusercenter.beibeiyue.cn/c/area/getAreaByCity', { cityCode }).then(res => {
            this.areaList = res.data.result;
            this.form.area = this.areaList[0].code;
          }).catch(error => { //捕获失败
          })
    },
    //状态跳转
    jumpFn(id) {
       
        this.$router.push({ path: "/home/taskdetais/" + id });
    },


  },
  mounted() {
   
    this.getProvince();
    
  }
};
</script>



