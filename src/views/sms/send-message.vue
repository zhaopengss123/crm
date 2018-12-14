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
                <el-button  type="primary">查询</el-button>
              </el-row>
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
           <span>剩余短信条数:{{smsNumber}}</span>
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
            <div class="sendBtn">
              <el-button  type="primary" :loading="loading">一键发送短信</el-button>
              <el-button  type="primary" :loading="loading">一键发送push</el-button>
            </div>     
        </el-card> 
     
        <el-dialog
        title="选择标签"
        :visible.sync="labelOpen"
        width="500px"
        :before-close="labelClose">
            <el-collapse v-model="activeNames" >
              <el-checkbox-group v-model="checkList"> 
              <el-collapse-item  v-for="(item,index) in typeList" :key="index" :name="index" :title="item.name" >
                    <span v-for="(data,indexs) in item.list" :key ="indexs" style="padding: 0 10px;">
                      <el-checkbox :label="data.labelName" :key="data.labelId" @change="selectBoxs(data)" ></el-checkbox>
                    </span> 
              </el-collapse-item>
                </el-checkbox-group> 
            </el-collapse>
        <span slot="footer" class="dialog-footer">
          <el-button @click="labelClose">取 消</el-button>
          <el-button type="primary" @click="labelOpen = false">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<style lang="less">
.send-message {
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
    width: 360px;
    margin: 0 auto;
    padding: 10px 0;
    padding: 10px 0 0 20px;
    overflow: hidden;
  }
  // .scope .el-select{
  //   margin-left: 20px;
  // }
  .scope .el-col {
    width: auto;
    float: left;
    margin-right: 20px;
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
      modeText: "",
      modeLength: 60,
      form: {},
      options: [],
      labelOpen: false,
      client: "",
      clientList: [
        {
          label: "IOS",
          value: "IOS"
        },
        {
          label: "安卓",
          value: "安卓"
        },
        {
          label: "全部",
          value: "其他"
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
      areaList: []
    };
  },
  methods: {

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
    selectBoxs(data) {
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
    }
  },

  mounted() {
    this.getProvince();
    this.axios
      .post("/labelEditing/tabulationLabel", {})
      .then(res => {
        //this.typeList = res.data.result;
        //  this.typeList.map(item=>{

        //           this.axios.post('/labelEditing/initLabel', { labelTypeId: item.typeId }).then(res => {
        //             item.arr = res.data.result;
        //           }).catch(error => { //捕获失败
        //           })

        // })
        let data = res.data.result;
        // for(let i = 0; i<data.length; i++){
        //   console.log(data[i]);
        // }
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
