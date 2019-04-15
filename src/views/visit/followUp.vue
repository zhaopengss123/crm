<template id="com-dialog" style="background:#fff;">
  <div class="followUp">

    <el-card class="box-card">
      <div>
        <div>
        <el-input
          style="width:700px"
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 4}"
          placeholder="请输入跟进内容"
          v-model="form.content">
        </el-input>
        </div>
        <div style="margin-top:10px;">
           <el-radio-group v-model="selectState" style="margin-bottom: 30px;">
            <el-radio-button label="#参与#"> #参与#</el-radio-button>
            <el-radio-button label="#不参与#">#不参与#</el-radio-button>
            <el-radio-button label="#已到店#">#已到店#</el-radio-button>
            <el-radio-button label="#未到店#">#未到店#</el-radio-button>
            <el-radio-button label="#未接通#">#未接通#</el-radio-button>
            <el-radio-button label="#考虑中#">#考虑中#</el-radio-button>
          </el-radio-group>
         </div> 
         <div >
           <el-form :inline="true">
            <el-form-item label="选择跟进人">
              <el-select v-model="form.havaCard" placeholder="请选择跟进人" >
                <el-option
                  v-for="(item,index) in followList" 
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
          </el-form-item>
          <el-button size="medium" type="primary" @click="save()" :loading="btnLoading">保存</el-button>
           </el-form> 
         </div>

      </div>
 
    </el-card>

      <el-card class="box-card" style="margin-top:10px;">
        <div slot="header" class="clearfix">
          <span>跟踪记录</span>
        </div>
        <div class="gzContent">
            <el-table
            v-loading="loading"
            ref="multipleTable"
            :data="List"
            tooltip-effect="dark"
            style="width: 100%">

            <el-table-column
              label="跟进次数"
              prop="times">
              <template slot-scope="scope">
                第{{ scope.row.times }}次跟进
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="跟进时间">
              <template slot-scope="scope">
                {{ scope.row.createTime | formatDate }}
              </template>
            </el-table-column>
            <el-table-column
              prop="followPerson"
              label="跟进人">
            </el-table-column>
            <el-table-column
              prop="content"
              label="跟进记录">
            </el-table-column>      
            <el-table-column
              prop="createTime"
              label="跟进状态">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.state }}</el-tag>
              </template>
            </el-table-column>
         <el-table-column
              prop="createTime"
              label="回访名单名称">
              <template slot-scope="scope">
                <el-tag>{{ scope.row.visitName }}</el-tag>
              </template>
            </el-table-column>
  
            <el-table-column
              fixed="right"
              label="操作"
              width="120">
              <template slot-scope="scope">
                <!-- <el-button type="text" size="small">发短信</el-button>  -->
                <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
              </template>
            </el-table-column>                                                                                                          
          </el-table>
        </div>
      </el-card> 


      <el-dialog
          title="编辑跟进记录"
          :visible.sync="editorList"
          width="630px"
          :before-close="handleClose">
                       <div>
        <div>
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4}"
                placeholder="请输入跟进内容"
                v-model="editForm.content">
              </el-input>
              </div>
              <div style="margin-top:10px;">
                <el-radio-group v-model="editForm.state" style="margin-bottom: 30px;">
                  <el-radio-button label="#参与#"> #参与#</el-radio-button>
                  <el-radio-button label="#不参与#">#不参与#</el-radio-button>
                  <el-radio-button label="#已到店#">#已到店#</el-radio-button>
                  <el-radio-button label="#未到店#">#未到店#</el-radio-button>
                  <el-radio-button label="#未接通#">#未接通#</el-radio-button>
                  <el-radio-button label="#考虑中#">#考虑中#</el-radio-button>
                </el-radio-group>
              </div> 
              <div >
              </div>

            </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose()">取 消</el-button>
            <el-button type="primary" @click="submitEdit()">确 定</el-button>
          </span>
        </el-dialog>




  </div>
</template>
<style lang="less">
.followUp {
 
}
</style>

<script>
export default {
  props: ['followId'],
  data() {
    return {
        selectState:'',
        form:{},
        followList:[],
        editorList:false,
        List:[],
        loading:false,
        btnLoading:false,
        editForm:{}
    };
  },
  methods: {
    handleClose(){
        this.editorList =  false;
    },
    save(){
      let id =  this.followId.id;
      let sid = this.followId.sid;
      let prizeId = this.followId.prizeId;
      let followPerson;
      this.followList.map(item=>{
        if( item.id ==  this.selectState){
            followPerson = item.name;
        }
      })
         if(!this.form.content) {
           this.$message('请输入跟进内容');
           return false;
         }         
         if(!this.selectState) {
           this.$message('请选择跟进状态');
            return false;
         }
         if(!this.form.havaCard) {
           this.$message('请选择跟进人');
           return false;
         }         
         this.btnLoading = true;               
         this.axios
          .post("/trackingRecord/insertMemberTrackingRecord", { 
                crmFollowPersonId:this.form.havaCard, 
                content: this.form.content,
                state: this.selectState,
                memberId: id,
                visitId: sid,
                followPerson,
                prizeId
           })
          .then(res => {
              this.btnLoading = false;
               this.$message({ message: '操作成功！',  type: 'success' });
               this.selectState = "";
               this.form = {};
               this.getData();
          })
          .catch(error => {
            //捕获失败
          }); 
    },
    getFollowList(){

      //跟进人列表
      this.axios
          .post("/trackingRecord/selectCrmFollowPerson", { })
          .then(res => {
              // this.followList = res.data.result;
              let arr = [];
              res.data.result.map(item=>{
                  let jsons  = {};
                  jsons.name = item.name;
                  jsons.id = item.id;
                  arr.push(jsons);
              })
              this.followList = arr;
          })
          .catch(error => {
            //捕获失败
          });
    },
    getData(){
       let id =  this.followId.id;
       let sid = this.followId.sid;
       let prizeId = this.followId.prizeId;
      this.axios
        .post("/trackingRecord/selectTrackingRecord", { memberId: id, visitId: sid , prizeId})
        .then(res => {
            this.List = res.data.result;
        })
        .catch(error => {
          //捕获失败
        });
    },
    edit(data){
        this.editorList = true;
        this.editForm = JSON.parse(JSON.stringify(data));
    },
    submitEdit(){
        if(!this.editForm.content){
           this.$message('跟进内容不能为空');
           return false;
        }
        let paramJson = JSON.stringify(this.editForm);
        this.axios
        .post("/trackingRecord/updateMemberTrackingRecord", { content:this.editForm.content, state: this.editForm.state, id: this.editForm.id , prizeId : this.followId.prizeId })
        .then(res => {
          if(res.data.code == 1000){
              this.$message({ message: '操作成功！',  type: 'success' });
              this.getData();
              this.editorList = false;
          }else{
              this.$message(res.data.info);
          }
            
        })
        .catch(error => {
          //捕获失败
        });
    }


  },

  mounted() {
    this.getFollowList();
    this.getData();
  },
  watch: {
    "$route.params.id": "getData",
  },
  filters: {
  formatDate: function (value) {
    let date = new Date(value);
    let y = date.getFullYear();
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? ('0' + MM) : MM;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let m = date.getMinutes();
    m = m < 10 ? ('0' + m) : m;
    let s = date.getSeconds();
    s = s < 10 ? ('0' + s) : s;
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
  }
}
};
</script>
