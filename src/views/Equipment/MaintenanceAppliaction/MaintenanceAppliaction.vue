<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header"  style="background-color:#22292C">
            维修申请
            <a slot="right" @click="doPost">提交</a>
        </x-header>
        <div class="f-flexvw f-flexg1 f-pdlr5">
            <s-messageheader class="f-mt10" messagetitle="设备信息"></s-messageheader>
            <div class="g-basebox">
                <div class="m-baserowbox">
                    <span class="label">设备编码</span>
                    <input type="text" class="inp" v-model="DeviceCode">
                </div>
                <div class="m-baserowbox">
                    <span class="label">设备编码</span>
                    <span class="text">{{DeviceCode}}</span>
                </div>
                <div class="m-baserowbox">
                    <span class="label">机台号</span>
                    <span class="text">DZ0001</span>
                </div>
                <div class="m-baserowbox">
                    <span class="label">型号</span>
                    <span class="text">HP1956-663</span>
                </div>
                <div class="m-baserowbox">
                    <span class="label">部门</span>
                    <span class="text">宁西一厂-衣柜四部</span>
                </div>
                <div class="m-baserowbox">
                    <span class="label">工序</span>
                    <span class="text">开料</span>
                </div>
            </div>
            <s-messageheader class="f-mt10" messagetitle="维修申请单填写"></s-messageheader>
            <div class="g-basebox">
                <div class="m-baserowbox">
                    <span class="label">维修类型</span>
                    <div v-for="(item,index) in checks" :key="index">
                        <label class="m-myradio f-mr10">
                            <input type="radio" v-model="picked" :value="item">
                            <span>{{item}}</span>
                        </label>
                    </div>
                    <span class="require">*</span>
                </div>
                <div v-show="ControlRepair">
                    <div class="m-baserowbox radiothree">
                        <span class="label">紧急程度</span>
                        <div v-for="(item,index) in Degree" :key="index" style="margin-right: 37px;">
                            <label class="m-myradio">
                                <input type="radio" v-model="DegreePick" :value="item">
                                <span>{{item}}</span>
                            </label>
                        </div>
                        <span class="require">*</span>
                    </div>
                    <div class="m-baserowbox">
                        <span class="label">故障发生时间</span>
                        <datetime class="inp" v-model='nowtime' format="YYYY-MM-DD HH:mm:00" @on-change="changeTime"></datetime>
                        <span class="require">*</span>
                    </div>
                    <div class="m-baserowbox">
                        <span class="label">故障现象报告</span>
                        <!-- <input type="text" class="inp" v-model="DeviceCode"> -->
                        <textarea class="boxtextarea" name="" id="" cols="20" rows="3" placeholder="请填写故障现象报告"></textarea>
                        <span class="require">*</span>
                    </div>
                    <div class="m-baserowbox">
                        <span class="label">故障图片</span>
                        <!-- <s-container :padding-top="0" :paddinglr="true" :flexGrow="1" :isFlex="true" bgColor="#F2F2F2"> -->
                            <div class='m-album'>
                                <div v-if="arrayImage" v-for="(item, index) in arrayImage" :key="index" class='previewer-demo-img image image_small' :style="{'background-image':'url('+item.src+')','background-repeat': 'no-repeat',
                                    'background-size': 'cover'}" @click.self="showImage(index)">
                                <!-- <img class="previewer-demo-img img" :src="item.src" "/> -->
                                <!-- <div class="img" style="background:red;" ></div> -->
                                <s-icon @click="deletePicture(index)" class="close" type="#icon-delete" :size="12" color="red"></s-icon>
                                </div>
                                <div v-transfer-dom>
                                <previewer :list="arrayImage" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
                                </div>
                                <div class='image image_small' v-if="arrayImage.length<10">
                                <button @click='addImage' class="btn">
                                    <img src="@/assets/images/plus.png" class='img' />
                                </button>
                                </div>
                            </div>
                            <span>{{arrayImage.length}}/10</span>
                        <!-- </s-container> -->
                    </div>
                </div>
                <div v-show="ControlIT">
                    <div class="m-baserowbox">
                        <span class="label">故障发生时间</span>
                        <datetime class="inp" v-model='nowtime' format="YYYY-MM-DD HH:mm:00" @on-change="changeTime"></datetime>
                        <span class="require">*</span>
                    </div>
                    <div class="m-baserowbox">
                        <span class="label">机器名</span>
                        <input type="text" class="inp" v-model="DeviceCode" placeholder="只需远程解决则填写">
                    </div>
                    <div class="m-baserowbox">
                        <span class="label">故障现象报告</span>
                        <!-- <input type="text" class="inp" v-model="DeviceCode"> -->
                        <textarea class="boxtextarea" name="" id="" cols="20" rows="3" placeholder="请填写故障现象报告"></textarea>
                        <span class="require">*</span>
                    </div>
                    
                </div>
                
            </div>
        </div>

        <s-confirm v-model="showConfirm" content="确定删除图片么？" @on-cancel="onCancel" @on-confirm="onConfirm">
        </s-confirm>
        <actionsheet v-model="showAction" :menus="takePictureType" theme="android" @on-click-menu="choosePictureType">
        </actionsheet>
        <s-loading v-show="showThost" :title="loadingtitle" :img="true" :transition="true"></s-loading>
        <!-- <s-loading v-show="true" :title="loadingtitle"></s-loading> -->
        <s-confirm v-model="PostConfirm" content="提交成功" @on-cancel="onCancel" @on-confirm="onConfirm" :showConfirmButton='false'>
        </s-confirm>
        
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
    name: '',
    data() {
        return {
            PostConfirm:false,      //控制提交操作的提示弹窗
            ControlRepair:true,
            ControlIT:false,
            nowtime:'',
            picked:'设备维修',
            DegreePick:'',
            checks:['设备维修','IT维修'],
            Degree:['紧急','急','一般'],
            DeviceCode:'',
            messagetitle:'设备信息',
            showThost:false,
            //上传图片的参数配置开始
            showAction: false,
            takePictureType: {
                shoot: '拍摄',
                album: '从相册选择'
            },
            loadingtitle:'加载中',
            stopWaitPullup: false,
            mydata:[1,2],
            showConfirm: false,
            currentType: "",
            currentDetail: "",
            currentImageIndex: 0,
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
        picked(val){
            if(val=='IT维修'){
                this.ControlIT=true
                this.ControlRepair=false
                return
            }
            if(val=='设备维修'){
                this.ControlRepair=true
                this.ControlIT=false
                return
            }
        }
    },
    components: {
    },
    methods: {
        choiceTime(){
            console.log('选择时间');
        },
        changeTime(value){
            console.log(value);

            // this.nowtime=value+':00'
        },
        doPost(){
            this.PostConfirm=true
        },
        //图片上传的方法开始
        logIndexChange(arg) {
            console.log(arg);
        },
        showImage(index) {
            console.log('父');
            this.$refs.previewer.show(index);
        },
        addImage() {
            this.showAction = true;
        },
        // changeImgRotate(src,rotate) {
        changeImgRotate(src) {
            console.log(src);
            var _this = this;
            // 通过构造函数来创建的 img 实例，在赋予 src 值后就会立刻下载图片，相比 createElement() 创建 <img> 省去了 append()，也就避免了文档冗余和污染
            var img = new Image();
            img.src = src;
            img.onload = function () { //要先确保图片完整获取到，这是个异步事件
            var canvas = document.createElement("canvas"); //创建canvas元素
            var w = img.width;
            var h = img.height;
            console.log('w', w, 'h', h);
            var ctx = canvas.getContext("2d");
            // if (rotate===90) {
            //   canvas.width = h;
            //   canvas.height = w;
            //   ctx.translate(h / 2, w / 2);
            //   ctx.rotate(0.5 * Math.PI);
            //   ctx.translate(-w / 2, -h / 2);
            // } else {
            canvas.width = w;
            canvas.height = h;
            // }
            ctx.drawImage(img, 0, 0, w, h); //将图片绘制到canvas中
            let dataURL = canvas.toDataURL(); //转换图片为dataUR
            _this.draw(dataURL)
            }
        },
        //将base64图片push进入arrayImage数组
        draw(value) {
            console.log('value', value);
            this.arrayImage.push({
            msrc: value,
            src: value
            });
        },
        choosePictureType(key) {
            console.log(key);
            if (key === "shoot") { //如果选择拍摄照片
            console.log('shoot', this.currentType, this.currentDetail);
            let _this = this;
            this.$hybridApi.chooseImage({
                success: function (imagePath) {
                console.log("拍照后的图片地址" + imagePath);
                // _this.changeImgRotate(imagePath,0);
                _this.changeImgRotate(imagePath);
                console.log('arrImage', _this.arrayImage);
                }
            });
            } else {
            console.log('album', this.currentType, this.currentDetail);
            let _this = this;
            this.$hybridApi.chooseImages({
                maxNum:10-_this.arrayImage.length,
                success: imagePathList => {
                imagePathList.forEach(imagePath=>{
                    _this.changeImgRotate(imagePath);
                // _this.changeImgRotate(imagePath,90);
                console.log('arrImage', _this.arrayImage);
                })
                
                }
            });
            }
        },
        deletePicture(index) {
            console.log('子');
            console.log(index);
            //先弹个确认窗口是否需要确认
            this.showConfirm = true;
            this.currentImageIndex = index;
        },
        onConfirm() {
            console.log('onConfirm');
            this.arrayImage.splice(this.currentImageIndex, 1);
        },
        onCancel() {
            console.log('onCancel');
        },
        uploadImage() {
            //先弹个确认框，再跳转
            let _this = this;
            this.$axiosApi.uploadImage(this.currentType, this.currentDetail).then(res => {
            if (res.Success) {
                console.log('上传成功');
                Vue.$vux.toast.show({
                    text: "上传成功",
                    width: '3rem',
                    time: 2000,
                    position: 'middle',
                    type: "success"
                }),
                setTimeout(function () {
                    // _this.$router.go(-1);
                    let that = _this;
                    _this.$router.replace({
                    name: "Task-DefectCodeSelection",
                    params: {
                        itemName: that.curItem
                    }
                    })
                }, 2000);
            }
            })
        },
        //图片上传的方法结束
    },
    mounted () {
    }
}
</script>

<style lang="less">


</style>
