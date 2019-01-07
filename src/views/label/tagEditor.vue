<template id="com-dialog" >
  <div class="mode-editor">
      <div class="mode_hearder">
            <el-button type="primary" size="medium" @click="SMSbouncedShow()">新建标签</el-button>
            <!-- <el-button  size="medium" >导出标签</el-button> -->
      </div>
      <div class="mode_main">
            <template>
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="labelName"
                  label="标签名" >
                </el-table-column>
                <el-table-column
                  prop="total"
                  label="客户">
                    <template slot-scope="scope">
                          <span v-if="scope.row.total||scope.row.total==0">{{scope.row.total}}</span>
                          <img  class="loadings" v-else src="https://hcz-czg-image.oss-cn-beijing.aliyuncs.com/loading.png">
                        
                   </template>   
                </el-table-column>
                <el-table-column
                  prop="createDate"
                  label="创建时间">
                </el-table-column>                
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                      <!-- <el-button size="mini"  type="danger" @click="removeShow()">删除</el-button> -->
                               <el-popover
                                  placement="top"
                                  width="160"
                                  v-model="scope.row.visible">
                                  <p>确定删除该标签吗？</p>
                                  <div style="text-align: right; margin: 0">
                                    <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
                                    <el-button type="primary" size="mini" @click="delectLabel(scope.row.id); scope.row.visible = false">确定</el-button>
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
          <el-form :inline="true" ref="form" :model="form" :rules="rules"  label-width="120px">
            <el-form-item label="标签名称">
                  <el-select v-model="form.labelTypeId" placeholder="请选择" >
                  <el-option
                    v-for="item in typeList"
                    :key="item.typeId"
                    :label="item.typeName"
                    :value="item.typeId">
                  </el-option>
                </el-select>
            </el-form-item>
              <el-form-item label="标签条件">
                  <el-input
                      style="width:300px;"
                      type="textarea"
                      :rows="2"
                      placeholder="请输入内容"
                      v-model="form.labelName">
                    </el-input>
            </el-form-item>                                    
          </el-form> 
        </div> 
        <span slot="footer" class="dialog-footer">
          <el-button @click="bouncedShow = false">取 消</el-button>
          <el-button type="primary" @click="addLabel()">确 定</el-button>
        </span>
      </el-dialog>
        <!-- 分页 -->
      <div class="pagination"><el-pagination background layout="prev, pager, next" :total="total" @current-change="pageChange" :current-page.sync="pageNum"></el-pagination></div>
  </div>
</template>
<style lang="less">
.mode-editor{
  .mode_hearder {
    overflow: hidden;
  } 
  .mode_hearder .el-button{
    float: left;
  }
  .mode_main{
    clear: both;
    margin-top: 20px;
  }
  .pagination{
    margin-top: 20px;
    text-align: right;
  }
  .loadings{
    width: 20px;
    height: 20px;
    animation: routes 2s linear infinite;
    -webkit-animation: routes 2s linear infinite;
  }
  @keyframes routes {
    0%{ transform: rotate(0deg);}
    100%{transform: rotate(360deg); }
  }
  @-webkit-keyframes routes {
    0%{ -webkit-transform: rotate(0deg);}
    100%{-webkit-transform: rotate(360deg); }
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
        form: {},
        data: '',
        tableData: [],
        bouncedShow:false,
        typeList:[],
        visible2:false,
        total:1,
        pageNum:1,
        rules:{
          labelTypeId:[
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        },
        totalList : []
    };
  },
  methods: {
     SMSbouncedShow(){
       this.bouncedShow = true;
     },
     handleClose(){
       this.bouncedShow = false;
     },
     getData(){
       let that = this;
        this.axios.post('/labelEditing/listLabel', { pageNum:this.pageNum }).then(res => {
          this.tableData = res.data.result.label;
          this.total = res.data.result.count;
          
          this.tableData.map(item => {
              this.selectCount(item.id);
          })
        }).catch(error => { //捕获失败
        })
     },
     selectCount(id){

     this.axios.post('http://esserver.beibeiyue.com/es/crm/query/label', { labels: id ,pageNo: 1,pageSize: 1  }).then(res => {
            let arr = this.tableData;
             this.tableData = [];
              arr.map(item=>{
              if(item.id == id){
                item.total = res.data.total;
              }
              this.tableData.push(item);
            });


            
            
        }).catch(error => { //捕获失败
        }) 
        
     },
     getLabeltypeList(){
       this.axios.post('/labelEditing/initLabel', {}).then(res => {
          this.typeList = res.data.result;
        }).catch(error => { //捕获失败
        })
     },
     addLabel(form){
        if(!this.form.labelTypeId){
            this.$message({ message: '请选择标签名称',  type: 'error'  });
          return false;
        }
        if(!this.form.labelName){
            this.$message({ message: '请输入标签条件',  type: 'error'  });
          return false;
        }

       let paramJson = JSON.stringify(this.form);
    
       this.axios.post('/labelEditing/insertLabel', { labelTypeId: this.form.labelTypeId, labelName: this.form.labelName }).then(res => {
         if(res.data.code == 1000){
            this.$message({
              message: '操作成功',
              type: 'success'
            });
            this.pageNum = 1;
            this.getData();            
            this.bouncedShow = false;
            this.form = {};
         }else{
            this.$message({
              message: res.data.info,
              type: 'error'
            });
         }
        }).catch(error => { //捕获失败
        })        
     },
     //删除标签
    delectLabel(id){
        this.axios.post('/labelEditing/deleteLabel', { labelId: id}).then(res => {
            if(res.data.code==1000){
                this.$message({
                  message: '操作成功',
                  type: 'success'
                });
              this.pageNum = 1;
              this.getData(); 
            }else{
             this.$message({
              message: res.data.info,
              type: 'error'
            });
            }
        }).catch(error => { //捕获失败
        })  
    },
    pageChange(val){
        this.pageNum = val;
        this.getData();
    }
    
  },

  mounted(){
   this.getData();
   this.getLabeltypeList();
 
  },
  //路由监听
  watch:{
    "$route.params.id": "getData",

  },

};
</script>
