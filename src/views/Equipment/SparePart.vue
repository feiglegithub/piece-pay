<template>
    <div class="g-index">
        <!-- 头部 -->
        <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
            设备点数
            <a slot="right">取消</a>
            <a slot="right">提交</a>
        </x-header>
        <div class="f-flexvw f-flexg1 s-contentbg">
            <div class="g-inp">
                <div class="m-inp">
                    <span class="laber">领料单</span>
                    <span class="inp"><input type="text" class="s-bgwhile"></span>
                </div>
            </div>
            <!-- <div class="flexwrap"> -->
                <s-scrolltable @scroll="doScroll" :listenScroll='true' @pullup="pullupData" @pullDownRefresh="pulldownDate" :stopPullUp="stopWaitPullup" :pullup="true"
                    :pulldown="true" :data='mydata'>
                    <!-- <div style="width:1990px">1234</div> -->
                    <!-- <div style="height:101%;width:100%;overflow:scroll;"> -->
                        <table class="m-table">
                            <thead>
                                <tr>
                                    <th>序号</th>
                                    <th>生产批次</th>
                                    <th>物料编码</th>
                                    <th>需求数</th>
                                    <th>实发数</th>
                                    <th>确认数</th>
                                    <th>规格</th>
                                    <th>班次</th>
                                    <th>部门</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item,index) in checklistdata" :key="index">
                                    <td>{{index+1}}</td>
                                    <td>{{item.No}}</td>
                                    <td>{{item.Name}}</td>
                                    <td>{{item.Machine}}</td>
                                    <td>{{item.state}}</td>
                                </tr>
                                
                            </tbody>
                        </table>
                    <!-- </div> -->
                    
                </s-scrolltable> 
            <!-- </div> -->
        </div>
        <s-loading v-show="showThost" :title="loadingtitle" :img="true" :transition="true"></s-loading>
        <!-- <s-loading v-show="true" :title="loadingtitle"></s-loading> -->
    </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
export default {
    name: '',
    data() {
        return {
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

    },
    mounted () {
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

</style>
