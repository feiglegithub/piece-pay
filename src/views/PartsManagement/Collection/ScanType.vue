<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            收货扫码类型
            <!-- <a slot="right">取消</a> -->
            <a slot="right" @click="doSure">确定</a>
        </x-header>
        <div class="f-flexvw f-flexg1">
            <picker :data='ScanType' v-model="ChoiceType" @on-change='changePicker' class="m-picker"></picker>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

export default {
    name: 'ScanType',
    data() {
        return {
            ChoiceType:[],
            ScanType:[['逐行扫码收货','逐行扫码123','逐444收货']],
            ChoicePicker:'逐行扫码收货',
        }
    },
    components: {
    },
    methods: {
        changePicker(val){
            // console.log(val);
            this.ChoicePicker=val[0]
        },
        doSure(){
            console.log(this.ChoicePicker);
            if(this.ChoicePicker=='逐行扫码收货'){
                console.log(333);
                this.$router.push({name:'ReceivingGoods'})
                //获取当前选择的扫描类型
                this.$store.dispatch('changeUserInfo',{attr:'scantype',val:this.ChoicePicker});
            }
            // this.$router.push({name:'ReceivingGoods'})
        }
    },
    mounted () {
    }
}
</script>

<style lang="less">

</style>
