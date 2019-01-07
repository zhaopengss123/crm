<template id="com-dialog" >

  <div class="send-message">
           <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <div>
              <b>使用说明:</b>
              <div>(您使用本系统发送短信,就表明您同意并接受以下内容)</div>

              <div>1.不得发送包含以下内容、文字的短信息内容非法的、骚扰性的、中伤他人的、辱骂性的、恐吓性的、伤害性的、庸俗的、淫秽的信息;教唆
              他人构成犯罪行为的信息、危害国家安全的信息;及任何不符合国家法律、国际惯例、地方法律规定的信息。</div>
              <div>2不能违反运营商规定,不得发送竞争对手产品
            的广告,不能按手机号段形式进行广告业务的宣
              传等,不能发送与本行业无关和移动运营商限制
              和禁止发送的短信内容,特别是广告类信息,群
              发短信等,对违反此声明产生的一切后果由发送
              者及其单位承担。
              </div>
              <div>3最好不要在晚22:00至早7:00时段发送短信,以免引起客户反感</div>
          </div>
          <span slot="footer" class="dialog-footer">
 
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <el-card class="box-card" style="margin-top:10px;">
          <div slot="header" class="clearfix">
            <span>选择联系人</span>
          </div>
          <div class="scope">
            <el-row style="margin-bottom:20px;">
                      <el-select v-model="form.province" placeholder="请选择省份" @change="selectProvince()">
                        <el-option
                          v-for="item in provinceList"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code">
                        </el-option>
                      </el-select>     
                   
                  
                        <el-select v-model="form.city" @change="selectcity()" placeholder="请选择城区">
                        <el-option
                          v-for="item in cityList"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code">
                        </el-option>
                      </el-select> 
                                   
                
                      <el-select v-model="form.area" placeholder="请选择区域">
                        <el-option
                          v-for="item in areaList"
                          :key="item.code"
                          :label="item.name"
                          :value="item.code">
                        </el-option>
                      </el-select> 
             <div class="sendBtn">
              <el-button  type="primary" :loading="loading" @click="openSms = true">发送短信</el-button>
              <el-button  type="primary" :loading="loading" @click="senddeliveryJpush()">发送push</el-button>
            </div> 
            </el-row>
               <el-row>  
                <el-col>
                    <el-select v-model="client" placeholder="客户端选择" >
                      <el-option
                        v-for="item in clientList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>     
                 </el-col>
                 <el-col> <el-button type="primary" @click="labelOpen = true">选择用户标签</el-button></el-col>  
                 </el-row>
                 <el-row style="margin-top:20px;">
                      <el-tag style="margin:3px;"
                        v-for="tag in selectBox"
                        :key="tag.labelId"
                        >
                        {{tag.labelName}}
                      </el-tag>
                 </el-row>
           
                <el-row style="margin-top:20px;">
                <el-button  type="primary" @click="share(1)">查询</el-button>
              </el-row>
              <el-row style="margin-top:20px;">
                        <el-table
                            
                            :data="memberList"
                            tooltip-effect="dark"
                            style="width: 100%">
                            <el-table-column
                              prop="id"
                              label="会员ID">
                            </el-table-column>
                            <el-table-column
                              prop="name"
                              label="会员名称">
                            </el-table-column>
                            <el-table-column
                              prop="sex"
                              label="性别">
                            </el-table-column>
                            <el-table-column
                              prop="birth_day"
                              label="生日">
                            </el-table-column>
                            <el-table-column
                              prop="baby_number"
                              label="宝宝数量">
                            </el-table-column>
                            <el-table-column
                              prop="mobile"
                              label="手机号">
                            </el-table-column>                                                                                                  
                          </el-table>         
              </el-row>
              <div class="pagination">
                <span style="height:30px; line-height:30px; color:#999; font-size:14px;">共{{ total }}条数据</span>
                <el-pagination style="float:right;" background layout="prev, pager, next" :total="total" @current-change="pageChange" :current-page.sync="pageNum"></el-pagination></div>
          </div> 
        </el-card>
        <el-card class="box-card" style="margin-top:10px;">
          <div slot="header" class="clearfix">
            <span>设置短信模板：</span> 
              <el-select v-model="modeValue" @change="selectMode" placeholder="请选择模板">
                <el-option
                  v-for="item in modeList"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
           
          </div>
          <div class="main">
           <span>剩余短信条数:{{smsNumber}}条</span>
             <el-row style="margin-top:10px;">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 100}"
                    placeholder="请选择短信模板"
                    v-model="modeText"
                    readonly="readonly">
                </el-input>  
             </el-row> 
              <!-- <el-row style="font-size:12px; color:#999; padding-top:15px;">还可以输入{{modeLength}}个字</el-row> -->
            </div>     
    
        </el-card> 
     
        <el-dialog
        title="选择标签"
        :visible.sync="labelOpen"
        width="700px"
        :before-close="labelClose">
            <!-- <el-collapse v-model="activeNames" >
              <el-checkbox-group v-model="checkList"> 
              <el-collapse-item  v-for="(item,index) in typeList" :key="index" :name="index" :title="item.name" >
                    <span v-for="(data,indexs) in item.list" :key ="indexs" style="padding: 0 10px;">
                      <el-checkbox :label="data.labelName" :key="data.labelId" @change="selectBoxs(data)" ></el-checkbox>
                    </span> 
              </el-collapse-item>
                </el-checkbox-group> 
            </el-collapse> -->
          <div class="label_list" v-for="(item,index) in typeList" :key="index">
              <div class="label_status">{{ item.name }}：</div>
              <div class="label_content">
                  <div  v-for="(data,indexs) in item.list" :key ="indexs" @click="selectBoxs(data,index,indexs)" :class=" data.isclass? 'cli': ''">{{ data.labelName }}</div>
              </div>
          </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="labelClose">取 消</el-button>
          <el-button type="primary" @click="labelOpen = false">确 定</el-button>
        </span>
      </el-dialog>
    <!-- 发送短信 -->
        <el-dialog
        title="发送短信"
        :visible.sync="openSms"
        width="500px"
        :before-close="openSmsClose">
          <el-form :inline="true" ref="smsForm" :model="smsForm" label-width="140px">
               <el-form-item label="代理商">
                  <el-select v-model="smsForm.agentId" placeholder="请选择" @change="selectMessageChannel()" >
                    <el-option
                      v-for="item in messageChannelList"
                      :key="item.id"
                      :label="item.dealerName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>

               <el-form-item label="选择签名">
                  <el-select v-model="smsForm.smsSignId" placeholder="请选择" >
                    <el-option
                      v-for="item in smsSignatureList"
                      :key="item.id"
                      :label="item.smsSign"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
               
               <el-form-item label="剩余短信条数">
                    <el-input v-model="smsNum" style="width:180px;"  readonly="readonly" placeholder="请选择代理商" ></el-input>
                    
                </el-form-item>
                
               <el-form-item label="短信模板id">
                    <el-input v-model="smsForm.templateId" style="width:180px;" placeholder="请输入短信模板id" ></el-input>
                    <el-button size="medium" style="margin-left:10px;" type="primary" @click="getSmsTemplate()">查询</el-button>
                </el-form-item>
                <el-form-item label="短信模板标题">
                    <el-input v-model="templateTitle"   readonly="readonly" placeholder="请选择短信模板"  ></el-input>
                </el-form-item>
                <el-form-item label="短信模板内容">
                  <el-input
                  readonly="readonly"
                    type="textarea"
                    style="width:300px"
                    :autosize="{ minRows: 2, maxRows: 6}"
                    placeholder="请输入内容"
                    v-model="templateContent">
                  </el-input>
                </el-form-item>  
                <el-form-item label="短信类型">
                  <el-input
                  readonly="readonly"
                    type="text"
                    v-model="smsType">
                  </el-input>
                </el-form-item>                  
          </el-form>  
        <span slot="footer" class="dialog-footer">
          <el-button @click="openSmsClose">取 消</el-button>
          <el-button type="primary" @click="sendSms()">确认发送短信</el-button>
        </span>
      </el-dialog>


  </div>
</template>
<style lang="less">
.send-message {
  .label_status{
    min-width:150px;
    width: auto;
    height: 40px;
    line-height: 40px;
    float: left;
    font-weight: bold;
  }
  .label_content{
    width: 500px;
    float: left;
    line-height: 38px;
    text-align: center;
  }
  .label_content>div{
    width: auto;
    border: solid 1px #409EFF;
    float: left;
    padding: 0 10px;
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  .label_content>div.cli{
      color: #fff;
      background: #409EFF;
  }
  .operation {
    width: 100%;
  }
  .operation > span {
    font-size: 14px;
  }
  .operation > .el-input {
    width: 300px;
  }
  .operation > .el-button {
    margin-left: 20px;
  }
  .box-card:last-child {
    margin-top: 20px;
  }
  .sendBtn .el-button {
    float: left;
  }
  .sendBtn {
    width: auto;
    float: right;
  }
  // .scope .el-select{
  //   margin-left: 20px;
  // }
  .scope .el-col {
    width: auto;
    float: left;
    margin-right: 20px;
  }
  .pagination{
    margin-top: 20px;
    text-align: right;
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
      openSms: false,
      tags: [
        { name: "标签一", type: "" },
        { name: "标签二", type: "success" },
        { name: "标签三", type: "info" },
        { name: "标签四", type: "warning" },
        { name: "标签五", type: "danger" }
      ],
      dialogVisible: false,
      loading: false,
      memberPhone: "",
      PhoneList: "",
      switchValue: true,
      numberPhone: 0,
      modeValue: "",
      smsNumber: 0,
      smsNum: '',
      modeText: "",
      modeLength: 60,
      form: {},
      options: [],
      labelOpen: false,
      client: 0,
      memberList: [],
      clientList: [
        {
          label: "IOS",
          value: 2
        },
        {
          label: "安卓",
          value: 1
        },
        {
          label: "全部",
          value: 0
        }
      ],
      memberType: "",
      memberTypeList: [
        {
          label: "会员",
          value: "1"
        },
        {
          label: "非会员",
          value: "0"
        }
      ],
      activeNames: 1,
      typeList: [],
      checkList: [],
      modeList: [],
      selectBox: [],
      form: { area: "" },
      provinceList: [],
      cityList: [],
      areaList: [],
      pageNo: 1,
      pageSize:10,
      pageNum: 1,
      total: 1,
      totals :0,
      messageChannelList:[],
      smsSignatureList: [],
      smsForm:{
        agentId: '',
        smsSignId:''
      },
      templateTitle: '',
      templateContent:'',
      smsType: ''
    };
  },
  methods: {
    //选择模板

    getSmsTemplate(){
        this.axios
        .post("/smsTemplate/smsTemplate", {
          templateId: this.smsForm.templateId,
          agentId: this.smsForm.agentId
        })
        .then(res => {
          //this.messageChannelList = res.data.result;
          this.templateTitle = res.data.result.templateName;
          this.templateContent = res.data.result.templateContent;
          this.smsType = res.data.result.smsType == 0 ?'普通短信' : '营销短信' ;
        })
        .catch(error => {
          //捕获失败
        });      
    },
    //短信渠道  
    messageChannel(){
        this.axios
        .post("/smsTemplate/messageChannel", {})
        .then(res => {
          this.messageChannelList = res.data.result;
        })
        .catch(error => {
          //捕获失败
        });
    },

    //查询签名 剩余短信条数
    selectMessageChannel(){
        this.smsForm.smsSignId = "";
        this.axios
        .post("/smsTemplate/smsSignature", { 
          id: this.smsForm.agentId ,

        })
        .then(res => {
          this.smsSignatureList = res.data.result;
        })
        .catch(error => {
          //捕获失败
        });
    //剩余短信条数
        this.axios
        .post("/smsTemplate/remainingSms", {
          id: this.smsForm.agentId ,
        })
        .then(res => {
            this.smsNum = res.data.result;
        })
        .catch(error => {
          //捕获失败
        });


    },
    addphoneList() {
      let isMobile = /^1([35678][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
      if (isMobile.test(this.memberPhone)) {
        let arr = this.PhoneList.split(",");
        arr.map((item, index) => {
          if (item == "") {
            arr.splice(index, index + 1);
          }
        });
        arr.push(this.memberPhone);
        this.PhoneList = arr.toString();
        this.memberPhone = "";
      } else {
        this.$message.error("请输入正确的手机号！");
      }
    },
    selectMode() {
      this.modeList.map(item => {
        if (item.id == this.modeValue) {
          this.modeText = item.memo;
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
    },
    labelClose() {
      this.labelOpen = false;
      // this.checkList = [];
      // this.activeNames = [];
    },
    openSmsClose(){
      this.openSms = false;
    },
    selectBoxs(data,eq,eqs) {
      if(this.typeList[eq].list[eqs].isclass){
          this.typeList[eq].list[eqs].isclass = false;
      }else{
          this.typeList[eq].list[eqs].isclass = true;
      }
      let no = false;
      let indexs = 0;
      this.selectBox.map((item, index) => {
        if (item.labelName == data.labelName) {
          no = true;
          indexs = index;
        }
      });
      if (no) {
        this.selectBox.splice(indexs, 1);
      } else {
        this.selectBox.push(data);
      }
    },
    getProvince() {
      this.axios
        .post("linkage/getAllProvince", {})
        .then(res => {
          this.provinceList = res.data.result;
        })
        .catch(error => {
          //捕获失败
        });
    },
    selectProvince() {
      let provinceCode = this.form.province;
      this.axios
        .post("linkage/getCityByProvince", { provinceCode })
        .then(res => {
          this.cityList = res.data.result;
          this.form.city = this.cityList[0].code;
          this.selectcity();
        })
        .catch(error => {
          //捕获失败
        });
    },
    selectcity() {
      let cityCode = this.form.city;
      this.axios
        .post("linkage/getAreaByCity", { cityCode })
        .then(res => {
          this.areaList = res.data.result;
          this.form.area = this.areaList[0].code;
        })
        .catch(error => {
          //捕获失败
        });
    },
    //发送push
    senddeliveryJpush(){
     
      if(!this.modeText){
          this.$message.error("请选择短信模板！");
          return false;
       }
      let labelsArr = [];
      this.selectBox.map(item=>{
        labelsArr.push(item.labelId);
      })
      let labels =  labelsArr.join(',');
      let content = this.modeText;
      let paramJsons = JSON.stringify({
          labels: labels,
          province: this.form.province ,
          city:this.form.city ,
          area: this.form.area
      });
       if(!labels && !province ){
          this.$message.error("请至少选择省市区或者标签一项！");
          return false;
       }
        this.axios
        .post("sendJpush/deliveryJpush", { content , paramJsons , status: this.client  })
        .then(res => {
          this.areaList = res.data.result;
          this.form.area = this.areaList[0].code;
        })
        .catch(error => {
          //捕获失败
        }); 
    },

    sendSms(){
              let labelsArr = [[]];
        
              this.typeList.map(item=>{
                item.number = 0;
                item.arr = [];
                item.list.map(items=>{
                  this.selectBox.map(data=>{
                    if(items.labelId == data.labelId){
                      item.number ++;
                      item.arr.push(data.labelId);
                    }            
                  })
                })
              })
              this.typeList.map(item=>{
                if( item.number == 1 ){
                  labelsArr[0].push(item.arr[0]);
                }else if( item.number > 1 ){
                  labelsArr.push(item.arr);
                }
              })
              if(!labelsArr[0].length&&labelsArr.length <= 1){
                this.$message({ message: '至少选择一个用户标签',  type: 'error'  });
                return false;
              }
            let paramJsons = JSON.stringify({
                labels: JSON.stringify(labelsArr),
                province: this.form.province ,
                city:this.form.city ,
                area: this.form.area
            });

            let queryNameArr = [];
            this.selectBox.map(item=>{
              queryNameArr.push(item.labelName);
            })
            let queryName = queryNameArr.join(',');
          



         this.axios
        .post("smsTemplate/sendSmsToConsume", {  
          esQuery : paramJsons,
          queryName,
          dealerId: this.smsForm.agentId,
          smsSignId: this.smsForm.smsSignId,
          templateId: this.smsForm.templateId
          })
        .then(res => {
            if(res.code==1000){
              alert('发送成功！');
            }
        })
        .catch(error => {
          //捕获失败
        });          
    },
    pageChange(val){
      this.share(val)
    },
    //查询用户信息
    share(number){
      let labelsArr = [[]];
      this.pageNum = number;
      this.typeList.map(item=>{
        item.number = 0;
        item.arr = [];
        item.list.map(items=>{
          this.selectBox.map(data=>{
             if(items.labelId == data.labelId){
               item.number ++;
               item.arr.push(data.labelId);
             }            
          })
        })
      })
      this.typeList.map(item=>{
        if( item.number == 1 ){
          labelsArr[0].push(item.arr[0]);
        }else if( item.number > 1 ){
          labelsArr.push(item.arr);
        }
      })
      if(!labelsArr[0].length&&labelsArr.length <= 1){
        this.$message({ message: '至少选择一个用户标签',  type: 'error'  });
        return false;
      }
      //http://192.168.1.56:8711/crm/query/label
      this.axios
        .post("http://es.beibeiyue.com/es/crm/query/label", { labels: JSON.stringify(labelsArr) , province: this.form.province , city:this.form.city , area: this.form.area, pageNo: number, pageSize:this.pageSize })
        .then(res => {
          if(res.data.returnCode == 'SUCCESS'){
            this.memberList = res.data.result;
          
              this.total = res.data.total;
              this.totals = res.data.total;
           
            }else{
              this.$message({ message: res.data.returnMsg,  type: 'error'  });
            }
        })  
        .catch(error => {
          //捕获失败
        });

    }
  },


  mounted() {
    this.messageChannel();
 
    //this.getProvince();
    this.axios
      .post("/labelEditing/tabulationLabel", {})
      .then(res => {

        let data = res.data.result;

        for (var o in data) {
          let json = {};
          json.name = o;
          json.list = data[o];
          this.typeList.push(json);
        }
        console.log(this.typeList);
      })
      .catch(error => {
        //捕获失败
      });

    this.axios
      .post("/smsTemplate/selectSmsTemplate", {})
      .then(res => {
        this.modeList = res.data.result;
      })
      .catch(error => {
        //捕获失败
      });

  },
  //路由监听
  watch: {
    "$route.params.id": "getData",
    PhoneList(val) {
      let arr = this.PhoneList.split(",");
      arr.map((item, index) => {
        if (item == "") {
          arr.splice(index, index + 1);
        }
      });
      this.numberPhone = arr.length;
    },
    modeText(val) {
      this.modeLength = 60 - val.length;
    }

    // checkList(){
    //   console.log(this.checkList)
    // }
  }
};
</script>
