<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header"  style="background-color:#22292C">
            维修执行
            <a slot="right" style="font-size:14px">维修暂停</a>
            <a slot="right" style="font-size:14px">维修记录</a>
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5" style="overflow: scroll;">
            <s-messageheader class="f-mt10" messagetitle="设备信息"></s-messageheader>
            <div class="g-notflexbox">
                <div class="m-baserowbox">
                    <span class="label80">设备编码</span>
                    <span class="text">DeviceCode</span>
                </div>
                <div class="m-baserowbox">
                    <span class="label80">机台号</span>
                    <span class="text">DZ0001</span>
                </div>
                <div class="m-baserowbox">
                    <span class="label80">型号</span>
                    <span class="text">HP1956-663</span>
                </div>
                <div class="m-baserowbox">
                    <span class="label80">部门</span>
                    <span class="text">宁西一厂-衣柜四部</span>
                </div>
                <div class="m-baserowbox">
                    <span class="label80">工序</span>
                    <span class="text">开料</span>
                </div>
            </div>
            <s-messageheader class="f-mt10" messagetitle="维修申请单"></s-messageheader>
            <div class="g-notflexbox">
                <div class="m-baserowbox">
                    <span class="label100" style="text-align:left;">PM单号</span>
                    <span class="text">DeviceCode</span>
                </div>
                <div class="m-baserowbox">
                    <span class="label100" style="text-align:left;">紧急程度</span>
                    <span class="text">DZ0001</span>
                </div>
                <div class="m-baserowbox">
                    <span class="label100" style="text-align:left;">故障发生时间</span>
                    <span class="text">2017-11-06 11:22:00</span>
                </div>
                <div class="m-baserowbox">
                    <span class="label100" style="text-align:left;">故障现象报告</span>
                    <span class="text">宁西一厂-衣柜四部</span>
                </div>
                <div class="m-baserowbox">
                    <span class="label100" style="text-align:left;">故障图片</span>
                    <div class='m-album'>
                        <div v-if="arrayImage" v-for="(item, index) in arrayImage" :key="index" class='previewer-demo-img image image_small' :style="{'background-image':'url('+item.src+')','background-repeat': 'no-repeat',
                            'background-size': 'cover'}" @click.self="showImage(index)">
                        </div>
                        <div v-transfer-dom>
                            <previewer :list="arrayImage" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
                        </div>
                    </div>
                </div>
                <div class="m-baserowbox">
                    <span class="label100" style="text-align:left;">申请人</span>
                    <span class="text">罗艳锋</span>
                </div>
                <div class="m-baserowbox">
                    <span class="label100" style="text-align:left;">申请时间</span>
                    <span class="text">2017-11-06 11:22:00</span>
                </div>
            </div>
            <s-messageheader class="f-mt10" messagetitle="填写预计修复时间"></s-messageheader>
            <div class="g-notflexbox"> 
                <div class="m-baserowbox">
                    <span class="label100">故障发生时间</span>
                    <datetime class="inp" v-model='nowtime' format="YYYY-MM-DD HH:mm:00" @on-change="changeTime"></datetime>
                    <span class="postbtn">提交</span>
                </div>
            </div>
            
        </div>


     
        
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
    name: '',
    data() {
        return {
            nowtime:'',         //预计完成时间
            DeviceCode:'',
            showThost:false,
            //上传图片的参数配置开始
            arrayImage: [
                {
                    msrc: '../../../static/message.png',
                    src: '../../../static/message.png',
                    w: 400,
                    h: 800
                }, 
                {
                    msrc: '../../../static/message.png',
                    src: '../../../static/plus.png',
                    w: 400,
                    h: 800
                },
                
            ],
            options: {
                getThumbBoundsFn(index) {
                    let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
                    let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                    let rect = thumbnail.getBoundingClientRect()
                    return {
                    x: rect.left,
                    y: rect.top + pageYScroll,
                    w: rect.width
                    }
                }
            },
            //上传图片的参数配置结束

        }
    },
    watch: {
        
    },
    components: {
    },
    methods: {
        
        
        //图片上传的方法开始
        logIndexChange(arg) {
            console.log(arg);
        },
        //显示大图片
        showImage(index) {
            console.log('父');
            this.$refs.previewer.show(index);
        },
        //图片上传的方法结束

        changeTime(value){
            console.log(value);

            // this.nowtime=value+':00'
        },
    },
    mounted () {
    }
}
</script>

<style lang="less">


</style>
