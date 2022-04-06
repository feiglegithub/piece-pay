<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            逐行扫码收货
            <!-- <a slot="right">取消</a> -->
            <a slot="right">提交</a>
        </x-header>
        <div class="f-flexvw f-flexg1">
            <div class="g-inp">
                <div class="m-inp f-mtb5">
                    <span class="laber">条码</span>
                    <span class="inp"><input type="text" @keyup.enter="getEnter()" class="s-bgwhile" @focus="getFocus()" @blur="getBlur()"></span>
                </div>
                <div class="m-inp f-mtb5">
                    <span class="laber">部门</span>
                    <span class="inp"><input type="text" class="s-bgwhile"></span>
                </div>
            </div>
            <div class="g-scrollbox">
                
                <swipeout style="overflow-y: scroll;">
                    <swipeout-item v-for="(item,index) in checklistdata" :key="index" @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow">
                        <div slot="right-menu" style="padding:5px 0;">
                        <!-- <swipeout-button @click.native="onButtonClick('fav')" type="primary">取消</swipeout-button> -->
                        <swipeout-button @click.native="onButtonClick(index)" type="warn">删除</swipeout-button>
                        </div>
                        <div slot="content" class="demo-content vux-1px-t">
                            <div class="m-listbox">
                                <div class="showlistmsg">
                                    <span class="label">列号:</span>
                                    <span class="showmsg">{{item.No}}</span>
                                </div>
                                <div class="showlistmsg">
                                    <span class="label">物料:</span>
                                    <span class="showmsg">{{item.Name}}</span>
                                </div>
                                <div class="rowtwo">
                                    <div class="showlistmsg">
                                        <span class="label">供应商:</span>
                                        <span class="showmsg">{{item.Machine}}</span>
                                    </div>
                                    <div class="showlistmsg">
                                        <span class="label">数量:</span>
                                        <span class="showmsg">{{item.state}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </swipeout-item>
                </swipeout>
                <x-button @click.native="show12 = true" plain type="primary"> open </x-button>
                <div v-transfer-dom>
                    <popup v-model="show12" position="bottom">
                        <group>
                        <cell v-for="i in 20" :key="i" :title="i" @click.native="chooseList(i)"></cell>
                        </group>
                        <div style="padding: 15px;">
                        <x-button @click.native="show12 = false" plain type="primary"> Close Me </x-button>
                        </div>
                    </popup>
                </div>
            </div>

        </div>
        <s-loading v-show="showThost" :title="loadingtitle" :img="true" :transition="true"></s-loading>
        <!-- <s-loading v-show="true" :title="loadingtitle"></s-loading> -->
    </div>
</template>

<script type="text/ecmascript-6">
import {Swipeout,SwipeoutItem,SwipeoutButton,Popup,
    Group,
    Cell,
    XSwitch,} from 'vux'
import BScroll from 'better-scroll'
export default {
    name: '',
    data() {
        return {
            show12:false,
            showThost:false,
            loadingtitle:'加载中',
            stopWaitPullup: false,
            mydata:[1,2],
            "checklistdata": [
                {
                    "No": "310000200102010111",
                    "Name": "Margaret Anderson",
                    "Machine": "24台机",
                    "state": "1"
                },
                {
                    "No": "65000019871119214X",
                    "Name": "Robert Wilson",
                    "Machine": "27台机wwwwwww",
                    "state": "1"
                },
                {
                    "No": "540000199611293110",
                    "Name": "Mark Jones",
                    "Machine": "17台机",
                    "state": "1"
                },
                {
                    "No": "620000199802249374",
                    "Name": "Jeffrey Wilson",
                    "Machine": "29台机",
                    "state": "1"
                },
                {
                    "No": "420000201102175768",
                    "Name": "Deborah Brown",
                    "Machine": "14台机",
                    "state": "1"
                },
                {
                    "No": "71000019750429118X",
                    "Name": "Matthew Brown",
                    "Machine": "12台机",
                    "state": "1"
                },
                {
                    "No": "820000199011205532",
                    "Name": "Karen Thomas",
                    "Machine": "22台机",
                    "state": "1"
                },
                {
                    "No": "51000019911202237X",
                    "Name": "Robert Miller",
                    "Machine": "19台机",
                    "state": "1"
                },
                {
                    "No": "44000019921004753X",
                    "Name": "Gary Williams",
                    "Machine": "21台机",
                    "state": "1"
                },
                {
                    "No": "500000200401058188",
                    "Name": "Edward Lee",
                    "Machine": "24台机",
                    "state": "1"
                },
                {
                    "No": "310000200102010111",
                    "Name": "Margaret Anderson",
                    "Machine": "24台机",
                    "state": "1"
                },
                {
                    "No": "65000019871119214X",
                    "Name": "Robert Wilson",
                    "Machine": "27台机",
                    "state": "1"
                },
                {
                    "No": "540000199611293110",
                    "Name": "Mark Jones",
                    "Machine": "17台机",
                    "state": "1"
                },
                {
                    "No": "620000199802249374",
                    "Name": "Jeffrey Wilson",
                    "Machine": "29台机",
                    "state": "1"
                },
                {
                    "No": "420000201102175768",
                    "Name": "Deborah Brown",
                    "Machine": "14台机",
                    "state": "1"
                },
                {
                    "No": "71000019750429118X",
                    "Name": "Matthew Brown",
                    "Machine": "12台机",
                    "state": "1"
                },
                {
                    "No": "820000199011205532",
                    "Name": "Karen Thomas",
                    "Machine": "22台机",
                    "state": "1"
                },
                {
                    "No": "51000019911202237X",
                    "Name": "Robert Miller",
                    "Machine": "19台机",
                    "state": "1"
                },
                {
                    "No": "44000019921004753X",
                    "Name": "Gary Williams",
                    "Machine": "21台机",
                    "state": "1"
                },
                {
                    "No": "500000200401058188",
                    "Name": "Edward Lee",
                    "Machine": "24台机",
                    "state": "1"
                }
            ]
        }
    },
    components: {
        Swipeout,SwipeoutItem,SwipeoutButton,Popup,Group,Cell,XSwitch
    },
    methods: {
        scrollHand(){
            let myscroll=this.$refs.bscroll
            console.log(myscroll);
            myscroll.onscroll=function(){
                console.log(myscroll.scrollTop);
                let scrollTop = myscroll.scrollTop
                document.querySelector('thead').style.transform = "translateY(" + scrollTop +"px)"
                
            }
        },
        doScroll(pos){
            // console.log(pos);
            // if(pos.y<0){
            //     let myscroll=this.$refs.bscroll
            //     let scrollTop = Math.abs(pos.y)
            //     document.querySelector('thead').style.transform = "translateY(" + scrollTop +"px)"
            // }
            // this.showThost=false;
            // this.showThost=false;
        },
        pullupData(){
            console.log('上拉');
            this.showThost=true;
            this.loadingtitle='加载中'
            // this.mydata=[1,2,3]
            
            setTimeout(() => {
                this.checklistdata.push(
                    {
                        "No": "999999",
                        "Name": "Edward Lee",
                        "Machine": "24台机",
                        "state": "1"
                    }
                )
                this.showThost=false;
            }, 1500);
        },
        pulldownDate(){
            console.log('下拉');
            this.mydata=[1,2,3]
            this.showThost=true;
            this.loadingtitle='正在刷新'
            setTimeout(() => {
                this.checklistdata=[]
                this.showThost=false;
            }, 1500);
        },
        handleEvents(type){
            console.log(type);
        },
        onButtonClick(index){
            console.log(index);
            this.checklistdata.splice(index,1)
        },
        chooseList(i){
            console.log(i);
            this.show12=false
            
        },
        getFocus(){
            console.log('获取焦点事件');
        },
        getBlur(){
            console.log('失去焦点事件');
        },
        getEnter(){
            console.log('键盘回车事件');
        }

    },
    mounted () {
        console.log("BillNo:"+localStorage.getItem('BillNo'));
    }
}
</script>

<style lang="less">
table{
    font-size:12px;
}
th {
    font-weight: 700;
    min-width: 40px;
}
.demo-content{
    padding: 5px;
}

</style>
