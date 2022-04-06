<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{showBack:false}"  style="background-color:#22292C">
            <a slot="left" @click="goToolReplacementScanType">
                <span style="font-size:26px;" class="iconfont icon-weibiaoti-"></span>
            </a>
            <!-- <p v-show="MessageTitle='更换配件信息'">更换配件</p>
            <p v-show="MessageTitle='拆卸配件信息'">拆卸配件</p> -->
            配件更换
            <!--<a slot="right" @click="doPost" :class="{'f-noclick':showThost}">提交</a>-->
            <a slot="right" @click="addMateriel" :class="{'f-noclick':showThost}">确认</a>
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5" style="overflow: auto;">
            <div class="g-inp" style="min-height:60px">
                <div class="m-inp f-mtb5">
                    <span class="laber" style="min-width: 80px;">设备编码</span>
                    <span class="inp s-inpbg">
                        <input v-model="BarCode" type="text" @keyup.enter="getBarCode()" class="s-inpbg" ref="barinput">
                        <span class="iconfont icon-iconfontscan" @click="scanBarCode"></span>
                    </span>
                </div>
            </div>
            <s-messageheader class="f-mt10" messagetitle="设备信息" v-show="DeviceId!=null"></s-messageheader>
            <div class="g-notflexbox" v-show="DeviceId!=null">
                <div class="m-baserowbox">
                    <span class="label80">设备编码</span>
                    <span class="text">{{DeviceCode}}</span>
                </div>
                <div class="m-baserowbox">
                    <span class="label80">机台号</span>
                    <span class="text">{{MachineNumber}}</span>
                </div>
                <div class="m-baserowbox">
                    <span class="label80">设备类别</span>
                    <span class="text">{{EquipmentCategory}}</span>
                </div>
                <div class="m-baserowbox">
                    <span class="label80">部门</span>
                    <span class="text">{{Department}}</span>
                </div>
                <div class="m-baserowbox">
                    <span class="label80">工序</span>
                    <span class="text">{{MaterialOpening}}</span>
                </div>
            </div>
            <!--<s-messageheader class="f-mt10" :messagetitle="MessageTitle" v-show="DeviceId!=null"></s-messageheader>
            <div class="g-notflexbox" v-show="DeviceId!=null">
                <swipeout style="border-radius: 10px">
                    <swipeout-item v-for="(item,index) in EquipmentList" :key="index" @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
                        <div slot="right-menu" style="padding:5px 0;">
                            <swipeout-button @click.native="onButtonClick(index)" type="warn">删除</swipeout-button>
                        </div>
                        <div slot="content" class="g-notflexbox2 f-mtb5" style="background: #F2F2F2">
                            <div>
                                <div class="m-baserowbox">
                                    <span class="label100">固定资产</span>
                                    <span class="text">{{item.EquipAssetCode}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100">单元</span>
                                    <span class="text">{{item.EquipUnit}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100">配件</span>
                                    <span class="text">{{item.EquipUnitAttach}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100">原物料编码</span>
                                    <span class="text">{{item.OriginalItemCode}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100">原物料名称</span>
                                    <span class="text">{{item.OriginalItemName}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100">原序列号</span>
                                    <span class="text">{{item.OriginalSn}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100">新物料编码</span>
                                    <span class="text">{{item.NewItemCode}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100">新物料名称</span>
                                    <span class="text">{{item.NewItemName}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100">新序列号</span>
                                    <span class="text">{{item.NewSn}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100">更换用时(分钟)</span>
                                    <span class="text">{{item.UseTime}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100">数量</span>
                                    <span class="text">{{item.Qty}}</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100">更换原因</span>
                                    <span class="text">{{item.Reason}}</span>
                                </div>
                            </div>
                        </div>
                    </swipeout-item>
                </swipeout>
                <div class="u-add f-mtb5" @click="addMateriel">+</div>
            </div>-->
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
        <toast width='12em' v-model="showPositionValue" type="text" :time="2500" :text="Msg" position="middle"></toast>
        <!-- <s-loading v-show="showThost" :title="loadingtitle" :img="true" :transition="true"></s-loading> -->

        <loading :show="showThost" :text="loadingtitle"></loading>
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
    name: 'PartsReplaceIndex',
    data() {
        return {
            BadColor:false,             //提交失败的字体颜色
            Successbtn:false,           //成功的按钮
            Dangerbtn:false,            //失败的按钮
            ConfirmMsg:'',              //弹窗提示的提示信息
            ShowConfirm:false,          //控制弹窗的显隐
            BarCode:'',                 //扫描的条码
            MessageTitle:'',            //标题
            showPositionValue:false,    //显示消息提示
            Msg:'找不到该设备,请联系管理人员',                     //显示消息提示的信息
            EquipMsg:null,              //接口获取到的设备信息
            DeviceId:null,              //设备id
            DeviceCode:null,            //设备编码
            MachineNumber:null,         //机台号
            EquipmentCategory:null,     //型号
            Department:null,            //部门
            MaterialOpening:null,       //工序
            EquipmentList:[
                // {
                //     AssetsCode:'',
                //     Unit:'',
                //     Parts:'',
                //     OriginalMaterialCode:'',
                //     OriginalMaterialName:'',
                //     OriginalSerial:'',
                //     NewMaterialCode:'',
                //     NewMaterialName:'',
                //     NewSerial:'',
                //     ReplaceTime:'',
                //     Qty:'',
                //     ReplaceReason:''
                // }
            ],           //查询出来的设备列表

            showThost:false,
            loadingtitle:'提交中',
        }
    },
    watch: {
        
    },
    components: {
    },
    methods: {
        //返回
        goToolReplacementScanType(){
            this.$store.dispatch('removeKeepAlive', 'PartsReplaceIndex')
            this.$router.push({name:'ToolReplacementScanType'})
        },
        //点击提交
        doPost(){
            // console.log(this.EquipmentList);
            if (this.DeviceId==null || this.DeviceId=='') {
                this.showPositionValue=true
                this.Msg='提交数据不能为空'
                return
            }
            if (this.EquipmentList==null ||this.EquipmentList.length<=0) {
                this.showPositionValue=true
                if(this.$store.getters.getScantype=='更换'){
                    this.Msg='更换设备信息不能为空'
                    return
                }
                if(this.$store.getters.getScantype=='拆卸'){
                    this.Msg='拆卸设备信息不能为空'
                    return
                }
            }
            // if(this.$store.getters.getScantype=='更换'){
            //     console.log(this.DeviceId);
            //     this.submitChange(this.DeviceId)
            //     return
            // }
            // if(this.$store.getters.getScantype=='拆卸'){
            //     this.submitDismantle(this.DeviceId)
            //     return
            // }
            this.submitChange(this.DeviceId)
        },
        //跳转到原配件页面
        addMateriel(){
            if(this.DeviceId==null || this.DeviceId==''){
                this.showPositionValue=true
                this.Msg='设备信息不能为空'
                return
            }
            if(this.$store.getters.getScantype=='更换'){
                this.$store.dispatch('changeUserInfo',{attr:'equipMsg',val:this.EquipMsg});
                //this.$store.dispatch('removeKeepAlive', 'ReplaceOriginalParts')
                //this.$router.push({name:'ReplaceOriginalParts'})
                this.$store.dispatch('removeKeepAlive', 'ReplaceParts')
                this.$router.push({name:'ReplaceParts'})
                return
            }
            if(this.$store.getters.getScantype=='拆卸'){
                this.$store.dispatch('changeUserInfo',{attr:'equipMsg',val:this.EquipMsg});
                this.$store.dispatch('removeKeepAlive', 'DisassembleParts')
                this.$router.push({name:'DisassembleParts'})
                return
            }
        },
        //获取条码,带出设备信息
        getBarCode(){
            console.log(this.BarCode);
            if(!!this.BarCode != true){
                this.showPositionValue=true
                this.Msg='条码不能为空'
                return
            }
            //扫码成功后，清空BarCode，扫码失败，也清空BarCode
            this.scanKnifeChangeEquipCode(this.BarCode,4,0)
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

        //接口：获取条码信息的接口
        scanKnifeChangeEquipCode(code,changeFrom,billId){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.scanKnifeChangeEquipCode(code,changeFrom,billId).then(res=>{
                this.showThost=false
                console.log(res);
                if(res.Success==true){
                    this.EquipMsg=res.Result
                    this.DeviceId=res.Result.Id           //设备id
                    this.DeviceCode=res.Result.EquipCode            //设备编码
                    this.MachineNumber=res.Result.MachinaNo         //机台号
                    this.EquipmentCategory=res.Result.EquipType     //型号
                    this.Department=res.Result.Department            //部门
                    this.MaterialOpening=res.Result.Process      //工序
                    this.EquipmentList=res.Result.Details       //配件更换信息
                    this.BarCode=null
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                    this.Reset()
                    this.BarCode=null
                }
            })
        },

        //接口：删除明细
        deleteDetail(detailId,index){
            this.$axiosApi.deleteDetail(detailId,index).then(res=>{
                console.log(res);
                if(res.Success==true){
                    this.EquipmentList.splice(index,1)
                    this.showPositionValue=true
                    this.Msg='删除成功'
                    // this.scanKnifeChangeEquipCode(this.BarCode)
                    
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
            })
        },

        //接口：提交更换（更换）
        submitChange(equipId){
            this.loadingtitle='提交中'
            this.showThost = true
            this.$axiosApi.submitChange(equipId).then(res=>{
                console.log(res);
                this.showThost = false
                if(res.Success==true){
                    this.ShowConfirm=true
                    this.Successbtn=true
                    this.Dangerbtn=false
                    this.BadColor=false
                    this.ConfirmMsg='操作成功'
                }else{
                    this.ShowConfirm=true
                    this.Successbtn=false
                    this.Dangerbtn=true
                    this.BadColor=true
                    this.ConfirmMsg=res.Message
                }
            })
        },

        //接口：提交拆卸（拆卸）
        submitDismantle(equipId){
            this.loadingtitle='提交中'
            this.showThost = true
            this.$axiosApi.submitDismantle(equipId).then(res=>{
                console.log(res);
                this.showThost = false
                if(res.Success==true){
                    this.ShowConfirm=true
                    this.Successbtn=true
                    this.Dangerbtn=false
                    this.BadColor=false
                    this.ConfirmMsg='操作成功'
                }else{
                    this.ShowConfirm=true
                    this.Successbtn=false
                    this.Dangerbtn=true
                    this.BadColor=true
                    this.ConfirmMsg=res.Message
                }
            })
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
            this.Reset()
        },
        //触发单项左右滑动
        handleEvents(type){
            // console.log(type);
        },

        //点击删除按钮，删除当前项
        onButtonClick(index){
            console.log(this.EquipmentList[index].DetailId);
            this.deleteDetail(this.EquipmentList[index].DetailId,index)
        },
        //重置数据
        Reset(){
            this.DeviceId=null           //设备id
            this.DeviceCode=null            //设备编码
            this.MachineNumber=null         //机台号
            this.EquipmentCategory=null     //型号
            this.Department=null           //部门
            this.MaterialOpening=null      //工序
            this.EquipmentList=null       //配件更换信息
            this.BarCode=null
        }
    },
    created(){
        // this.$store.dispatch('addKeepAlive', 'PartsReplaceIndex')
        if(this.$store.getters.getScantype=='更换'){
            this.MessageTitle='更换配件信息'
        }
        if(this.$store.getters.getScantype=='拆卸'){
            this.MessageTitle='拆卸配件信息'
        }
        if(this.$store.getters.getEquipMsg!=null){
            console.log(this.$store.getters.getEquipMsg.EquipCode);
            this.scanKnifeChangeEquipCode(this.$store.getters.getEquipMsg.EquipCode,4,0)
        }
    },
    mounted () {
        console.log('jinglai');
        this.$refs.barinput.focus()
        
        // this.$store.dispatch('addKeepAlive', 'PartsReplaceIndex')
        console.log(this.$store.getters.keepAlive);
    }
}
</script>

<style lang="less">


</style>
