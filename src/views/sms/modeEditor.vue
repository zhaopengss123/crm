<template id="com-dialog" >
  <div class="mode-editor">
      <div class="mode_hearder">
            <el-button type="primary" size="medium" @click="SMSbouncedShow()">添加短信模板</el-button>
      </div>
      <div class="mode_main">
            <template>
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="title"
                  label="模板主题" width="250">
                </el-table-column>
                <el-table-column
                  prop="memo"
                  label="模板内容">
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                      <el-button size="mini" @click="bouncedShow=true; modeId = scope.row.id; form = scope.row">编辑</el-button>
                           <el-popover
                              placement="top"
                              width="160"
                              v-model="scope.row.visible">
                              <p>确定删除该标签吗？</p>
                              <div style="text-align: right; margin: 0">
                                <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
                                <el-button type="primary" size="mini" @click="delectMode(scope.row.id); scope.row.visible = false">确定</el-button>
                              </div>
                              <el-button  size="mini" type="danger" slot="reference" @click="scope.row.visible=true">删除</el-button>
                            </el-popover>
                    </template>
                  </el-table-column>
              </el-table>
            </template>
      </div>
      <el-dialog
        title="提示"
        :visible.sync="bouncedShow"
        width="500px"
        :before-close="handleClose">
        <div> 
          <el-form :inline="true" ref="form" :model="form" label-width="80px">
            <el-form-item label="标题">
              <el-input v-model="form.title" placeholder="请输入内容" ></el-input>
            </el-form-item>
            <el-form-item label="内容">
                  <el-input style="width:300px;"
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="form.memo">
                  </el-input>
            </el-form-item>            
          </el-form> 
        </div> 
        <span slot="footer" class="dialog-footer">
          <el-button @click="bouncedShow = false">取 消</el-button>
          <el-button type="primary" @click="addMode">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<style lang="less">
.mode-editor{
  .mode_hearder {
    overflow: hidden;
  } 
  .mode_hearder .el-button{
    float: right;
  } 
  .mode_main{
    clear: both;
    margin-top: 20px;
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
        data: '',
        modeId:'',
        tableData: [],
        bouncedShow:false,
        form:{}
    };
  },
  methods: {
     SMSbouncedShow(){
       this.bouncedShow = true;
       this.modeId = "";
       this.form = {};
     },
     handleClose(){
       this.bouncedShow = false;
     },
    getData(){
        this.axios.post('/smsTemplate/selectSmsTemplate', {}).then(res => {
          this.tableData = res.data.result;
        }).catch(error => { //捕获失败
        })
     },
     addMode(){
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        this.form.createDate = year + "-" + month + "-" + day;

       if(!this.form.title){
          this.$message({ message: '请输入标题',  type: 'error'  });
          return false;
       }
       if(!this.form.memo){
          this.$message({ message: '请输入模板内容',  type: 'error'  });
          return false;
       }       

      if(!this.modeId){
          let paramJson = JSON.stringify(this.form);
            this.axios.post('/smsTemplate/insertSms', {  paramJson  }).then(res => {
                if(res.data.code==1000){
                  this.$message({ message: '操作成功！',  type: 'success'  });
                  this.bouncedShow = false;
                  this.getData();
                }else{
                  this.$message({ message: res.data.info,  type: 'error'  });
                }
            }).catch(error => { //捕获失败
            })
        }else{
            this.form.id = this.modeId;
            let paramJson = JSON.stringify(this.form);
            this.axios.post('/smsTemplate/updateSms', {  paramJson  }).then(res => {
                if(res.data.code==1000){
                  this.$message({ message: '操作成功！',  type: 'success'  });
                  this.bouncedShow = false;
                  this.getData();
                }else{
                  this.$message({ message: res.data.info,  type: 'error'  });
                }
            }).catch(error => { //捕获失败
            })
        }
     },
     delectMode(id){
         this.axios.post('/smsTemplate/deleteSmsTemplate', { smsId: id}).then(res => {
            if(res.data.code==1000){
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
              this.getData();  
            }else{
             this.$message({
              message: res.data.info,
              type: 'error'
            });
            }
        }).catch(error => { //捕获失败
        }) 
     }
  },

  mounted(){
   this.getData();
 
  },
  //路由监听
  watch:{
    "$route.params.id": "getData",

  },

};
</script>
