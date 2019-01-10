<template>
  <div class="el-content tack-list">
    <div class="header_btn">
          <el-tabs v-model="tabvalue" type="card" @tab-click="tabClick">
            <el-tab-pane label=" 短信发送记录 " name="sms">
                  <div class="table-wrap">
                          <el-table
                            ref="smsData"
                            :data="smsData"
                            tooltip-effect="dark"
                            style="width: 100%">
                            <el-table-column
                              label="任务ID"
                               width="100"
                              prop="id">
                            </el-table-column>
                            <el-table-column
                              prop="agentName"
                               width="150"
                              label="短信代理商">
                            </el-table-column>
                            <el-table-column
                              prop="smsSign"
                               width="150"
                              label="签名">
                            </el-table-column>

                            <el-table-column
                              prop="smsType"
                               width="150"
                              label="类型">
                            </el-table-column>  
                            <el-table-column
                              prop="templateId"
                               width="150"
                              label="模板ID">
                            </el-table-column>  
                            <el-table-column
                              prop="templateContent"
                               width="150"
                              label="模板内容">
                                <template slot-scope="scope">
                                    <el-popover
                                      placement="top-start"
                                      title="模板内容"
                                      width="300"
                                      trigger="hover"
                                      :content="scope.row.templateContent">
                                      <el-button type="text" slot="reference">查看</el-button>
                                    </el-popover>
                                </template> 
                            </el-table-column>   
                            <el-table-column
                              prop="queryName"
                               width="150"
                              label=" 用户标签">
                                 <template slot-scope="scope">
                                    <el-popover
                                      placement="top-start"
                                      title="标签内容"
                                      width="300"
                                      trigger="hover"
                                      >
                                      <p v-for="(item,index) in scope.row.queryNameArr" :key ="index"> {{item}} </p>
                                      <el-button type="text" slot="reference">详情</el-button>
                                    </el-popover>
                                </template>                            
                            </el-table-column>   
                            <el-table-column
                              prop="sendStatus"
                               width="150"
                              label=" 状态">
                            </el-table-column>  
                            <el-table-column
                              prop="sendErrorMsg"
                               width="150"
                              label=" 原因">
                            </el-table-column>   
                            <el-table-column
                              prop="esTotal"
                               width="150"
                              label="ES总数">
                            </el-table-column>   
                            <el-table-column
                              prop="smsSuccess"
                               width="150"
                              label="发送成功数">
                            </el-table-column>  
                            <el-table-column
                              prop="smsFail"
                               width="150"
                              label="发送失败数">
                            </el-table-column>   
                            <el-table-column
                              prop="smsReceiveSuccess"
                               width="150"
                              label="接收成功数">
                            </el-table-column>     
                            <el-table-column
                              prop="smsReceiveFail"
                               width="150"
                              label="接收失败数">
                            </el-table-column>  
                            <el-table-column
                              prop="requestDate"
                               width="200"
                              label="请求发送时间">
                            </el-table-column>   
                            <el-table-column
                              prop="sendFinishDate"
                              width="200"
                              label="发送完成时间">
                            </el-table-column>                                                                                                                                          
                          </el-table>  
                    </div>

                  <!-- 分页 -->
                    <div class="pagination"><el-pagination background layout="prev, pager, next" :total="smstotal" @current-change="smsChange" :current-page.sync="smsNum"></el-pagination></div>


            </el-tab-pane>
            <el-tab-pane label=" push发送记录 " name="push">
                  <div class="table-wrap">
                          <el-table
                            ref="pushData"
                            :data="pushData"
                            tooltip-effect="dark"
                            style="width: 100%">

                            <el-table-column
                              label="url链接"
                              prop="imgUrl">
                            </el-table-column>
                            <el-table-column
                              prop="channel"
                              label="短信渠道">
                            </el-table-column>
                            <el-table-column
                              prop="content"
                              label="发送内容">
                            </el-table-column>

                            <el-table-column
                              prop="createDate"
                              label="发送时间">
                            </el-table-column>  
                                                                                                                                                               
                          </el-table>  
                    </div>

                  <!-- 分页 -->
                    <div class="pagination"><el-pagination background layout="prev, pager, next" :total="pushtotal" @current-change="pushChange" :current-page.sync="pushNum"></el-pagination></div>

            </el-tab-pane>
          </el-tabs>
    </div>
 
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
let set;
import PaginationComponent from "@/components/pagination";
export default {
  components: {
    appPagination: PaginationComponent 
  },
  data() {
    return {
        smsData: [],
        smstotal:1,
        smsNum: 1,
        pushNum: 1,
        tabvalue: 'sms',
        pushData:[],
        pushtotal:1,
        setInter: false,
        set_:'',

    };
  },
  methods: {
    getSms(){
      this.axios
        .post("smsTemplate/sendSmsRecord", {
          pageNum : this.smsNum
        })
        .then(res => {
          //this.provinceList = res.data.result;
          this.smstotal = res.data.result.total;
          this.smsData = res.data.result.labelSmsLog; 
          let arr = [];
          let set = [];
          let that= this;
          this.smsData.map(item=>{
            item.queryNameArr = item.queryName.split(',');
            if(item.sendStatus == "发送中"){
                arr.push(item.id);
            }
          });
            this.setInter = false;
            if(arr.length){
                this.setInter = true;
            }else{
              this.setInter = false;
            }

            arr.map((item,index)=>{ 
              that.getMessages(item);
            }) 
 

          })
        .catch(error => {
          //捕获失败
        });
    },
    getMessages(id){
     
         this.axios
        .post("smsTemplate/smsMessagesSent", {
          taskId : id
        })
        .then(res => {
          if(this.setInter){
            setTimeout(() => {
              this.getMessages(id);
            }, 20000);
            let arr = JSON.parse(JSON.stringify(this.smsData));
            this.smsData = [];
            arr.map(item=>{
              if(item.id == id){
                item.smsSuccess = res.smsSuccess;
                item.smsFail = res.smsFail;
              }
             this.smsData.push(item); 
            })
         
          }  
        })
        .catch(error => {
          //捕获失败
        });     
    },
    getPush(){
      this.axios
        .post("smsTemplate/selectSmsRecord", { 
          status: 1,
          pageNum : this.pushNum
        })
        .then(res => {
           
            this.pushData = res.data.result.list;
            this.pushtotal = res.data.result.count;

        })
        .catch(error => {
          //捕获失败
        });
    },
    smsChange(val){
        this.smsNum = val;
        this.getSms();
    },
    pushChange(val){
        this.pushNum = val;
        this.pushSms();
    },   
    tabClick(){
      if(this.tabvalue == 'sms'){
        this.smsNum = 1;
        this.getSms();
      }else{
        this.pushNum = 1;
        this.getPush();
      }
    },

   
  },
  mounted() {
    this.getSms();
    this.getPush();
  },
  beforeDestroy () {
      this.setInter = false;
    }
};
</script>



