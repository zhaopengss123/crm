<template>
  <div class="el-content tack-list">
    <!-- <app-tip>任务列表</app-tip> -->
    <div class="formQuery clear">
      <div  v-if="!tcvs">
      <el-form :inline="true" ref="form" :model="form">
          <el-form-item label="用户查找">
            <el-input v-model="form.name" placeholder="请输入用户名称" ></el-input>
          </el-form-item>

           <el-form-item label="用户身份">
             <el-select v-model="form.havaCard" placeholder="请选择" >
              <el-option
                v-for="item in userType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

           <el-form-item label="门店类型">
              <el-select v-model="form.contractStatus" multiple  @change="changestatus()" placeholder="请选择门店类型">
              <el-option
                v-for="item in contractStatusList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select> 
          </el-form-item> 


               <el-form-item label="所属省份">
             <el-select v-model="form.province" placeholder="请选择" multiple  @change="selectProvince()">
              <el-option
                v-for="item in provinceList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>     
          </el-form-item>

           <el-form-item label="所属城市">
              <el-select v-model="form.city" multiple @change="changecity()"  placeholder="请选择所属省份">
              <el-option
                v-for="item in cityList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select> 
          </el-form-item>



           <el-form-item label="所属门店">
              <el-select v-model="form.storeId" multiple placeholder="请选择所属门店" >
              <el-option
                v-for="item in shopList"
                :key="item.storeId"
                :label="item.shopName"
                :value="item.storeId">
              </el-option>
            </el-select>          
          </el-form-item>  

           <el-form-item label="手机号">
            <el-input v-model="form.mobilePhone" placeholder="请输入用户手机号" ></el-input>
          </el-form-item> 

           <!-- <el-form-item label="年龄段">
             <el-select v-model="form.age" placeholder="请选择" >
              <el-option
                v-for="item in ageList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>  
           -->
        <el-form-item label="年龄段">                            
         <el-date-picker
          v-model="form.age"
          type="daterange"
          unlink-panels
          :clearable="false"
          value-format="yyyy-MM-dd"
          range-separator="~"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        </el-form-item>
      </el-form>
      <div class="operateBox">
          <el-button size="medium" type="primary" @click="share()">筛选</el-button>
          <el-button size="medium" @click="clearQuery">清空筛选条件</el-button>
          <el-button size="medium" @click="getData(false)" v-loading.fullscreen.lock="fullscreenLoading" type="info">创建回访名单</el-button>
      </div>
    </div>
    <div class="table-wrap">
          <el-table
            ref="multipleTable"
            v-loading="loading"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%">

            <el-table-column
              label="姓名"
              prop="name">
            </el-table-column>
            <el-table-column
              prop="mobilePhone"
              label="手机号">

              <template slot-scope="scope">
                <el-button type="text" v-if="!scope.row.isPhone" size="small" @click="scope.row.isPhone = true">查看</el-button>
                {{  scope.row.isPhone ? scope.row.mobilePhone: '' }}
              </template>
            </el-table-column>
            <el-table-column
              prop="babyNumber"
              label="宝宝类型">
            </el-table-column>
            <el-table-column
            prop="sex"
            label="性别">
          </el-table-column>    
            <el-table-column
              label="身份">
                <template slot-scope="scope">
                    {{scope.row.havaCard == 0 ?  '非会员' : '会员'}}
                </template>
            </el-table-column>
            <el-table-column
                label="会员卡状态">
                  <template slot-scope="scope">
                      {{scope.row.cardStatus == 0 ?  '有效' : ''}}
                  </template>
              </el-table-column>                
            <el-table-column
                label="会员卡剩余次数">
                  <template slot-scope="scope">
                      {{scope.row.cardNumbers ?  scope.row.cardNumbers : ''}}
                  </template>
              </el-table-column> 
            <el-table-column
              prop="loginDate"
              label="近期APP登录">
            </el-table-column>  
            <el-table-column
              prop="reserveDate"
              label="近期预约时间">
            </el-table-column>  
  
            <el-table-column
              fixed="right"
              label="操作"
              width="120">
              <template slot-scope="scope">
                <!-- <el-button type="text" size="small">发短信</el-button>  -->
                <el-button type="text" size="small" @click="jumpFn(scope.row.id)">查看</el-button>
              </template>
            </el-table-column>                                                                                                          
          </el-table>  
    </div>

  <!-- 分页 -->
      <div class="pagination"><el-pagination background layout="total , prev, pager, next" :total="total" @current-change="pageChange" :current-page.sync="pageNum"></el-pagination></div>
  <!-- <app-pagination requestUrl="/mission/missionList" @response="getData" :query="form" ref="pagination"></app-pagination> -->

      <el-dialog
        title="设置回访名单"
        :visible.sync="showReturn"
        width="700px"
        :before-close="handleClose">
          <div class="show">
            <div> 
              <el-input v-model="visitName" style="width:300px" placeholder="请输入回访名单名称" ></el-input>
             </div> 
             <div v-if="form.name">
               用户名称：{{ form.name }}
             </div>
             <div v-if="form.havaCard == 1 || form.havaCard == 0">
               用户身份：{{ form.havaCard == 1 ? '会员' : '非会员' }}
             </div>          
             <div v-if="form.mobilePhone">
               用户手机号：{{ form.mobilePhone }}
             </div>
             <div v-if="statusList.length">
               门店类型：<el-tag type="warning" style="margin-bottom:10px;"  v-for="(item,index) in statusList" :key="index">{{ item.name }}</el-tag>
             </div>   
             <div v-if="provinceLists.length">
               所属省份：<el-tag style="margin-bottom:10px;" v-for="(item,index) in provinceLists" :key="index">{{ item.name }}</el-tag>
             </div>
             <div v-if="cityLists.length">
               所属城市：<el-tag type="success" style="margin-bottom:10px;" v-for="(item,index) in cityLists" :key="index">{{ item.name }}</el-tag>
             </div>
             <div v-if="shopLists.length">
               所属门店：<el-tag type="warning" style="margin-bottom:10px;"  v-for="(item,index) in shopLists" :key="index">{{ item.shopName }}</el-tag>
             </div> 
            <div v-if="form.age.length">
                年 龄 段 ：{{ form.age[0] }} — {{ form.age[1] }}
             </div> 
             <div style="font-size:12px; color:#999;"><i style="color:red;">*</i>点击保存后，以上全部客户信息将转移到该回访名单名称内哦</div>
          </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showReturn = false">取 消</el-button>
          <el-button type="primary" :loading="loadingBtns" @click="creats()">确 定</el-button>
        </span>
      </el-dialog>
      </div>
      <div class="tcvs" v-if="tcvs">
       <div style="padding:10px;"><el-button   size="medium" round icon="el-icon-arrow-left" @click="tcvs=false;memberIds=0; ">返回</el-button></div>
       <Detail v-if="memberIds!=0&&tcvs" :memberIdx="memberIds" > </Detail>
      </div>
  </div>
 
</template>
<style lang="less" scoped>
.tack-list {
  .scopeName {
    color: #409eff;
    cursor: pointer;
  }
  .scopeName:hover {
    text-decoration: underline;
  }
  .curHand {
    cursor: pointer;
  }
  .cell .el-button {
    padding: 9px 12px;
  }
  .font-size-18 {
    font-size: 18px !important;
  }
  .color-red {
    color: #fa5555;
  }
  .color-blue {
    color: #409eff;
    &:hover {
      text-decoration: underline;
    }
  }
  .operateBox {
    float: none;
    margin-bottom: 40px;
  }
  .line {
    text-align: center;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .red {
    color: #f00;
  }
  .font-18 {
    font-size: 22px;
  }
  .el-icon-star-on {
    color: red;
  }
  .el-table th > .cell,
  .el-table td div,
  .el-table td .cell {
    word-break: keep-all;
  }
  .el-form-item{
    margin-left: 10px;
  }
    .pagination{
    margin-top: 20px;
    text-align: right;
  }
  .show>div{
    margin-bottom: 20px;
  }
  .show .el-tag{
    margin-right: 20px;
  }
  .tcvs{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left: 0;
    z-index:10000;
    background: rgb(255, 255, 255);

  }
}
</style>
<script>
import PaginationComponent from "@/components/pagination";
import LaunchDetailComponent from '@views/launch/launch-detail';
import {formatDate} from '../../filter/format.js';
export default {
  filters:{

      formatDate(time) {
      
      var date = new Date(time);
      
      return formatDate(date, 'yyyy-MM-dd hh:mm');
      
      }

  },
  components: {
    appPagination: PaginationComponent,
    'Detail': LaunchDetailComponent 
  },
  data() {
    return {
      memberIds:0,
      form: {
        age:[]
      },
      fullscreenLoading:false,
      loadingBtns:false,
      tcvs:false,
      showReturn:false,
      restaurants: [],
      visitName:'',
      status: 0,
      pageNum:1,
      pageSize:10,
      total:1,
      provinceList: [],
      cityList: [],
      contractStatusList:[{
          code:0,
          name:'正常'
      },{
          code:1,
          name:'合同到期'        
      },{
        code:2,
        name:'解约'
      },{
        code:3,
        name:'转店中'
      }],
      tableData:[],
      arrDate:'',
      ageList:[{
        label:'0-1岁',
        value:'0' 
      },{
        label:'1-2岁',
        value:'1' 
      },{
        label:'2-3岁',
        value:'2' 
      },{
        label:'3-4岁',
        value:'3' 
      },{
        label:'4-5岁',
        value:'4' 
      },{
        label:'5-6岁',
        value:'5' 
      },{
        label:'6-12岁',
        value:'6' 
      }],
      userType:[{
        label:'会员',
        value:1        
      },{
        label:'非会员',
        value:0
      }],
      shopList:[],
      provinceLists:[],
      cityLists:[],
      shopLists:[],
      statusList:[],
      loading:false
         
    };
  },
  methods: {
    //创建回访

    creats(){
        if(!this.visitName ){
            this.$message('请输入回访名单名称');
            return false;
        }
      let queryCriteria = JSON.stringify({
          provinceLists: this.provinceLists,
          cityLists:this.cityLists,
          shopLists: this.shopLists,
          age: this.form.age,
          province: this.form.province,
          city: this.form.city,
          name: this.form.name ,
          havaCard:  this.form.havaCard == 1 ? '会员' : (this.form.havaCard == 0 ? '非会员':''),
          mobilePhone: this.form.mobilePhone,
          contractStatus: this.form.contractStatus
      });
          
      let forms = JSON.parse(JSON.stringify(this.form));
            forms.province = forms.province.join(',');
            forms.city = forms.city.join(',');
            forms.contractStatus = forms.contractStatus.join(',');
            forms.storeId = forms.storeId.join(',');
            forms.storeList = forms.storeId ? forms.storeId : null;
            forms.bStart = this.form.age[0];
            forms.bEnd = this.form.age[1];
            forms.visitName = this.visitName;
            forms.queryCriteria = queryCriteria;
            delete forms['age']
            if(!forms.province){delete forms['province']}; 
            if(!forms.city){delete forms['city']};
            if(!forms.storeId){delete forms['storeId']};
            if(!forms.contractStatus){delete forms['contractStatus']};
            let paramJson = JSON.stringify(forms);  
    
    this.loadingBtns = true;
     this.axios.post('/store/listMemberNoPage', {
        paramJson
      }).then(res => {
          this.loadingBtns = false;
          this.showReturn = false;
          if(res.data.code == 1000){
               this.$message({
                  message: '操作成功！',
                  type: 'success'
                });
                setTimeout(function(){
                     location.reload();
                },1000);
          }else{
              this.$message({ message: res.data.info });
          }
      }).catch(error => { //捕获失败
      })
    },
    creatVisit(){
         
        this.provinceLists = [];
        this.provinceList.map(item=>{
          this.form.province.map(items=>{
            if(item.code == items){
              this.provinceLists.push(item);
            }
          })
        })
        this.cityLists = [];
         this.cityList.map(item=>{
         this.form.city.map(items=>{
            if(item.code == items){
              this.cityLists.push(item);
            }
          })
        })
        this.shopLists = [];
         this.shopList.map(item=>{
         this.form.storeId.map(items=>{
            if(item.storeId == items){
              this.shopLists.push(item);
            }
          })
        })        
         this.statusList = [];
         this.contractStatusList.map(item=>{
         this.form.contractStatus.map(items=>{
            if(item.code == items){
              this.statusList.push(item);
            }
          })
        }) 

        
        this.showReturn = true;
        
    },
    handleClose(){
        this.showReturn = false;
    },
    changecity(){
        if(this.form.city.length || this.form.contractStatus.length){
            this.getShoplist();
        }
    },
    changestatus(){
      if(this.form.city.length || this.form.contractStatus.length){
          this.getShoplist();
      }
    },
    getShoplist(){
      let forms = JSON.parse(JSON.stringify(this.form));
      forms.city = forms.city.join(',');
      forms.contractStatus = forms.contractStatus.join(',');
      this.axios.post('/store/listShopByCity', {
        city: forms.city,
        contractStatus: forms.contractStatus
      }).then(res => {
        this.shopList = res.data.result.shop;
      }).catch(error => { //捕获失败
      })
    },
      handleSelect(item) {
        console.log(item);
      },

    //状态跳转
    jumpFn(id) {
         //this.$router.push({ path: "/home/launchDetail/" + id });
        this.tcvs = true; 
        this.memberIds = id;
    },
    getProvince(){
      this.axios.post('linkage/getAllProvince', {}).then(res => {
        this.provinceList = res.data.result;
      }).catch(error => { //捕获失败
      })
    },
    selectProvince(){
        let provinceCodes = this.form.province;  
        this.cityList = [];
        provinceCodes.map( item=> {
            this.axios.post('linkage/getCityByProvince', { provinceCode: item }).then(res => {
               res.data.result.map( items=>{
                  this.cityList.push(items);
               }) 
            }).catch(error => { //捕获失败
            })
        })
        

    },
    selectShopList(){
        this.axios.post('/store/listShop', { city: this.form.city }).then(res => {
          this.shopList = res.data.result.shop;
        }).catch(error => { //捕获失败
        })
    },
    share(){
      this.pageNum = 1;
      this.getData(true);
    },
    clearQuery(){
       this.form = { age:[], province:[], city:[], contractStatus:[], storeId:[]};
      this.arrDate = [];
    },
    getData(xstatus){
      if(!xstatus){
          this.fullscreenLoading = true;
      }
      this.loading = true;
      let arrNum = ['一','二','三','四','五','六'];
      let forms = JSON.parse(JSON.stringify(this.form));
      forms.province = forms.province.join(',');
      forms.city = forms.city.join(',');
      forms.contractStatus = forms.contractStatus.join(',');
      forms.storeList = forms.storeId.join(',');
      forms.storeList = forms.storeList ? forms.storeList : null;
      forms.bStart = this.form.age[0];
      forms.bEnd = this.form.age[1];
      delete forms['age']
      if(!forms.province){delete forms['province']}; 
      if(!forms.city){delete forms['city']};
      if(!forms.storeList){delete forms['storeList']};
      if(!forms.contractStatus){delete forms['contractStatus']};
      let paramJson = JSON.stringify(forms);
       this.axios.post('/store/listMember', { paramJson,pageNum: this.pageNum, pageSize: this.pageSize }).then(res => {
         this.loading = false;
         this.fullscreenLoading = false;
            if(xstatus){
            this.tableData = res.data.result.member;
              this.total = res.data.result.count;
              this.tableData.map( item=>{
                if(item.babyNumber){
                 item.babyNumber  =  arrNum[item.babyNumber-1] + '胞胎';
                 }else{
                    item.babyNumber = "";
                 }
              });
            }else{
              if(res.data.result.count>0){
                  
                    if(!(this.form.province.length || this.form.city.length || this.form.storeId.length || this.form.age.length || this.form.name || this.form.havaCard == 1 || this.form.havaCard == 0 || this.form.mobilePhone || this.form.contractStatus.length  ))
                    {
                        this.$message({  message: '查询条件不能为空！' }); 
                        return false;
                    }else{
                        this.creatVisit();
                    }
              }else{
                  this.$message('没有数据~');
              }
            }
          }).catch(error => { //捕获失败
        })
    },
    timeChange(){
      this.form.startDate = this.arrDate[0];
      this.form.endDate = this.arrDate[1];
    },
    pageChange(val){
        this.pageNum = val;
        this.getData(true);
    }
   
  },
  mounted() {
    this.getProvince();
    //this.getData(true);
    
  }
};
</script>



