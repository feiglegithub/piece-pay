<template>
    <div class="g-index">
        <!-- 头部 -->
        <!-- <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            返修收获-类型
            <a slot="right" @click="doSure">确定</a>
        </x-header> -->
        <x-header class="m-header" :left-options="{showBack:false}"  style="background-color:#22292C">
            <a slot="left" @click="goBack">
                <span style="font-size:26px;" class="iconfont icon-weibiaoti-"></span>
            </a>
                配件更换
            <a slot="right" @click="doSure">确定</a>
        </x-header>
        <div class="f-flexvw f-flexg1">
            <picker :data='ScanType' v-model="ChoiceType" @on-change='changePicker' class="m-picker"></picker>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

export default {
    name: 'ToolReplacementScanType',
    data() {
        return {
            ChoiceType:[],
            ScanType:[['更换','拆卸']],
            ChoicePicker:'更换',
            PreRouter:'',
        }
    },
    components: {
    },
    methods: {
        //返回 菜单页
        goBack(){

            // this.$router.push({name:this.PreRouter})
            this.$router.push({name:'BaseIndex'})
        },
        //当选择的类型改变时，将选择的类型赋值给changePicker
        changePicker(val){
            this.ChoicePicker=val[0]
        },
        //点击确认按钮，根据选择的类型，跳转到不同的页面
        doSure(){
            console.log(this.ChoicePicker);
            this.$store.dispatch('removeKeepAlive', 'PartsReplaceIndex')
            if(this.ChoicePicker=='更换'){
                this.$router.push({name:'PartsReplaceIndex'})
                //获取当前选择的扫描类型（更换）
                this.$store.dispatch('changeUserInfo',{attr:'scantype',val:this.ChoicePicker});
                return
            }
            if(this.ChoicePicker=='拆卸'){
                this.$router.push({name:'PartsReplaceIndex'})
                //获取当前选择的扫描类型（拆卸）
                this.$store.dispatch('changeUserInfo',{attr:'scantype',val:this.ChoicePicker});
                return
            }
        }
    },
    mounted () {
        this.$store.dispatch('changeUserInfo',{attr:'equipMsg',val:null});
    }
}
</script>

<style lang="less">

</style>
