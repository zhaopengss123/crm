<template id="com-dialog" >
  <div class="mode-editor">
      <div class="mode_hearder">
            <el-button type="primary" size="medium" @click="SMSbouncedShow()">新建标签</el-button>
            <el-button  size="medium" >导出标签</el-button>
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
                  prop="countNumber"
                  label="客户">
                </el-table-column>
                <el-table-column
                  prop="createDate"
                  label="创建时间">
                </el-table-column>                
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                      <el-button size="mini" >编辑</el-button>
                      <el-button size="mini"  type="danger" @click="removeShow()">删除</el-button>
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
          <el-form :inline="true" ref="form" :model="form" label-width="120px">
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
        this.axios.post('/labelEditing/listLabel', {}).then(res => {
          this.tableData = res.data.result;
        }).catch(error => { //捕获失败
        })
     },
     getLabeltypeList(){
       this.axios.post('/labelEditing/tabulationLabel', {}).then(res => {
          this.typeList = res.data.result;
        }).catch(error => { //捕获失败
        })
     },
     addLabel(){
       let paramJson = JSON.stringify(this.form);
       this.axios.post('/labelEditing/insertLabel', { labelTypeId: this.form.labelTypeId, labelName: this.form.labelName }).then(res => {
         if(res.data.code == 1000){
            this.$message({
              message: '操作成功',
              type: 'success'
            });
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
     removeShow(){
       hyhyyyytyyh
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
