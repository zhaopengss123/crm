<template>
  <div class="el-content tack-list">
    <div class="header_btn">
        短信
    </div>
    <div class="table-wrap">
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%">

            <el-table-column
              label="任务ID"
              prop="id">
            </el-table-column>
            <el-table-column
              prop="agentName"
              label="短信代理商">
            </el-table-column>
            <el-table-column
              prop="smsSign"
              label="签名">
            </el-table-column>

            <el-table-column
              prop="smsType"
              label="类型">
            </el-table-column>  
            <el-table-column
              prop="templateId"
              label="模板ID">
            </el-table-column>  
            <el-table-column
              prop="templateContent"
              label="模板内容">
            </el-table-column>   
             <el-table-column
              prop="queryName"
              label=" 用户标签">
            </el-table-column>   
            <el-table-column
              prop="sendStatus"
              label=" 状态">
            </el-table-column>  
            <el-table-column
              prop="sendErrorMsg"
              label=" 原因">
            </el-table-column>   
             <el-table-column
              prop="esTotal"
              label="ES总数">
            </el-table-column>   
            <el-table-column
              prop="smsSuccess"
              label="发送成功数">
            </el-table-column>  
            <el-table-column
              prop="reserveDate"
              label="发送失败数">
            </el-table-column>   
             <el-table-column
              prop="reserveDate"
              label="接收成功数">
            </el-table-column>     
            <el-table-column
              prop="reserveDate"
              label="接收失败数">
            </el-table-column>  
            <el-table-column
              prop="requestDate"
              label="请求发送时间">
            </el-table-column>   
             <el-table-column
              prop="sendFinishDate"
              label="发送完成时间">
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
        tableData: [],
        total:0,
        pageNum: 1,

    };
  },
  methods: {
    getData(){
      this.axios
        .post("smsTemplate/sendSmsRecord", {
          pageNum : this.pageNum
        })
        .then(res => {
          //this.provinceList = res.data.result;
          this.total = res.data.result.total;
          this.tableData = res.data.result.labelSmsLog;
        })
        .catch(error => {
          //捕获失败
        });
    },
    pageChange(val){
        this.pageNum = val;
        this.getData();
    }
   
  },
  mounted() {
    this.getData();
  }
};
</script>



