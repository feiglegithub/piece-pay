<template>
    <div class="g-index">
        <!-- 头部 -->
        <!-- <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            原配件信息
            <a slot="right" @click="doSure">确定</a>
        </x-header> -->
        <x-header class="m-header" :left-options="{showBack:false}"  style="background-color:#22292C">
            <a slot="left" @click="goPartsReplaceIndex">
                <span style="font-size:26px;" class="iconfont icon-weibiaoti-"></span>
            </a>
                原配件信息
            <a slot="right" @click="doSure">确定</a>
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
            <div class="g-scrollbox">
                <div style="overflow-y: auto;">
                <s-messageheader class="f-mt10" messagetitle="原配件信息" v-show="PartsList.length>0"></s-messageheader>
                <swipeout>
                    <swipeout-item v-for="(item,index) in PartsList" :key="index" @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
                        <div slot="right-menu" style="padding:5px 0;">
                        <swipeout-button @click.native="onButtonClick(index)" type="warn">删除</swipeout-button>
                        </div>
                        <!-- 有序列号的显示页面 -->
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
        :bad='BadColor'
        @on-cancel="onCancel"
        @on-confirm="onConfirm">
        </s-confirm>
        <loading :show="showThost" :text="loadingtitle"></loading>
        <toast width='12em' v-model="showPositionValue" type="text" :time="2500" :text="Msg" position="middle"></toast>
    </div>
</template>

<script type="text/ecmascript-6">
import getDate from '@/assets/js/getDate.js'
export default {
    name: 'ReplaceOriginalParts',
    data() {
        return {
            BadColor:false,             //提交失败的字体颜色
            Successbtn:false,           //成功的按钮
            Dangerbtn:false,            //失败的按钮
            ConfirmMsg:'',              //弹窗提示的提示信息
            ShowConfirm:false,          //控制弹窗的显隐
            BarCode:null,                 //扫描的条码
            MessageTitle:'',            //标题
            showPositionValue:false,    //显示消息提示
            Msg:'找不到该设备,请联系管理人员',                     //显示消息提示的信息
            ChoiceMaterialCode:null,        //选择的物料编码
            ChoiceMaterialName:null,        //选择的物料编码
            PartsList:[
                // {
                // EquipAssetCode: "PdaTest",      //固定资产编码
                // EquipAssetId: 30,               //固定资产编码id
                // EquipUnit: "单元1",             //单元
                // EquipUnitAttach: "配件2",       //配件
                // ItemCode: "I00059",             //物料编码
                // ItemId: 0,                      //物料id
                // ItemName: "test",               //物料名称
                // KnifeId: 55.2,                  //序列号id
                // KnifeNo: "I00059-3359-9998",    //序列号
                // Qty: 1,                         //数量
                // knifeChangeRecordId: 98.2,      //更换id
                // }
            ],        
            showThost:false,
            loadingtitle:'加载中',              
        }
    },
    components: {
    },
    methods: {
        //处理通过数组来生成的弹窗问题，可以用vuex来记录当前选择的是第几个弹窗，然后赋值
        showParts(index){
            this.ShowParts=true
            this.$store.dispatch('changeUserInfo',{attr:'popupindex',val:index});
        },
        //选择的物料编码
        choiceMateriel(){
            // this.$router.push({name:'ChoiceMateriel'})
            this.ShowMaterialCode=true
        },
        //返回选择类型页面
        goPartsReplaceIndex(){
            this.$store.dispatch('removeKeepAlive', 'ReplaceOriginalParts')
            this.$store.dispatch('changeUserInfo',{attr:'materiel',val:null});
            this.$store.dispatch('changeUserInfo',{attr:'originalParts',val:null});
            this.$router.push({name:'PartsReplaceIndex'})
        },
        //选择的弹窗信息
        changePicker(val){
            // this.choiceDepartments=this.Department[0] 
            // console.log(val);
            // let myindex=this.$store.getters.getPopupindex
            // console.log(this.popupList[myindex].Name);
            // this.popupList[myindex].Name=val[0]
        },
        //获取条码,带出条码信息
        getBarCode(){
            if(!!this.BarCode != true){
                this.showPositionValue=true
                this.Msg='条码不能为空'
                return
            }
            console.log(this.BarCode);
            console.log(this.$store.getters.getEquipMsg.Id);
            // this.EquipMsg=this.$store.getters.getEquipMsg
            this.scanOriginalKnifeBarcode(this.$store.getters.getEquipMsg.Id,this.BarCode)
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

        //扫描原配件条码，获取信息接口
        scanOriginalKnifeBarcode(equipid,knifeBarcode){
            this.showThost=true
            this.$axiosApi.scanOriginalKnifeBarcode(equipid,knifeBarcode).then(res=>{
                this.showThost=false
                console.log(res);
                if(res.Success==true){
                    this.PartsList[0]=res.Result
                    this.BarCode=null
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                    // this.Reset()
                    this.BarCode=null
                }
            })
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
            // console.log(type);
        },

        //点击删除按钮，删除当前项
        onButtonClick(index){
            console.log(index);
            this.PartsList.splice(index,1)
        },

        //点击提示弹窗的删除按钮
        onCancel(){

        },
        //点击提示弹窗的确认按钮
        onConfirm(){},
        //点击提交按钮
        doSure(){
            // this.ShowConfirm=true
            if(this.PartsList.length>0){
                this.$store.dispatch('changeUserInfo',{attr:'originalParts',val:this.PartsList});
            }
            this.$store.dispatch('removeKeepAlive', 'ReplaceParts')
            this.$router.push({name:'ReplaceParts'})
            
        },

    },
    mounted () {
        console.log(this.$store.getters.keepAlive);
        this.$store.dispatch('addKeepAlive', 'ReplaceOriginalParts')
        //获取当前时间
        let mydate=new Date()
        // console.log(getDate(mydate));
        // this.$store.getters.getMateriel
        // console.log(this.$store.getters.getMateriel);
        // if(this.$store.getters.getMateriel!=null){
        //     this.ChoiceMaterialCode=this.$store.getters.getMateriel.No
        //     this.ChoiceMaterialName=this.$store.getters.getMateriel.Name
        // }
        this.$refs.barinput.focus()
    }
}
</script>

<style lang="less">

</style>
