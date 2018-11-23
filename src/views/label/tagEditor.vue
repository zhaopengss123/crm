<template id="com-dialog" >
  <div class="mode-editor">
      <div class="mode_hearder">
            <el-button type="primary" size="medium" @click="SMSbouncedShow()">新建标签</el-button>
            <el-button  size="medium" @click="SMSbouncedShow()">导出标签</el-button>
      </div>
      <div class="mode_main">
            <template>
              <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                  prop="date"
                  label="标签名" >
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="客户">
                </el-table-column>
                <el-table-column
                  prop="name"
                  label="自动加标签">
                </el-table-column>                
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                      <el-button size="mini" >编辑</el-button>
                      <el-button size="mini"  type="danger">删除</el-button>
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
              <el-input v-model="data" placeholder="请输入内容" ></el-input>
            </el-form-item>
            <el-form-item label="累计成功交易">
              <el-input v-model="data" size="medium" placeholder="请输入内容" >
                 <template slot="append">笔</template>
              </el-input>
            </el-form-item>
            <el-form-item label="累计购买金额">
              <el-input v-model="data" size="medium" placeholder="请输入内容" >
                <template slot="append">元</template>
              </el-input>
            </el-form-item>    
            <el-form-item label="累计积分">
              <el-input v-model="data" size="medium" placeholder="请输入内容" >
                <template slot="append">分</template>
              </el-input>
            </el-form-item>                                       
          </el-form> 
        </div> 
        <span slot="footer" class="dialog-footer">
          <el-button @click="bouncedShow = false">取 消</el-button>
          <el-button type="primary" @click="bouncedShow = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<style lang="less">
.mode-editor{
  .mode_hearder {
    overflow: hidden;
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
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }],
          bouncedShow:false
    };
  },
  methods: {
     SMSbouncedShow(){
       this.bouncedShow = true;
     },
     handleClose(){
       this.bouncedShow = false;
     }
  },

  mounted(){
   
 
  },
  //路由监听
  watch:{
    "$route.params.id": "getData",

  },

};
</script>
