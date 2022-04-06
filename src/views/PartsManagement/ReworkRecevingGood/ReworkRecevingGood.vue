<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            外修接收
            <!-- <a slot="right">取消</a> -->
            <a slot="right" @click="doPost" :class="{'f-noclick':showThost}">提交</a>
        </x-header>
        <div class="f-flexvw f-flexg1">
            <div class="g-inp" style="min-height:120px;">
                <div class="m-inp f-mtb5">
                    <span class="laber">返修单</span>
                    <span class="inp s-inpbg">
                        <input v-model="RemarkBill" type="text" @keyup.enter="getRemarkBill()" class="s-inpbg" ref="barinput">
                    </span>
                </div>
                <div class="m-inp f-mtb5">
                    <span class="laber">条码</span>
                    <span class="inp s-inpbg">
                        <input v-model="BarCode" type="text" @keyup.enter="getBarCode()" class="s-inpbg">
                    </span>
                </div>
                <div class="m-inp f-mtb5">
                    <x-switch class="f-mtb5" style="font-size: 16px;padding:0 10px;margin-left: 16px;" title="类型" :value-map="['可用','报废']" v-model="Type" @on-change="changeSwitch"></x-switch>
                    <div style="font-size: 16px;">{{Type}}</div>
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
                                                <!-- <span class="showmsg">{{item.Type}}</span>
                                                 -->
                                                <span class="showmsg" v-show="item.Type==0">可用</span>
                                                <span class="showmsg" v-show="item.Type==1">报废</span>
                                            </div>
                                        </div>
                                        <div class="rowtwo">
                                            <div class="showlistmsg">
                                                <span class="label">供应商:</span>
                                                <span class="showmsg">{{item.Supplier}}</span>
                                            </div>
                                            <div class="showlistmsg">
                                                <span class="label">数量:</span>
                                                <span class="showmsg">{{item.Qty}}</span>                                            </div>
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
export default {
    name: 'ReworkRecevingGood',
    data() {
        return {
            BadColor:false,
            Successbtn:false,
            Dangerbtn:false,
            showPositionValue:false,
            Msg:'',
            ShowPeople:false,
            ShowConfirm:false,
            ControlConfirm:false,
            ConfirmMsg:'',
            PartsList: [
            ],
            RemarkBill:null,        //返修单
            BarCode:null,           //条码
            Type:'可用',            //类型，默认为可用
            TypeNum:0,

            showThost:false,
            loadingtitle:'提交中',
        }
    },
    components: {
    },
    methods: {
        //获取返修单
        getRemarkBill(){
            console.log(this.RemarkBill);
            if(this.RemarkBill==null ||this.RemarkBill==''){
                this.showPositionValue=true
                this.Msg='返修单不能为空'
                return
            }
            this.scanReceiveRepairNo(this.RemarkBill,this.TypeNum)
        },
        //获取条码
        getBarCode(){
            console.log(this.BarCode);
            if(this.BarCode==null ||this.BarCode==''){
                this.showPositionValue=true
                this.Msg='条码不能为空'
                this.BarCode=null
                return
            }
            // for(let i=0;i<this.PartsList.length;i++){
            //     if(this.PartsList[i].No==this.BarCode){
            //         this.showPositionValue=true
            //         this.Msg='此条码已存在'
            //         return
            //     }
            // }
            this.scanReceiveBarcode(this.BarCode,this.TypeNum)
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
        //点击提示弹窗的删除按钮
        onCancel(){
            this.Successbtn=false
            this.Dangerbtn=false
            this.BadColor=false
        },
        //点击提示弹窗的确认按钮
        onConfirm(){
            this.Successbtn=false
            this.Dangerbtn=false
            this.BadColor=false
        },
        //点击提交按钮
        doPost(){
            // this.ShowConfirm=true
            console.log(this.PartsList);
            this.submitRepairReceive(this.PartsList)
        },
        //去重
        duplicateRemoval(myarr) {
            const res = new Map();
            return myarr.filter((myarr) => !res.has(myarr.Id) && res.set(myarr.Id, 1))
        },
        //当类型的值变化时，执行此方法
        changeSwitch(value){
            console.log(value);
            if(value=='可用'){
                this.TypeNum=0
                return
            }
            if(value=='报废'){
                this.TypeNum=1
                return
            }
        },
        //扫描返修单，获取数据的接口
        scanReceiveRepairNo(no,type){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.scanReceiveRepairNo(no,type).then(res=>{
                this.showThost=false
                console.log(res);
                if(res.Success==true){
                    // this.PartsList=res.Result
                    // this.PartsList.unshift(res.Result) 
                    res.Result.forEach((item,index) => {
                        this.PartsList.unshift(item) 
                    });
                    this.PartsList=this.duplicateRemoval(this.PartsList)
                    this.RemarkBill=null
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                    this.RemarkBill=null
                }
            })
        },
        //扫描条码，获取数据的接口
        scanReceiveBarcode(barcode,type){
            this.loadingtitle='加载中'
            this.showThost=true
            this.$axiosApi.scanReceiveBarcode(barcode,type).then(res=>{
                this.showThost=false
                console.log(res);
                if(res.Success==true){
                    res.Result.forEach((item,index) => {
                        this.PartsList.unshift(item) 
                    });
                    this.PartsList=this.duplicateRemoval(this.PartsList)
                    this.BarCode=null
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                    this.BarCode=null 
                }
            })
        },
        //提交信息接口
        submitRepairReceive(data){
            this.loadingtitle='提交中'
            this.showThost=true
            this.$axiosApi.submitRepairReceive(data).then(res=>{
                console.log(res);
                this.showThost=false
                if(res.Success==true){
                    this.Successbtn=true
                    this.BadColor=false
                    this.ShowConfirm=true
                    this.ConfirmMsg='提交成功'
                    this.PartsList=[]
                }else{
                    this.BadColor=true
                    this.Dangerbtn=true
                    this.ShowConfirm=true
                    this.ConfirmMsg=res.Message
                }
            })
        },
    },
    mounted () {
        console.log("BillNo:"+localStorage.getItem('BillNo'));
        this.$refs.barinput.focus()
    }
}
</script>

<style lang="less">

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
