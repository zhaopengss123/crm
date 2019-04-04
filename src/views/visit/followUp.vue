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
      <div>

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
                <el-button type="text" size="small" @click="edit(scope.row.id)">编辑</el-button>
              </template>
            </el-table-column>                                                                                                          
          </el-table>
        </div>
      </el-card>
     
                <el-select v-model="state" placeholder="请选择" @change="getDatas()">
                  <el-option
                    v-for="item in statusList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>  
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
      state:'',
        selectState:'',
        form:{},
        followList:[],
        List:[],
        loading:false,
        btnLoading:false,
                statusList:[{
          label:'全部',
          value:''
        },{
          label:'参与',
          value:'参与'
        },{
          label:'不参与',
          value:'不参与'
        },{
          label:'到店',
          value:'到店'
        },{
          label:'未到店',
          value:'未到店'
        },{
          label:'未接通',
          value:'未接通'
        }],
    };
  },
  methods: {
    save(){
      let id =  this.followId.id;
      let sid = this.followId.sid;
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
                followPerson
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
      this.axios
        .post("/trackingRecord/selectTrackingRecord", { memberId: id })
        .then(res => {
            this.List = res.data.result;
        })
        .catch(error => {
          //捕获失败
        });
    },
    edit(){
      this.$message('没有回显信息');
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
