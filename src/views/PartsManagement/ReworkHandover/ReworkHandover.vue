<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{showBack:false}"  @on-click-back="goIndex" style="background-color:#22292C">
            <a slot="left" @click="goIndex">
                <span style="font-size:26px;" class="iconfont icon-weibiaoti-"></span>
            </a>
                外发维修
            <!-- <a slot="right">取消</a> -->
            <a slot="right" @click="doPost" :class="{'f-noclick':showThost}">提交</a>
        </x-header>
        <div class="f-flexvw f-flexg1">
            <div class="g-inp" style="min-height: 100px;">
                <div class="m-inp f-mtb5">
                    <span class="laber">条码</span>
                    <span class="inp s-inpbg">
                        <input class="s-inpbg" v-model="BarCode" type="text" @keyup.enter="getBarCode()" ref="barinput">
                    </span>
                    <!-- oninput="if(value>1000)value=1000;" -->
                    <span class="inp2 s-bgwhile f-ml10"><input v-model="numbers" type="number" @keyup.enter="getEnter()" :disabled="NoShowNum" oninput="value=value.replace(/^(0+)|[^\d]+/g,'');if(value>1000)value=1000;"></span>
                </div>

                <div class="m-workshop f-mtb5">
                    <div class="box">
                        <div class="laber">供应商</div>
                        <div>
                            <!-- @input="getSupplier" -->
                            <input v-model="SupplierCode" type="text" @keyup.enter="getSupplier()"  class="inp s-bgwhile">
                        </div>
                    </div>
                    
                    <!-- <div class="showworkshop" style="overflow: scroll">{{SupplierName}}</div> -->
                    <input class="showworkshop" type="text" v-model="SupplierName" disabled>
 
                </div>
                <div class="m-workshop f-mtb5">
                    <div class="box" >
                        <div class="laber">使用人</div>
                        <div  @click="goChoicePeople">
                            <!-- {{User}} -->
                            <input type="text" class="inp s-bgwhile" v-model="User" disabled>
                        </div>
                        <!-- <input class="inp s-bgwhile" type="text" v-model="User" disabled> -->
                    </div>
                    
                    <div class="box">
                        <!-- <div class="laber">类型</div> -->
                        <!-- <div>
                            <input type="text" @keyup.enter="getEnter()" class="inp s-bgwhile" @focus="getFocus()" @blur="getBlur()">

                        </div> -->
                        <x-switch style="font-size: 16px;padding:0 10px;" title="类型" :value-map="['修磨','补齿']" v-model="Type" @on-change="changeSwitch"></x-switch>
                        <div style="font-size: 16px;">{{Type}}</div>
                    </div>
 
                </div>
                
            </div>
            <div class="g-scrollbox">
                
                <div style="overflow-y: scroll;">
                    <s-messageheader class="f-mt10" messagetitle="条码信息" v-show="PartsList.length>0"></s-messageheader>
                    <swipeout>
                        <swipeout-item v-for="(item,index) in PartsList" :key="index" @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
                            <div slot="right-menu" style="padding:5px 0;">
                            <swipeout-button @click.native="onButtonClick(index)" type="warn">删除</swipeout-button>
                            </div>
                            <div slot="content" class="f-pd5 vux-1px-t">
                                <div class="m-listbox">
                                    <div class="num">
                                        {{PartsList.length-index}}
                                    </div>
                                    <div class="showbox">
                                        <div class="showlistmsg">
                                            <span class="label">序列号:</span>
                                            <span class="showmsg">{{item.No}}</span>
                                        </div>
                                        
                                        <div class="rowtwo">
                                            <div class="showlistmsg">
                                                <span class="label">物料:</span>
                                                <span class="showmsg">{{item.Item}}</span>
                                            </div>
                                            <div class="showlistmsg">
                                                <span class="label">类型:</span>
                                                <!-- <span class="showmsg" v-show="NoShowNum">{{item.Type}}</span> -->
                                                <span class="showmsg" v-show="item.Type==0">修磨</span>
                                                <span class="showmsg" v-show="item.Type==1">补齿</span>
                                            </div>
                                        </div>
                                        <div class="rowtwo">
                                            <div class="showlistmsg">
                                                <span class="label">供应商:</span>
                                                <span class="showmsg">{{item.Supplier}}</span>
                                            </div>
                                            <div class="showlistmsg">
                                                <span class="label">数量:</span>
                                                <span class="showmsg">{{item.Qty}}</span>
                                                <!-- <span class="showmsg" v-show="ShowNum"><input type="number"></span> -->
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </swipeout-item>
                    </swipeout>
                </div>
            </div>

        </div>
        <s-confirm 
        v-model="ShowConfirm" 
        :content="ConfirmMsg" 
        :showConfirmButton='false' 
        :showCancelButton='false' 
        :showSuccessButton='Successbtn'
        :showDangerButton='Dangerbtn'
        @on-cancel="onCancel" 
        @on-confirm="onConfirm">
        </s-confirm>
        <!-- 弹出物料编码，进行选择 -->
        <!-- <div v-transfer-dom>
            <popup v-model="ShowPeople" height="100%">     
                <choice-people @choicePeople='choicePeople' @comeBack='comeBack'></choice-people>   
            </popup>
        </div> -->
        
        <toast width='12em' v-model="showPositionValue" type="text" :time="2500" :text="Msg" position="middle"></toast>
        <!-- <s-loading v-show="showThost" :title="loadingtitle" :img="true" :transition="true"></s-loading> -->

        <loading :show="showThost" :text="loadingtitle"></loading>
    </div>
</template>

<script type="text/ecmascript-6">
import ChoicePeople from './ChoicePeople'
export default {
    name: 'ReworkHandover',
    data() {
        return {
            Successbtn:false,
            Dangerbtn:false,
            showPositionValue:false,
            Msg:'',
            ShowPeople:false,
            ShowNum:false,
            NoShowNum:true,
            ShowConfirm:false,
            ControlConfirm:false,
            ConfirmMsg:'',
            PartsList: [
            ],
            BarCode:null,       //条码
            numbers:1,          //输入的数量
            SupplierId:null,      //供应商Id
            SupplierCode:null,      //供应商
            SupplierName:null,      //供应商名字
            User:null,              //使用人
            UserId:null,              //使用人Id
            Type:'修磨',            //类型，一进来，默认为修磨
            TypeNum:0,

            showThost:false,
            loadingtitle:'提交中',
        }
    },
    components: {
        ChoicePeople
    },
    watch: {
        //监听类型的变化
        Type(val){
            //   当类型为补齿的时候，我们扫描条码，带出单据的具体信息。
            //   当我们输入数值时，给当前单据的数值复制。
            if(this.Type=='补齿'){
                console.log(val);
                this.TypeNum=1
                return
            }
            if(this.Type=='修磨'){
                console.log(val);
                this.TypeNum=0
                return
            }
        },
        // numbers(val){
        //     if(val==0){
        //         this.numbers=null
        //     }
        // }
    },
    //我们在页面上使用了keepalive，所以可以在这里获取到仓库里面的数据。
    beforeRouteEnter(to, from, next) {
        next(vm=>{          //  这里的vm指的就是vue实例，可以用来当做this使用
            console.log(from)
            if(from.name=='ChoicePeople'){
                console.log(vm.$store.getters.getUserpeople);
                vm.User=vm.$store.getters.getUserpeople.Name
                vm.UserId=vm.$store.getters.getUserpeople.Id
            }
        })
    },
    methods: {
        goChoicePeople(){
            this.$router.push({name:'ChoicePeople'})
        },
        //获取扫描的条码
        getBarCode(){
            console.log(this.BarCode);
            console.log(this.TypeNum);
            console.log(this.numbers);
            if(this.BarCode==null ||this.BarCode==''){
                this.showPositionValue=true
                this.Msg='条码不能为空'
                return
            }
            if(this.numbers==null ||this.numbers==''){
                this.showPositionValue=true
                this.Msg='数量不能为空'
                return
            }
            for(let i=0;i<this.PartsList.length;i++){
                if(this.PartsList[i].No==this.BarCode && this.PartsList[i].Type==this.TypeNum){
                    this.showPositionValue=true
                    this.Msg='此条码已存在'
                    this.BarCode=null
                    return
                }
            }
            this.scanRepairBarcode(0,this.BarCode,this.numbers,this.TypeNum)
        },
        //获取供应商,当输入的供应商改变时，进行查询供应商名称
        getSupplier(){
            if(this.SupplierCode==null || this.SupplierCode==''){
                this.showPositionValue=true
                    this.Msg='供应商不能为空'
                    return
            }
            this.getRepairSupplier(this.SupplierCode)
        },
        //点击返回菜单页
        goIndex(){
            this.$store.dispatch('removeKeepAlive', 'ReworkHandover')
            this.$store.dispatch('changeUserInfo',{attr:'userpeople',val:{}});
            this.$router.push({name:'BaseIndex'})
        },
        //触发单项左右滑动
        handleEvents(type){
            console.log(type);
        },

        //点击删除按钮，删除当前项
        onButtonClick(index){
            console.log(index);
            this.PartsList.splice(index,1)
        },

        //获取焦点事件
        getFocus(){
            console.log('获取焦点事件');
        },
        //失去焦点事件
        getBlur(){
            console.log('失去焦点事件');
        },
        //键盘回车事件
        getEnter(){
            console.log('键盘回车事件');
            console.log(this.numbers);
        },

        //点击提示弹窗的删除按钮
        onCancel(){
            this.Successbtn=false
            this.Dangerbtn=false
            this.ShowConfirm=false
            console.log('返回');
        },
        //点击提示弹窗的确认按钮
        onConfirm(){
            this.Successbtn=false
            this.Dangerbtn=false
            this.ShowConfirm=false
            // console.log('继续执行');
            if(this.ControlConfirm==true){
                this.scanRepairBarcode(1,this.BarCode,this.numbers,this.TypeNum)
                this.ControlConfirm=false
            }
            
        },
        //点击提交按钮
        doPost(){
            // console.log(333);
            if(this.PartsList.length<=0){
                this.showPositionValue=true
                    this.Msg='提交数据不能为空'
                    return
            }
            if(this.SupplierId==null || this.SupplierId==''){
                this.showPositionValue=true
                    this.Msg='供应商不能为空'
                    return
            }
            if(this.UserId==null || this.UserId==''){
                this.showPositionValue=true
                    this.Msg='使用人不能为空'
                    return
            }
            // console.log('刀体信息'+JSON.stringify(this.PartsList));
            // console.log('供应商id'+JSON.stringify(this.SupplierId));
            // console.log('使用人id'+JSON.stringify(this.UserId));
            // console.log('类型'+JSON.stringify(this.TypeNum));
            // console.log('操作员'+JSON.stringify(this.$store.getters.getUserId));
            // this.ShowConfirm=true
            this.submitKnifeRepair(this.PartsList,this.SupplierId,this.UserId,this.TypeNum,this.$store.getters.getUserId)
        },

        //当类型的值变化时，执行此方法
        changeSwitch(value){
            console.log(value);
            if(value=='修磨'){
                this.numbers=1,
                this.NoShowNum=true
                this.ShowNum=false
                return
            }
            if(value=='补齿'){
                this.numbers=1,
                this.NoShowNum=false
                this.ShowNum=true
                return
            }
        },
        //选择人员并赋值
        choicePeople(item){
            this.ShowPeople=false
            this.User=item.Name
            this.UserId=item.Id
        },
        //关闭人员的弹窗
        comeBack(){
            this.ShowPeople=false
        },
        //获取供应商的接口
        getRepairSupplier(code){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.getRepairSupplier(code).then(res=>{
                this.showThost=false
                console.log(res);
                if(res.Success==true){
                    this.SupplierName=res.Result.Name
                    this.SupplierId=res.Result.Id 
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
            })
        },
        //扫描条码，获取数据的接口
        scanRepairBarcode(flag,barcode,qty,type){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.scanRepairBarcode(flag,barcode,qty,type).then(res=>{
                this.showThost=false
                console.log(res);
                if(res.Success==true){
                    // this.SupplierName=res.Result.Name
                    if(res.Result.IsSuccess==false){
                        this.Successbtn=true
                        this.Dangerbtn=true
                        this.ShowConfirm=true
                        this.ConfirmMsg=res.Result.Msg
                        this.ControlConfirm=true
                    }else{
                        this.BarCode=null
                        this.PartsList.unshift(res.Result)
                    }
                }else{
                    this.BarCode=null
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
            })
        },
        //提交信息接口
        submitKnifeRepair(knifeData,supplierId,userId,type,operatorId){
            this.loadingtitle='提交中'
            this.showThost=true
            this.$axiosApi.submitKnifeRepair(knifeData,supplierId,userId,type,operatorId).then(res=>{
                console.log(res);
                this.showThost=false
                if(res.Success==true){
                    this.Successbtn=true
                    this.ShowConfirm=true
                    this.ConfirmMsg='提交成功'
                    this.PartsList=[]
                }else{
                    this.Dangerbtn=true
                    this.ShowConfirm=true
                    this.ConfirmMsg=res.Message
                }
            })
        },
    },
    mounted () {
        // if(this.$route.params.choicepeople){
        //     this.User=this.$route.params.choicepeople.Name
        // }
        this.$store.dispatch('addKeepAlive', 'ReworkHandover')
        console.log(this.$route);
        console.log(this.$store.getters.getUser);
        if(this.$store.getters.getUser){
            this.User=this.$store.getters.getUser.Name
        }
        this.$refs.barinput.focus()
    }
}
</script>

<style lang="less">
.vux-x-icon{
    color: white;
}
.vux-x-switch.weui-cell_switch{
    display: flex;
    flex-direction: row;
    align-items: center;
}
.weui-cell__bd{
    display: block;
    height: 18px;
    width: 20%;
    min-width: 54px;
    font-size: 16px;
    line-height: 18px;
    text-align: right;
    padding-right: 10px;
}
</style>
