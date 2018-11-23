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
           <el-form-item label="所属状态">
                <el-cascader
                  placeholder="请选择"
                  v-model="form.projectID"
                  :options="proOptions"
                  :show-all-levels="false"
                  change-on-select
                  :props="{value:'value', label:'label', children: 'children'}" 
                  @change="proOptionFn"
                  clearable
                ></el-cascader>
          </el-form-item>
           <el-form-item label="所属品牌">
                <el-cascader
                  placeholder="请选择"
                  v-model="form.projectID"
                  :options="proOptions"
                  :show-all-levels="false"
                  change-on-select
                  :props="{value:'value', label:'label', children: 'children'}" 
                  @change="proOptionFn"
                  clearable
                ></el-cascader>
          </el-form-item>
           <el-form-item label="所属省份">
                <el-cascader
                  placeholder="请选择"
                  v-model="form.projectID"
                  :options="proOptions"
                  :show-all-levels="false"
                  change-on-select
                  :props="{value:'value', label:'label', children: 'children'}" 
                  @change="proOptionFn"
                  clearable
                ></el-cascader>
          </el-form-item>
           <el-form-item label="所属城市">
                <el-cascader
                  placeholder="请选择"
                  v-model="form.projectID"
                  :options="proOptions"
                  :show-all-levels="false"
                  change-on-select
                  :props="{value:'value', label:'label', children: 'children'}" 
                  @change="proOptionFn"
                  clearable
                ></el-cascader>
          </el-form-item>                    
           <el-form-item label="所属区域">
                <el-cascader
                  placeholder="请选择"
                  v-model="form.projectID"
                  :options="proOptions"
                  :show-all-levels="false"
                  change-on-select
                  :props="{value:'value', label:'label', children: 'children'}" 
                  @change="proOptionFn"
                  clearable
                ></el-cascader>
          </el-form-item>    
      </el-form>
      <div class="operateBox">
          <el-button size="medium" type="primary">标签</el-button>
          <el-button size="medium">清空筛选条件</el-button>
          <el-button size="medium" >加标签</el-button>
      </div>
    </div>
    <div class="table-wrap">
          <el-table
            ref="multipleTable"
            :data="tableData3"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
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
                <el-button type="text" size="small">加标签</el-button>
                <el-button type="text" size="small" @click="jumpFn(scope.row.id)">查看</el-button>
              </template>
            </el-table-column>                                                                                                          
          </el-table>
    </div>
  <!-- 分页 -->
  <app-pagination requestUrl="/mission/missionList" @response="getData" :query="form" ref="pagination"></app-pagination>
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
      time1: [],
      time2: [],
      time3: [],
      tableData: [],
      pageSize: null,
      pageNo: null,
      proOptions: [],
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
        multipleSelection: []      
    };
  },
  methods: {
    toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },


    //状态跳转
    jumpFn(id) {
       
        this.$router.push({ path: "/home/taskdetais/" + id });
    },
    //新增
    onNewAdd() {
      this.$router.push({ path: "/home/newtaskedit/0" });
    },
    // 工单类别改变事件
    proOptionFn(val) {
      console.log(val);
      if (val.length != 0) {
        this.form.ascriptionProId = val[val.length - 1];
      } else {
        this.form.ascriptionProId = "";
      }
      console.log(this.form.ascriptionProId);
    },
    //状态改变
    statudFn() {
      /*  if(this.form.statusString && this.form.statusString != null){
      
      }else{
        this.form.missionStatus = ''
      } */
    },
    async getData(current) {
      this.loading = true;

      if (this.time1 && this.time1 != null) {
        this.form.createStart = this.time1[0];
        this.form.createEnd = this.time1[1];
      } else {
        delete this.form.createStart;
        delete this.form.createEnd;
      }
      if (this.time2 && this.time2 != null) {
        this.form.completeStart = this.time2[0];
        this.form.completeEnd = this.time2[1];
      } else {
        delete this.form.completeStart;
        delete this.form.completeEnd;
      }
      //期望完成时间
      if (this.time3 && this.time3 != null) {
        this.form.expectStart = this.time3[0];
        this.form.expectEnd = this.time3[1];
      } else {
        delete this.form.expectStart;
        delete this.form.expectEnd;
      }
      let res = await this.$refs.pagination.request(current);
      let newArrayleft = [];
      let newArrayList = [];
      //关注排序
      if (res.result.list && res.result.list.length > 0) {
        res.result.list.map(val => {
          if (val.favorite == 1) {
            newArrayleft.push(val);
          } else {
            newArrayList.push(val);
          }
        });
        let data = newArrayleft.concat(newArrayList);
        this.tableData = data;
      } else {
        this.tableData = res.result.list;
      }
      this.loading = false;
    },
    //警告类 提示
    prompt(text) {
      this.$message({
        message: text,
        type: "warning"
      });
    },
    classToggle(row, id) {
      //是否关注
      row.favorite = !row.favorite;
      let url =
        row.favorite == 1
          ? "/mission/noticeMission"
          : "/mission/cancelNoticeMission";
      this.axios
        .post(url, {
          id: id
        })
        .then(res => {})
        .catch(error => {
          //捕获失败
          this.prompt("网络连接失败,请稍后再试");
        });
    }
    //  回车查询
  },
  mounted() {
 
  
  }
};
</script>



