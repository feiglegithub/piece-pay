<template>
    <div class="g-index">
        <s-header @closeApp='closeApp'></s-header>
        <div class="f-flexvscroll" style="background-color: #fff">
            <grid :show-lr-borders="false" :show-vertical-dividers="false" class="m-navgrid" :cols="3" >
                <!-- <grid-item class="f-flexjscen" @click.native="$router.push({name:'SparePart'})">
                    <div class="m-otheroperation">
                        <img slot="icon" src="../../assets/img/4.png">
                        <p class="operationtitle">备料点数</p>
                    </div>
                </grid-item> -->
                <grid-item class="f-flexjscen" @click.native="$router.push({name:'MaintenanceAppliaction'})">
                    <div class="m-otherchoice">
                        <div >
                            <span class="iconfont icon-chuizi"></span>
                            <p class="operationtitle">维修申请</p>
                        </div>
                    </div>
                </grid-item>
                <grid-item class="f-flexjscen" @click.native="$router.push({name:'DoRepairIndex'})">
                    <div class="m-otherchoice">
                        <div >
                            <span class="iconfont icon-repire"></span>
                            <p class="operationtitle">维修执行</p>
                        </div>
                    </div>
                </grid-item>
                <grid-item class="f-flexjscen" @click.native="$router.push({name:'SparePart'})">
                    <div class="m-otherchoice">
                        <div >
                            <span class="iconfont icon-dianjian"></span>
                            <p class="operationtitle">设备点检</p>
                        </div>
                    </div>
                </grid-item>
                <grid-item class="f-flexjscen" @click.native="$router.push({name:'SparePart'})">
                    <div class="m-otherchoice">
                        <div >
                            <span class="iconfont icon-dianjian"></span>
                            <p class="operationtitle">设备保养</p>
                        </div>
                    </div>
                </grid-item>
                
            </grid>
        </div>
        <div class="m-footers">
            <div class="footerlogo">
                <div class="logo">
                    <img src="../../assets/img/home.png" alt="">
                </div>
                <div class="title">首页</div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">

export default {
    name: '',
    data() {
        return {
        }
    },
    components: {
    },
    methods: {
        closeApp(){
            console.log('关闭App');
            this.$hybridApi.closeApp()
        }
    },
    mounted () {
        
        // console.log('路由的id：'+this.$route.query.index);
        localStorage.setItem("BillNo","123456")
    }
}
</script>

<style lang="less">


</style>
