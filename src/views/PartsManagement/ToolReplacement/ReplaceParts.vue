<template>
    <div class="g-index">
        <!-- 头部 -->
        <!-- <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            更换配件信息
            <a slot="right" @click="doPost">提交</a>
        </x-header> -->
        <x-header class="m-header" :left-options="{showBack:false}"  style="background-color:#22292C">
            <a slot="left" @click="goReplaceOriginalParts">
                <span style="font-size:26px;" class="iconfont icon-weibiaoti-"></span>
            </a>
                新配件信息
            <a slot="right" @click="doPost" :class="{'f-noclick':showThost}">提交</a>
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="g-inp" style="min-height:50px;">
                <div class="m-inp f-mtb5">
                    <span class="laber">序列号</span>
                    <span class="inp s-inpbg">
                        <!-- <input type="text" v-model="BarCode" @keyup.enter="getBarCode" class="s-inpbg" ref="barinput"> -->
                        <input type="text" v-model="BarCode" @keyup.enter="getBarCode" class="s-inpbg" ref="barinput">
                        <span class="iconfont icon-iconfontscan" @click="scanBarCode"></span>
                    </span>
                </div>
            </div>
            <div class="g-scrollbox" id="box">
                <div style="overflow-y: auto;">
                <s-messageheader class="f-mt10" messagetitle="更换配件"></s-messageheader>
                <swipeout>
                    <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
                        <div slot="right-menu" style="padding:5px 0;">
                        <swipeout-button @click.native="onButtonClick" type="warn">重置</swipeout-button>
                        </div>
                        <div slot="content" class="f-pd5 vux-1px-t">
                            <div class="s-bgE7E7E7">
                                    <div class="m-baserowbox">
                                        <span class="label100" >固定资产:</span>
                                        <div :class="['select','s-bgwhile',{'f-noclick':IsAssetsClick}]" @click="getEquipAssets">
                                            <popup-picker 
                                                :show.sync="ShowAssetsCode" 
                                                :data="AssetsCodeList" 
                                                @on-change="changeAssetsCode"
                                                value-text-align='left'
                                            ></popup-picker>
                                            <div class="select-text" style="width: 90%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">{{AssetsCode}}</div>
                                        </div>
                                    </div>
                                    <div class="m-baserowbox">
                                        <span class="label100" >单元:</span>
                                        <div :class="['select','s-bgwhile',{'f-noclick':IsUnitClick}]" @click="getEquipUnits">
                                            <popup-picker 
                                                :show.sync="ShowUnit" 
                                                :data="UnitList" 
                                                @on-change="changeUnit"
                                                value-text-align='left'
                                            ></popup-picker>
                                            <div class="select-text">{{Unit}}</div>
                                        </div>
                                    </div>
                                    <div class="m-baserowbox">
                                        <span class="label100" >配件:</span>
                                        <div :class="['select','s-bgwhile',{'f-noclick':IsUnitAttachClick}]" @click="getEquipUnitAttachs">
                                            <popup-picker 
                                                :show.sync="ShowParts" 
                                                :data="PartsList" 
                                                @on-change="changeParts"
                                                value-text-align='left'
                                            ></popup-picker>
                                            <div class="select-text">{{Parts}}</div>
                                        </div>
                                    </div>
                                    <div class="m-baserowbox">
                                        <span class="label100" >原序列号:</span>
                                        <input class="inp" type="text" name="" id="" v-model="OraginalKnifeNo" disabled>
                                    </div>
                                    <div class="m-baserowbox">
                                        <span class="label100" >原物料编码:</span>
                                        <input class="inp" type="text" name="" id="" v-model="OraginalItemCode" disabled>
                                    </div>
                                    <div class="m-baserowbox">
                                        <span class="label100" >原物料名称:</span>
                                        <input class="inp" type="text" name="" id="" v-model="OraginalItemName" disabled>
                                    </div>
                                    <div class="m-baserowbox">
                                        <span class="label100" >新序列号:</span>
                                        <input class="inp" type="text" name="" id="" v-model="SerialNumber" disabled>
                                    </div>
                                    <div class="m-baserowbox">
                                        <span class="label100" >物料编码:</span>
                                        <input class="inp" type="text" name="" id="" v-model="ChoiceMaterialCode" disabled>
                                        <!-- <div class="inpwatch s-bgwhile" @click="choiceMateriel">
                                            {{ChoiceMaterialCode}}
                                            <x-icon type="ios-search" class="searchicon" size="22"></x-icon>
                                        </div> -->
                                    </div>
                                    <!-- <div class="m-baserowbox">
                                        <span class="label100" ></span>
                                        <span style="color:red">请生产人员扫描刀具二维码进行操作！</span>
                                    </div> -->
                                    <div class="m-baserowbox">
                                        <span class="label100" >物料名称:</span>
                                        <input class="inp" type="text" name="" id="" v-model="ChoiceMaterialName" disabled>
                                    </div>
                                    <div class="m-baserowbox">
                                        <span class="label100" >数量:</span>
                                        <input type="number" class="inp" v-model="Qty" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')">
                                    </div>
                                    <div class="m-baserowbox">
                                        <span class="label100" >更换原因:</span>
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
                                        <span class="label100">用时(分钟):</span>
                                        <input type="number" ref="textinp" id="myinput" class="inp" v-model="ReplaceTime" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')">
                                    </div>
                                </div>

                        </div>
                    </swipeout-item>
                </swipeout>
                </div>
            </div>
        </div>
        <!-- <div class="u-add" @click="goReplaceOriginalPartsRefresh">+</div> -->
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
import ChoiceMateriel from './ChoiceMateriel.vue'
const MyReplaceReason=['修磨','补齿','拆卸','更换加工产品','维修']
const MyReplaceReason_obj={
    '修磨':1,
    '补齿':2,
    '拆卸':3,
    '更换加工产品':4,
    '维修':5
}

export default {
    name: 'ReplaceParts',
    data() {
        return {
            EquipMsg:null,              //设备信息
            clientHeight:null,          //屏幕宽度
            prerouter:null,
            BadColor:false,             //提交失败的字体颜色
            Successbtn:false,           //成功的按钮
            Dangerbtn:false,            //失败的按钮
            ConfirmMsg:'',              //弹窗提示的提示信息
            ShowConfirm:false,          //控制弹窗的显隐
            showPositionValue:false,    //显示消息提示
            Msg:'',                     
            BarCode:null,           //条码


            ShowAssetsCode:false,        //控制资产编码弹窗的显隐
            GetAssetsCode:null,             //接口获取到的固定资产数据
            AssetsCodeList:[[' ']],     //资产编码的列表
            AssetsCode:null,               //选择的资产编码
            AssetsId:null,                  //选择的资产id

            ShowUnit:false,        //控制单元弹窗的显隐
            GetUnit:null,             //接口获取到的单元的数据
            UnitList:[[' ']],     //单元的列表
            Unit:null,                //选择的单元

            ShowParts:false,        //控制配件弹窗的显隐
            GetParts:null,             //接口获取到的配件的数据
            PartsList:[[' ']],     //配件的列表
            Parts:null,                //选择的配件



            ShowReplaceReason:false,        //控制更换原因弹窗的显隐
            // ReplaceReasonList:[MyReplaceReason],     //更换原因的列表
            GetReplaceReason:null,             //接口获取到的更换原因的数据
            ReplaceReasonList:[['']],     //更换原因的列表
            ReplaceReason:null,                //选择的更换原因
            ReplaceReasonCode:null,            //选择的更换原因

            ReplaceTime:null,                   //更换时间
            SerialNumber:null,              //序列号
            SerialId:null,                  //序列号Id
            ChoiceMaterialCode:null,        //选择的物料编码
            ChoiceMaterialName:null,        //选择的物料名称
            ChoiceMaterialId:null,        //选择的物料编码id
            Qty:null,                       //数量

            OraginalKnife:null,             //需要更换的原配件信息
            OraginalKnifeNo:null,             //需要更换的原配件序列号
            OraginalItemCode:null,             //需要更换的原配件序列号
            OraginalItemName:null,             //需要更换的原配件序列号
            NewKnife:{                      //需要更换的新配件信息
                EquipAssetCode :null,
                EquipAssetId: null,
                EquipUnit: null,
                EquipUnitAttach: null,
                ItemCode: null,
                ItemId: null,
                ItemName: null,
                KnifeId: null,
                KnifeNo: null,
                Qty: null,
                knifeChangeRecordId: null,
            }, 
            PostType:4,                      //类型  （更换和拆卸时4）
            BillId:null,                      //关联单号  
            IsScan:false,                        //判断是否扫描

            IsAssetsClick:false,            //控制固定资产能不能点击
            IsUnitClick:false,                     //控制单元不能点击
            IsUnitAttachClick:false,         //控制配件不能点击

            showThost:false,
            loadingtitle:'提交中',
        }
    },
    components: {
        ChoiceMateriel
    },
    watch: {
        //监听软键盘的弹出
        // clientHeight(val){
            
        //     let bodyHeight=localStorage.getItem("clientheight")
        //     console.log(val);
        //     if(bodyHeight>val+200){
        //         console.log(9999999999);
        //         document.getElementById("box").classList.add("f-focusState");
        //         // this.$refs.textinp.scrollIntoViewIfNeeded(true)
        //     }else{
        //         document.getElementById("box").classList.remove("f-focusState");
        //         // this.$refs.textinp.scrollIntoViewIfNeeded(true)
        //     }
        // },
    },
    //我们在页面上使用了keepalive，所以可以在这里获取到仓库里面的数据。
    beforeRouteEnter(to, from, next) {
        next(vm=>{          //  这里的vm指的就是vue实例，可以用来当做this使用
            console.log(from)
            console.log(vm.$route.params.choiceMateriel);
            if(from.name=='ChoiceMateriel'){
                vm.clientHeight=localStorage.getItem("clientheight")
                if(vm.$route.params.choiceMateriel!=null){
                    console.log(888);
                    vm.ChoiceMaterialCode=vm.$route.params.choiceMateriel.ItemCode
                    vm.ChoiceMaterialName=vm.$route.params.choiceMateriel.ItemName
                    vm.ChoiceMaterialId=vm.$route.params.choiceMateriel.ItemId
                }
            }
        })
    },
    methods: {

        //跳转到物料选择页面
        choiceMateriel(){
            // if(this.AssetsId==null || this.AssetsId==''){
            //     this.showPositionValue=true
            //     this.Msg='请先选择固定资产编码'
            //     return
            // }
            // if(this.Unit == null || this.Unit==''){
            //     this.showPositionValue=true
            //     this.Msg='请先选择单元'
            //     return
            // }
            // if(this.Parts == null || this.Parts==''){
            //     this.showPositionValue=true
            //     this.Msg='请先选择配件'
            //     return
            // }
            this.$router.push({name:'ChoiceMateriel',
            params:{
                route:'ReplaceParts',
                AssetId:this.AssetsId,               
                Unit:this.Unit,                  
                Attach:this.Parts, 
                }
            })
            // this.ShowMaterialCode=true
        },
        //选择的固定资产编码
        changeAssetsCode(value){
            console.log(value);
            if(value!=this.AssetsCode){
                if(this.IsScan!=true){
                    this.Unit=null
                    this.Parts=null
                    this.SerialNumber=null
                    this.SerialId=null
                    this.ChoiceMaterialCode=null
                    this.ChoiceMaterialName=null
                }else{
                    this.Unit=null
                    this.Parts=null
                }
            }

            let id = value[0]
            this.AssetsId = id
            this.AssetsCode = this.GetAssetsCode.find(item=>item.EquipAssetId == id).EquipCode
        },
        //选择的单元
        changeUnit(value){
            if(value!=this.Unit){
                if(this.IsScan!=true){
                    this.Parts=null
                    this.SerialNumber=null
                    this.SerialId=null
                    this.ChoiceMaterialCode=null
                    this.ChoiceMaterialName=null
                }else{
                    this.Parts=null
                }
            }
            this.Unit=value[0]
        },
        //选择的配件
        changeParts(value){
            this.Parts=value[0]
            this.getOriginalKnifeBarcode()
        },
        //选择原因
        changeReplaceReason(value){
            // console.log(value);
            // this.ReplaceReason=value[0]
            let code = value[0]
            this.ReplaceReasonCode = code
            this.ReplaceReason = this.GetReplaceReason.find(item=>item.Code == code).Name
        },

        //接口：获取固定资产接口，equipId（设备id）不能为空
        getEquipAssets(){
            this.ShowAssetsCode = true
            console.log(this.EquipMsg);
            let equipId=this.EquipMsg.Id
            let equipUnit=null
            let equipUnitAttach=null
            let knifeNo=this.SerialNumber
            this.$axiosApi.getEquipAssets(equipId,equipUnit,equipUnitAttach,knifeNo).then(res=>{
                console.log(res);
                if(res.Success==true){
                    this.GetAssetsCode=res.Result
                    let data = res.Result
                    this.AssetsCodeList=[[]]
                    this.AssetsCodeList = [data.map(item=>{
                       return {name:item.EquipCode,value:item.EquipAssetId}
                    })]
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
            })
        },
        //接口：获取单元列表接口
        getEquipUnits(){
            let equipId=this.EquipMsg.Id
            let assetId=this.AssetsId
            let equipUnitAttach=null
            let knifeNo=this.SerialNumber
            if(this.AssetsId==null || this.AssetsId==''){
                this.showPositionValue=true
                this.Msg='请先选择固定资产编码'
            }else{
                this.ShowUnit = true
                this.$axiosApi.getEquipUnits(equipId,assetId,equipUnitAttach,knifeNo).then(res=>{
                    if(res.Success==true){
                        this.GetUnit=res.Result.Datas
                        this.UnitList=[[]]
                        res.Result.forEach(item=>{
                            this.UnitList[0].push(item)
                        })
                    }else{
                        this.showPositionValue=true
                        this.Msg=res.Message
                    }
                })
            }
        },
        //接口：获取配件列表接口
        getEquipUnitAttachs(){
            let equipId=this.EquipMsg.Id
            let assetId=this.AssetsId
            let equipUnit=this.Unit
            let knifeNo=this.SerialNumber
            if(equipUnit == null || equipUnit==''){
                this.showPositionValue=true
                this.Msg='请先选择单元'
            }else{
                this.ShowParts = true
                this.$axiosApi.getEquipUnitAttachs(equipId,assetId,equipUnit,knifeNo).then(res=>{
                    if(res.Success==true){
                        this.GetParts=res.Result
                        this.PartsList=[[]]
                        res.Result.forEach(item=>{
                            this.PartsList[0].push(item)
                        })
                    }else{
                        this.showPositionValue=true
                        this.Msg=res.Message
                    }
                })
            }
            
        },
        //接口：获取配件当前使用的序列号
        getOriginalKnifeBarcode(){
            let equipId=this.EquipMsg.Id
            let assetId=this.AssetsId
            let equipUnit=this.Unit
            let equipUnitAttach=this.Parts
            this.$axiosApi.getOriginalKnifeBarcode(equipId,assetId,equipUnit,equipUnitAttach).then(res=>{
                if(res.Success==true){
                    if(res.Result == null){
                        this.OraginalKnife=null
                        this.OraginalKnifeNo=null
                        this.OraginalItemCode=null
                        this.OraginalItemName=null
                    }
                    else{
                        this.OraginalKnife=res.Result
                        this.OraginalKnifeNo=res.Result.KnifeNo
                        this.OraginalItemCode=res.Result.ItemCode
                        this.OraginalItemName=res.Result.ItemName
                    }
                }else{
                    this.Parts = null
                    this.showPositionValue=true
                    this.Msg=res.Message
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

        //接口：确认更换的接口
        confirmChange(equipId,oraginalKnife,newKnife,reason,useTime,type,billId){
            this.loadingtitle='提交中'
            this.showThost = true
            this.$axiosApi.confirmChange(equipId,oraginalKnife,newKnife,reason,useTime,type,billId).then(res=>{
                this.showThost = false
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
        //返回原配件页面
        goReplaceOriginalParts(){
            // this.$store.dispatch('removeKeepAlive', 'ReplaceOriginalParts')

            //this.$store.dispatch('removeKeepAlive', 'ReplaceParts')
            //this.$router.push({name:'ReplaceOriginalParts'})
            //返回选择类型页面
            this.$store.dispatch('removeKeepAlive', 'ReplaceOriginalParts')
            this.$store.dispatch('changeUserInfo',{attr:'materiel',val:null});
            this.$store.dispatch('changeUserInfo',{attr:'originalParts',val:null});
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
            // this.reSet()
            console.log(this.$store.getters.getEquipMsg.Id);
            this.scanNewKnifeBarcode(this.$store.getters.getEquipMsg.Id,this.BarCode)
        },

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


        //接口：扫描原配件条码，获取信息接口
        scanNewKnifeBarcode(equipid,knifeBarcode){
            this.loadingtitle='加载中'
            this.showThost = true
            this.$axiosApi.scanNewKnifeBarcode(equipid,knifeBarcode).then(res=>{
                this.showThost = false
                console.log(res);
                if(res.Success==true){
                    //获取扫描的信息
                    this.IsScan=true
                    // this.AssetsCode=res.Result.EquipAssetCode
                    // this.AssetsId=res.Result.EquipAssetId
                    // this.Unit=res.Result.EquipUnit
                    // this.Parts=res.Result.EquipUnitAttach
                    this.SerialNumber=res.Result.KnifeNo
                    this.SerialId=res.Result.KnifeId
                    this.ChoiceMaterialCode=res.Result.ItemCode
                    this.ChoiceMaterialName=res.Result.ItemName
                    this.ChoiceMaterialId=res.Result.ItemId
                    this.Qty=res.Result.Qty
                    // this.ReplaceReason=res.Result.ReplaceReason
                    // this.ReplaceTime=res.Result.ReplaceTime
                    this.BarCode=null

                    if(this.OraginalKnifeNo == null){
                        this.AssetsCode=null
                        this.AssetsId=null
                        this.Unit=null
                        this.Parts=null
                    }
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                    // this.Reset()
                    this.BarCode=null
                }
            })
        },
        
        //触发单项左右滑动
        handleEvents(type){
            console.log(type);
        },

        //点击重置按钮，重置数据
        onButtonClick(){
            // this.PartsList.splice(index,1)
            if(this.$store.getters.getOriginalParts!=null){
                this.SerialNumber=null
                this.ChoiceMaterialCode=null
                this.ChoiceMaterialName=null
                this.Qty=null
                this.ReplaceReason=null
                this.ReplaceTime=null
            }else{
                this.AssetsCode=null
                this.Unit=null
                this.Parts=null
                this.SerialNumber=null
                this.ChoiceMaterialCode=null
                this.ChoiceMaterialName=null
                this.Qty=null
                this.ReplaceReason=null
                this.ReplaceTime=null
            }
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
            this.$store.dispatch('changeUserInfo',{attr:'originalParts',val:null});
            this.$store.dispatch('removeKeepAlive', 'ReplaceParts')
            this.$store.dispatch('removeKeepAlive', 'ReplaceOriginalParts')
            // this.$store.dispatch('removeKeepAlive', 'PartsReplaceIndex')
            this.$router.push({name:"PartsReplaceIndex"})
        },

        //点击提交按钮
        doPost(){
            // this.Successbtn=true
            this.NewKnife.knifeChangeRecordId=null
            this.NewKnife.KnifeId=this.SerialId
            this.NewKnife.EquipAssetId=this.AssetsId
            this.NewKnife.EquipAssetCode=this.AssetsCode
            this.NewKnife.EquipUnit=this.Unit
            this.NewKnife.EquipUnitAttach=this.Parts
            this.NewKnife.KnifeNo=this.SerialNumber
            this.NewKnife.ItemId=this.ChoiceMaterialId
            this.NewKnife.ItemCode=this.ChoiceMaterialCode
            this.NewKnife.ItemName=this.ChoiceMaterialName
            this.NewKnife.Qty=this.Qty
            console.log('设备id'+this.$store.getters.getEquipMsg.Id);
            console.log('原配件'+ JSON.stringify(this.OraginalKnife));
            console.log('新配件'+JSON.stringify(this.NewKnife));
            console.log('原因'+this.ReplaceReasonCode);
            console.log('用时'+this.ReplaceTime);
            console.log('类型'+this.PostType);
            console.log('关联单号'+this.BillId);
            if(this.AssetsCode==null){
                this.showPositionValue=true
                this.Msg='固定资产编码不能为空'
                return
            }
            if(this.Unit==null){
                this.showPositionValue=true
                this.Msg='单元不能为空'
                return
            }
            if(this.Parts==null){
                this.showPositionValue=true
                this.Msg='配件不能为空'
                return
            }
            if(this.ChoiceMaterialCode==null){
                this.showPositionValue=true
                this.Msg='物料编码不能为空'
                return
            }
            if(this.Qty==null || this.Qty==''){
                this.showPositionValue=true
                this.Msg='数量不能为空'
                return
            }
            if(this.ReplaceReason==null){
                this.showPositionValue=true
                this.Msg='更换原因不能为空'
                return
            }
            if(this.ReplaceTime==null || this.ReplaceTime==''){
                this.showPositionValue=true
                this.Msg='更换用时不能为空'
                return
            }

            this.confirmChange(
                this.$store.getters.getEquipMsg.Id,
                this.OraginalKnife,
                this.NewKnife,
                this.ReplaceReasonCode,
                this.ReplaceTime,
                this.PostType,
                this.BillId
            )
        },
        reSet(){
            this.AssetsCode=null
            this.AssetsId=null
            this.Unit=null
            this.Parts=null
            this.SerialNumber=null
            this.SerialId=null
            this.ChoiceMaterialCode=null
            this.ChoiceMaterialName=null
            this.ChoiceMaterialId=null
            this.Qty=null
            this.ReplaceTime=null
            this.ReplaceReason=null
        }

        //跳转到ReplaceOriginalParts页
        // goReplaceOriginalPartsRefresh(){
        //     this.$store.dispatch('removeKeepAlive', 'ReplaceOriginalParts')
        //     this.$router.push({name:'ReplaceOriginalParts'})
        // },

        
    },
    created(){
        console.log(this.$store.getters.getEquipMsg);
        this.EquipMsg=this.$store.getters.getEquipMsg
        if(this.$store.getters.getOriginalParts!=null){
            console.log(this.$store.getters.getOriginalParts[0]);
            this.OraginalKnife=this.$store.getters.getOriginalParts[0]
            this.OraginalKnifeNo=this.$store.getters.getOriginalParts[0].KnifeNo
            this.OraginalItemCode=this.$store.getters.getOriginalParts[0].ItemCode
            this.OraginalItemName=this.$store.getters.getOriginalParts[0].ItemName
            this.AssetsCode=this.$store.getters.getOriginalParts[0].EquipAssetCode
            this.AssetsId=this.$store.getters.getOriginalParts[0].EquipAssetId
            this.Unit=this.$store.getters.getOriginalParts[0].EquipUnit
            this.Parts=this.$store.getters.getOriginalParts[0].EquipUnitAttach
            !!this.$store.getters.getOriginalParts[0].EquipAssetCode==true?this.IsAssetsClick=true:this.IsAssetsClick=false
            !!this.$store.getters.getOriginalParts[0].EquipUnit==true?this.IsUnitClick=true:this.IsUnitClick=false
            !!this.$store.getters.getOriginalParts[0].EquipUnitAttach==true?this.IsUnitAttachClick=true:this.IsUnitAttachClick=false
        }
        // else{
        //     this.OraginalKnife=NoOraginalKnife
        // }
        
    },
    mounted () {
        console.log(this.$store.getters.keepAlive);
        console.log('重新加载');
        this.$refs.barinput.focus()
        this.$store.dispatch('addKeepAlive', 'ReplaceParts')
        // let self = this;
        // console.log(localStorage.getItem("clientheight"));
        // console.log(this.$store.getters.getOriginalParts);
        // window.onresize = function() {
        //     //开启实时修改页面高度值
        //     return (function() {
        //         self.clientHeight = document.body.clientHeight;
        //     })();
        // };
    }
}
</script>

<style lang="less">

</style>
