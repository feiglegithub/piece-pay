<template>
    <div class="g-index">
        <!-- 头部 -->
        <!-- <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            原配件信息
            <a slot="right" @click="doSure">确定</a>
        </x-header> -->
        <x-header class="m-header" :left-options="{showBack:false}"  style="background-color:#22292C">
            <a slot="left" @click="goToolReplacementScanType">
                <span style="font-size:26px;" class="iconfont icon-weibiaoti-"></span>
            </a>
                原配件信息
            <a slot="right" @click="doSure">确定</a>
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <div class="g-inp" style="min-height:50px;">
                <div class="m-inp f-mtb5">
                    <span class="laber">条码</span>
                    <span class="inp s-inpbg">
                        <input type="text" v-model="BarCode" @keyup.enter="getBarCode()" class="s-inpbg">
                    </span>
                </div>
            </div>
            <div class="g-scrollbox">
                <div style="overflow-y: auto;">
                <s-messageheader class="f-mt10" messagetitle="原配件信息"></s-messageheader>
                <swipeout>
                    <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
                        <div slot="right-menu" style="padding:5px 0;">
                        <swipeout-button @click.native="onButtonClick(index)" type="warn">删除</swipeout-button>
                        </div>
                        <!-- 有序列号的显示页面 -->
                        <div slot="content" class="f-pd5 vux-1px-t" v-show="BarCode==1">
                            <div class="s-bgE7E7E7">
                                    <div class="m-baserowbox">
                                        <span class="label100" >设备编码:</span>
                                        <span class="text">宁西一厂-衣柜四部</span>
                                    </div>
                                    <div class="m-baserowbox">
                                        <span class="label100" >机台号:</span>
                                        <span class="text">DZ0001</span>
                                    </div>
                                    <div class="m-baserowbox">
                                        <span class="label100" >设备类型:</span>
                                        <span class="text">宁西一厂-衣柜四部</span>
                                    </div>
                                    <div class="m-baserowbox">
                                        <span class="label100" >部门:</span>
                                        <span class="text">宁西一厂-衣柜四部</span>
                                    </div>
                                    <div class="m-baserowbox">
                                        <span class="label100" >工序:</span>
                                        <span class="text">宁西一厂-衣柜四部</span>
                                    </div>
                                    <div class="m-baserowbox">
                                        <span class="label100" >固定资产编码:</span>
                                        <span class="text">宁西一厂-衣柜四部</span>
                                    </div>
                                    <div class="m-baserowbox">
                                        <span class="label100" >单元:</span>
                                        <span class="text">宁西一厂-衣柜四部</span>
                                    </div>
                                    <div class="m-baserowbox">
                                        <span class="label100" >配件:</span>
                                        <span class="text">宁西一厂-衣柜四部</span>
                                    </div>
                                    <div class="m-baserowbox">
                                        <span class="label100" >物料名称:</span>
                                        <span class="text"></span>
                                    </div>
                                    <div class="m-baserowbox">
                                        <span class="label100" >数量:</span>
                                        <span class="text">宁西一厂-衣柜四部</span>
                                    </div>
                                    <div class="m-baserowbox">
                                        <span class="label100" >拆卸原因:</span>
                                        <div class="select s-bgwhile"  @click="ShowDisassembleReason = true">
                                            <popup-picker 
                                                :show.sync="ShowDisassembleReason" 
                                                :data="DisassembleReasonList" 
                                                v-model="DisassembleReason"
                                                @on-change="changePicker"
                                                value-text-align='left'
                                            ></popup-picker>
                                        </div>
                                    </div>
                                    <div class="m-baserowbox">
                                        <span class="label100" >拆卸时间:</span>
                                        <input type="number" class="inp">
                                    </div>
                                </div>
                        </div>
                        <!-- 没有序列号的显示页面 -->
                        <div slot="content" class="f-pd5 vux-1px-t" v-show="BarCode==2">
                            <div class="s-bgE7E7E7">
                                <div class="m-baserowbox">
                                    <span class="label100" >设备编码:</span>
                                    <!-- <div class="select s-bgwhile"  @click="ShowEquipmentCode = true">
                                        <popup-picker 
                                            :show.sync="ShowEquipmentCode" 
                                            :data="EquipmentCodeList" 
                                            v-model="EquipmentCode"
                                            @on-change="changePicker"
                                            value-text-align='left'
                                        ></popup-picker>
                                    </div> -->
                                    <span class="text">DZ0001</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100" >机台号:</span>
                                    <span class="text">DZ0001</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100" >设备类型:</span>
                                    <span class="text">宁西一厂-衣柜四部</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100" >部门:</span>
                                    <span class="text">宁西一厂-衣柜四部</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100" >工序:</span>
                                    <span class="text">宁西一厂-衣柜四部</span>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100" >固定资产编码:</span>
                                    <div class="select s-bgwhile"  @click="ShowAssetsCode = true">
                                        <popup-picker 
                                            :show.sync="ShowAssetsCode" 
                                            :data="AssetsCodeList" 
                                            v-model="AssetsCode"
                                            @on-change="changePicker"
                                            value-text-align='left'
                                        ></popup-picker>
                                    </div>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100" >单元:</span>
                                    <div class="select s-bgwhile"  @click="ShowUnit = true">
                                        <popup-picker 
                                            :show.sync="ShowUnit" 
                                            :data="UnitList" 
                                            v-model="Unit"
                                            @on-change="changePicker"
                                            value-text-align='left'
                                        ></popup-picker>
                                    </div>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100" >配件:</span>
                                    <div class="select s-bgwhile"  @click="ShowParts = true">
                                        <popup-picker 
                                            :show.sync="ShowParts" 
                                            :data="PartsList" 
                                            v-model="Parts"
                                            @on-change="changePicker"
                                            value-text-align='left'
                                        ></popup-picker>
                                    </div>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100" >物料编码:</span>
                                    <div class="inpwatch s-bgwhile" @click="choiceMateriel">
                                        {{ChoiceMaterialCode}}
                                        <x-icon type="ios-search" class="searchicon" size="22"></x-icon>
                                    </div>
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100" >物料名称:</span>
                                    <input class="inp" type="text" name="" id="" v-model="ChoiceMaterialName">
                                </div>
                                <div class="m-baserowbox">
                                    <span class="label100" >数量:</span>
                                    <input class="inp" type="number" name="" id="">
                                </div>
                            </div>
                        </div>
                    </swipeout-item>
                </swipeout>
                </div>
            </div>
            <!-- 弹出物料编码，进行选择 -->
            <div v-transfer-dom>
                <popup v-model="ShowMaterialCode" height="100%">
                    <choice-materiel @choicePeople='choicePeople' @comeBack='comeBack'></choice-materiel>
                </popup>
            </div>
        </div>

        <s-confirm 
        v-model="ShowConfirm" 
        content="提交成功" 
        :showConfirmButton='false' 
        :showCancelButton='false' 
        :showSuccessButton='true'
        :showDangerButton='false'
        @on-cancel="onCancel" 
        @on-confirm="onConfirm">
        </s-confirm>
    </div>
</template>

<script type="text/ecmascript-6">
import getDate from '@/assets/js/getDate.js'
import ChoiceMateriel from './ChoiceMateriel.vue'
export default {
    name: 'DisassembleOriginalParts',
    data() {
        return {
            // ShowProcedure:false,
            ShowConfirm:false,      //控制提示信息弹窗的显隐
            BarCode:null,           //条码
            DepartmentList:[],       //部门列表
            ShowDepartment:false,                   //控制部门弹窗的显隐
            Department:[],        //显示选择部门
            choiceDepartments:null,      //选择的部门
            ShowEquipmentCode:false,        //控制设备编码弹窗的显隐
            EquipmentCodeList:[['C001','C002','C003']],     //设备编码的列表
            EquipmentCode:[],               //选择的设备编码
            ShowAssetsCode:false,        //控制资产编码弹窗的显隐
            AssetsCodeList:[['Z001','Z002','Z003']],     //资产编码的列表
            AssetsCode:[],               //选择的资产编码
            ShowUnit:false,        //控制单元弹窗的显隐
            UnitList:[['单元一','单元二','单元二']],     //单元的列表
            Unit:[],                //选择的单元
            ShowParts:false,        //控制配件弹窗的显隐
            PartsList:[['配件一','配件二','配件二']],     //配件的列表
            Parts:[],                //选择的配件
            ShowMaterialCode:false,        //控制物料编码弹窗的显隐
            MaterialCodeList:[['C004','C005','C006']],     //物料编码的列表
            MaterialCode:[],                //选择的物料编码
            ShowDisassembleReason:false,        //控制拆卸原因弹窗的显隐
            DisassembleReasonList:[['修磨','补齿','拆卸','更换加工产品','维修']],     //拆卸原因的列表
            DisassembleReason:[],                //选择的拆卸原因
            ChoiceMaterialCode:null,        //选择的物料编码
            ChoiceMaterialName:null,        //选择的物料编码
            ShowMaterialCode:false,        //控制物料编码弹窗的显隐
        }
    },
    components: {
        ChoiceMateriel
    },
    methods: {
        //跳转到选择物料编码的界面
        choiceMateriel(){
            this.$router.push({name:'ChoiceMateriel'})
        },
        //返回选择类型页面
        goToolReplacementScanType(){
            this.$store.dispatch('removeKeepAlive', 'DisassembleOriginalParts')
            this.$router.push({name:'ToolReplacementScanType'})
        },
        //点击弹窗里面的某一项
        changePicker(){
            this.choiceDepartments=this.Department[0]
        },
        //获取条码
        getBarCode(){
            console.log(this.BarCode);
            // this.scanDismantleKnifeNo(this.BarCode)
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
            console.log(index);
            this.PartsList.splice(index,1)
        },

        //获取焦点事件
        getFocus(){
            console.log('获取焦点事件');
        },

        //获取焦点事件
        getBlur(){
            console.log('获取焦点事件');
        },

        //键盘回车事件
        getEnter(){
            console.log('键盘回车事件'+this.BarCode);
        },

        //点击提示弹窗的删除按钮
        onCancel(){

        },
        //点击提示弹窗的确认按钮
        onConfirm(){},
        //点击提交按钮
        doSure(){
            // this.ShowConfirm=true
            
            if(this.BarCode==1){
                this.$store.dispatch('removeKeepAlive', 'DisassembleOriginalParts')
                this.$router.push({name:'MaintenanceDetails'})
                return
            }
            if(this.BarCode==2){
                this.$router.push({name:'DisassembleParts'})
                return
            }
        },
        changeDepartment(){
            this.choiceDepartments=this.Department[0]
        },
        //选择的物料编码
        choiceMateriel(){
            // this.$router.push({name:'ChoiceMateriel'})
            this.ShowMaterialCode=true
        },
        choicePeople(item){
            this.ShowMaterialCode=false
            console.log(item);
            this.ChoiceMaterialCode=item.No
            this.ChoiceMaterialName=item.Name
        },
        comeBack(){
            this.ShowMaterialCode=false
        }
    },
    mounted () {
        this.$store.dispatch('addKeepAlive', 'DisassembleOriginalParts')
        //获取当前时间
        let mydate=new Date()
        console.log(getDate(mydate));
    
    }
}
</script>

<style lang="less">

</style>
