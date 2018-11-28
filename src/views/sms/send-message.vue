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
            <el-row>
              <el-col>
                    <span>标签一：</span>
                     <el-select v-model="client" placeholder="请选择">
                      <el-option
                        v-for="item in clientList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
              </el-col>
              <el-col>
                    <span>标签二：</span>
                     <el-select v-model="client" placeholder="请选择">
                      <el-option
                        v-for="item in clientList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
              </el-col>
              <el-col>
                <el-button   type="primary" :loading="loading">添加收件人</el-button>
              </el-col>
              <!-- <el-col>
                    <span>用户类型：</span>
                     <el-select v-model="memberType" placeholder="请选择">
                      <el-option
                        v-for="item in memberTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
              </el-col>         
              <el-col>
                    <span>标签类型：</span>
                     <el-select v-model="memberType" placeholder="请选择">
                      <el-option
                        v-for="item in memberTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
              </el-col>                     -->
            </el-row>
          </div> 
        </el-card>

        <el-card class="box-card" style="margin-top:10px;">
          <div slot="header" class="clearfix">
            <span>添加收件人：</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="dialogVisible = true">使用说明</el-button>
          </div>
    
          <div class="main">
            <!-- <div class="operation" v-if="switchValue">
              <span>添加联系人： </span>
              <el-input v-model="memberPhone" placeholder="请输入手机号" ></el-input>
              <el-button type="primary" round size="medium" @click="addphoneList">添加</el-button>
            </div>  -->
            
             <el-row >
                  联系人列表
             </el-row>
             <el-row style="color:red; font-size:12px" >群发短信时，以,间隔每个客户，如15888886666,15999996666( 注：注意是英文逗号哦~ )</el-row>
             <el-row style="margin-top:10px;">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 100}"
                    :placeholder="!switchValue? '请输入用户手机号': '' "
                    v-model="PhoneList">
                </el-input>  
             </el-row>
             <el-row style="font-size:12px; color:#999; padding-top:15px;">共{{numberPhone}}个手机号 </el-row>
          </div> 
        </el-card>
        <el-card class="box-card" style="margin-top:10px;">
          <div slot="header" class="clearfix">
            <span>设置短信模板：</span> 
              <el-select v-model="modeValue" @change="selectMode" placeholder="请选择模板">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            <el-button style="float: right; padding: 3px 0" type="text">设置模板</el-button>
          </div>
          <div class="main">
           <span>剩余短信条数:{{smsNumber}}</span>
             <el-row style="margin-top:10px;">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 4, maxRows: 100}"
                    placeholder="请选择短信模板"
                    v-model="modeText">
                </el-input>  
             </el-row> 
              <el-row style="font-size:12px; color:#999; padding-top:15px;">还可以输入{{modeLength}}个字</el-row>
            </div>          
        </el-card> 
        <div class="sendBtn">
          <el-button   type="primary" :loading="loading">确认发送</el-button>
        </div>

  </div>
</template>
<style lang="less">
.send-message{
  .operation{
    width: 100%;
  }
  .operation>span{
    font-size: 14px;
  }
  .operation>.el-input{
    width:300px;
  }
  .operation>.el-button{
    margin-left: 20px;
  } 
  .box-card:last-child{
    margin-top: 20px;
  }
  .sendBtn .el-button:last-child{
    display: block;
    margin: 0 auto;
    margin-top: 20px;
  }
  .sendBtn{
    background: #fff;
    padding: 10px 0;
    border-radius: 10px;
    margin-top: 10px;
    box-shadow: 5px 5px 5px #eee;
  }
  // .scope .el-select{
  //   margin-left: 20px;
  // }
  .scope .el-col{
    width:auto;
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
        dialogVisible: false,
        loading:false,
        memberPhone:'',
        PhoneList:'',
        switchValue:true,
        numberPhone:0,
        modeValue:'',
        smsNumber:0,
        modeText:'',
        modeLength:60,
        form:{},
        options: [{
          value: '选项1',
          label: '黄金糕',
          text:'大萨达撒多撒多撒大所多撒多撒多撒多撒多撒多撒多撒多撒多所大所多撒多撒多撒多所大萨达撒多撒大所11111'
        }, {
          value: '选项2',
          label: '双皮奶',
          text:'大萨达撒多撒多撒大所多撒多撒多撒多撒多撒多撒多撒多撒多所大所多撒多撒多撒多所大萨达撒多撒大所2222'
        }, {
          value: '选项3',
          label: '蚵仔煎',
          text:'大萨达撒多撒多撒大所多撒多撒多撒多撒多撒多撒多撒多撒多所大所多撒多撒多撒多所大萨达撒多撒大所3333'
        }, {
          value: '选项4',
          label: '龙须面',
          text:'大萨达撒多撒多撒大所多撒多撒多撒多撒多撒多撒多撒多撒多所大所多撒多撒多撒多所大萨达撒多撒大所4444'
        }, {
          value: '选项5',
          label: '北京烤鸭',
          text:'大萨达撒多撒多撒大所多撒多撒多撒多撒多撒多撒多撒多撒多所大所多撒多撒多撒多所大萨达撒多撒大所5555'
        }],
        client: '',
        clientList: [{
          label:'IOS',
          value:'IOS'
        },{
          label:'安卓',
          value:'安卓'          
        },{
          label:'其他',
          value:'其他'          
        }],
        memberType: '',
        memberTypeList: [{
          label:'会员',
          value:'1'
        },{
          label:'非会员',
          value:'0'
        }]
    };
  },
  methods: {
      addphoneList (){
          let isMobile = /^1([35678][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/;
          if (isMobile.test(this.memberPhone)) {
    
          let arr = this.PhoneList.split(',');
          arr.map( (item,index)=>{
              if(item==""){
                arr.splice(index,index+1);
              }
          })
          arr.push(this.memberPhone);
          this.PhoneList  = arr.toString();
          this.memberPhone = '';
          }else{
             this.$message.error('请输入正确的手机号！');
          }
      },
      selectMode(){
        this.options.map(item =>{
           if(item.value == this.modeValue){
              this.modeText = item.text;
           }
        })
      },
    handleClose(){
      this.dialogVisible = false;
    }
  },

  mounted(){
   
 
  },
  //路由监听
  watch:{
    "$route.params.id": "getData",
    PhoneList(val){
         let arr = this.PhoneList.split(',');
          arr.map( (item,index)=>{
              if(item==""){
                arr.splice(index,index+1);
              }
          })
        this.numberPhone = arr.length;
    },
    modeText(val){
      this.modeLength = 60 - val.length; 
 
    }
  },

};
</script>
