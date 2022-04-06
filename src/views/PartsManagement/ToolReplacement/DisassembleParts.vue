<template>
    <div class="g-index">
        <!-- 头部 -->
        <!-- <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            更换配件信息
            <a slot="right" @click="doPost">提交</a>
        </x-header> -->
        <x-header class="m-header" :left-options="{showBack:false}"  style="background-color:#22292C">
            <a slot="left" @click="goBack">
                <span style="font-size:26px;" class="iconfont icon-weibiaoti-"></span>
            </a>
                拆卸配件信息
            <a slot="right" @click="doPost" :class="{'f-noclick':showThost}">提交</a>
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="g-inp" style="min-height:50px;">
                <div class="m-inp f-mtb5">
                    <span class="laber">序列号</span>
                    <span class="inp s-inpbg">
                        <input type="text" v-model="BarCode" @keyup.enter="getBarCode()" class="s-inpbg" ref="barinput">
                        <span class="iconfont icon-iconfontscan" @click="scanBarCode"></span>
                    </span>
                </div>
            </div>
            <div class="g-scrollbox" id="box">
                <div style="overflow-y: auto;">
                <s-messageheader class="f-mt10" messagetitle="拆卸配件" v-show="PartsList.length>0"></s-messageheader>
                <swipeout>
                    <swipeout-item v-for="(item,index) in PartsList" :key="index" @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
                        <div slot="right-menu" style="padding:5px 0;">
                        <swipeout-button @click.native="onButtonClick(index)" type="warn">删除</swipeout-button>
                        </div>
                        <div slot="content" class="f-pd5 vux-1px-t">
                            <div class="s-bgE7E7E7">
                                    
                                <div class="m-baserowbox">
                                    <span class="label100" >固定资产:</span>
                                    <span class="text">{{item.EquipAssetCode}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100" >单元:</span>
                                    <span class="text">{{item.EquipUnit}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100" >配件:</span>
                                    <span class="text">{{item.EquipUnitAttach}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100" >序列号:</span>
                                    <span class="text">{{item.KnifeNo}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100" >物料编码:</span>
                                    <span class="text">{{item.ItemCode}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100" >物料名称:</span>
                                    <span class="text">{{item.ItemName}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100" >数量:</span>
                                    <span class="text">{{item.Qty}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100" >拆卸原因:</span>
                                    <div class="select s-bgwhile"  @click="getReasons">
                                        <popup-picker 
                                            :show.sync="ShowReplaceReason" 
                                            :data="ReplaceReasonList" 
                                            @on-change="changeReplaceReason"
                                            value-text-align='left'
                                        ></popup-picker>
                                        <div class="select-text">{{ReplaceReason}}</div>
                                    </div>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100" >拆卸时间:</span>
                                    <input class="inp" type="number" v-model="DisassembleTime" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')">
                                </div>
                            </div>
                        </div>
                    </swipeout-item>
                </swipeout>
                </div>
            </div>
        </div>
        <!-- <div class="u-add" @click="goDisassembleOriginalParts">+</div> -->
        <s-confirm 
        v-model="ShowConfirm" 
        :content="ConfirmMsg" 
        :showConfirmButton='false' 
        :showCancelButton='false' 
        :showSuccessButton='Successbtn'
        :showDangerButton='Dangerbtn'
        :bad='BadColor'
        @on-cancel="onCancel" 
        @on-confirm="onConfirm">
        </s-confirm>
        <toast width='12em' v-model="showPositionValue" type="text" :time="2500" :text="Msg" position="middle"></toast>
        <!-- <s-loading v-show="showThost" :title="loadingtitle" :img="true" :transition="true"></s-loading> -->

        <loading :show="showThost" :text="loadingtitle"></loading>
    </div>
</template>

<script type="text/ecmascript-6">
import getDate from '@/assets/js/getDate.js'
const MyReplaceReason=['修磨','补齿','拆卸','更换加工产品','维修']
const MyReplaceReason_obj={
    '修磨':1,
    '补齿':2,
    '拆卸':3,
    '更换加工产品':4,
    '维修':5
}
export default {
    name: 'DisassembleParts',
    data() {
        return {
            EquipMsg:null,              //设备信息
            clientHeight:null,          //屏幕宽度
            BadColor:false,             //提交失败的字体颜色
            Successbtn:false,           //成功的按钮
            Dangerbtn:false,            //失败的按钮
            ConfirmMsg:'',              //弹窗提示的提示信息
            ShowConfirm:false,          //控制弹窗的显隐
            showPositionValue:false,    //显示消息提示
            Msg:'找不到该设备,请联系管理人员',                     //显示消息提示的信息

            ShowReplaceReason:false,        //控制更换原因弹窗的显隐
            // ReplaceReasonList:[MyReplaceReason],     //更换原因的列表
            GetReplaceReason:null,             //接口获取到的更换原因的数据
            ReplaceReasonList:[['']],     //更换原因的列表
            ReplaceReason:null,                //选择的更换原因
            ReplaceReasonCode:null,            //选择的更换原因

            BarCode:null,                       //扫描的条码
            DisassembleTime:null,               //拆卸时间
            PartsList:[],                       //扫描获取到的信息
            knifeNo:null,                       //配件序列号
            PostType:4,                       //类型（更换和拆卸时4）
            BillId:null,                      //关联单号 

            showThost:false,
            loadingtitle:'提交中',
        }
    },
    components: {
    },
    watch: {
        clientHeight(val){
            console.log(9999999999);
            console.log(val);
            console.log(localStorage.getItem("clientheight"));
            let bodyHeight=localStorage.getItem("clientheight")
            if(bodyHeight>val+200){
                console.log(9999999999);
                document.getElementById("box").classList.add("f-focusState");
                // this.$refs.textinp.scrollIntoViewIfNeeded(true)
            }else{
                document.getElementById("box").classList.remove("f-focusState");
                // this.$refs.textinp.scrollIntoViewIfNeeded(true)
            }
        }
    },
    methods: {
        
        scanBarCode(){
            let that=this
            console.log('调用扫描接口');
            this.$hybridApi.scanCode({
                success:function(res){
                    that.BarCode=res
                    that.getBarCode()
                }
            })
        },
        //选择的弹窗信息
        changePicker(){
            this.choiceDepartments=this.Department[0]
        },
        
        goBack(){
            this.$store.dispatch('removeKeepAlive', 'DisassembleParts')
            this.$router.push({name:'PartsReplaceIndex'})
        },
        //获取条码
        getBarCode(){
            console.log(this.BarCode);
            if(!!this.BarCode != true){
                this.showPositionValue=true
                this.Msg='条码不能为空'
                return
            }
            this.PartsList=[]
            this.scanDismantleKnifeNo(this.BarCode,this.$store.getters.getEquipMsg.Id)
        },
        //接口：获取条码信息的接口(拆卸)
        scanDismantleKnifeNo(knifeNo,equipId){
            this.$axiosApi.scanDismantleKnifeNo(knifeNo,equipId).then(res=>{
                console.log(res);
                if(res.Success==true){
                    this.PartsList.push(res.Result)
                    this.BarCode=null
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                    // this.Reset()
                    this.BarCode=null
                }
            })
        },
        //接口：获取原因的接口
        getReasons(){
            this.ShowReplaceReason=true
            this.$axiosApi.getReasons().then(res=>{
                if(res.Success==true){
                    this.GetReplaceReason=res.Result
                    let data = res.Result
                    this.ReplaceReasonList=[[]]
                    this.ReplaceReasonList = [data.map(item=>{
                       return {name:item.Name,value:item.Code}
                    })]
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
            })
        },
        //接口：确认拆卸
        confirmDismantle(equipId,knifeNo,reason,useTime,type,billId){
            this.showThost=true
            this.$axiosApi.confirmDismantle(equipId,knifeNo,reason,useTime,type,billId).then(res=>{
                console.log(res);
                this.showThost=false
                if(res.Success==true){
                    this.submitChange(equipId)
                }else{
                    this.ShowConfirm=true
                    this.Successbtn=false
                    this.Dangerbtn=true
                    this.BadColor=true
                    this.ConfirmMsg=res.Message
                }
            })
        },
        //接口：提交更换（更换）
        submitChange(equipId){
            this.$axiosApi.submitChange(equipId).then(res=>{
                console.log(res);
                this.showThost = false
                if(res.Success==true){
                    this.ShowConfirm=true
                    this.Successbtn=true
                    this.Dangerbtn=false
                    this.BadColor=false
                    this.ConfirmMsg='提交成功'
                }else{
                    this.ShowConfirm=true
                    this.Successbtn=false
                    this.Dangerbtn=true
                    this.BadColor=true
                    this.ConfirmMsg=res.Message
                }
            })
        },
        //选择原因
        changeReplaceReason(value){
            let code = value[0]
            this.ReplaceReasonCode = code
            this.ReplaceReason = this.GetReplaceReason.find(item=>item.Code == code).Name
        },
        
        //点击部门，显示部门的弹窗
        choiceDepartment(){
            this.ShowDepartment=true
        },
        //选中部门的一项，显示部门名称
        chooseList(i){
            console.log(i);
            this.Department=i
            this.ShowDepartment=false
        },

        //触发单项左右滑动
        handleEvents(type){
            console.log(type);
        },

        //点击删除按钮，删除当前项
        onButtonClick(index){
            this.PartsList.splice(index,1)
            this.ReplaceReason=null
            this.DisassembleTime=null
            // 清空数据
        },


        //点击提示弹窗的删除按钮
        onCancel(){
            this.ShowConfirm=false
            this.Successbtn=false
            this.Dangerbtn=false
            this.BadColor=false
            this.ConfirmMsg=''
        },
        //点击提示弹窗的确认按钮
        onConfirm(){
            this.ShowConfirm=false
            this.Successbtn=false
            this.Dangerbtn=false
            this.BadColor=false
            this.ConfirmMsg=''
            this.$store.dispatch('removeKeepAlive', 'DisassembleParts')
            // this.$store.dispatch('removeKeepAlive', 'PartsReplaceIndex')
            this.$router.push({name:"PartsReplaceIndex"})
        },
        //点击提交按钮
        doPost(){
            console.log(this.$store.getters.getEquipMsg);
            console.log('设备id'+this.$store.getters.getEquipMsg.Id);
            console.log('配件序列号'+this.PartsList[0].KnifeNo);
            console.log('原因'+this.ReplaceReasonCode);
            console.log('用时'+this.DisassembleTime);
            console.log('类型'+this.PostType);
            console.log('关联单号'+this.BillId);
            if(this.ReplaceReason==null || this.ReplaceReason==''){
                this.showPositionValue=true
                this.Msg='拆卸原因不能为空'
                return
            }
            if(this.DisassembleTime==null || this.DisassembleTime==''){
                this.showPositionValue=true
                this.Msg='拆卸时间不能为空'
                return
            }
            if(this.PartsList.length<=0){
                this.showPositionValue=true
                this.Msg='提交数据不能为空'
                return
            }
            this.confirmDismantle(
                this.$store.getters.getEquipMsg.Id,
                this.PartsList[0].KnifeNo,
                this.ReplaceReasonCode,
                this.DisassembleTime,
                this.PostType,
                this.BillId
            )
        },
    },
    mounted () {
        this.$store.dispatch('addKeepAlive', 'DisassembleParts')
        let mydate=new Date()
        console.log(getDate(mydate));
        if(this.$store.getters.getMateriel!=null){
            this.ChoiceMaterialCode=this.$store.getters.getMateriel.No
            this.ChoiceMaterialName=this.$store.getters.getMateriel.Name
        }
        this.EquipMsg=this.$store.getters.getEquipMsg
        this.$refs.barinput.focus()
        let self = this;
        console.log(localStorage.getItem("clientheight"));
        window.onresize = function() {
            //开启实时修改页面高度值
            return (function() {
                self.clientHeight = document.body.clientHeight;
            })();
        };
    }
}
</script>

<style lang="less">

</style>
