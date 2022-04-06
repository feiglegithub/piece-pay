<template>
  <div class="g-flex flex-vertical">
    <!-- <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
        物料选择
    </x-header> -->
    <x-header class="m-header" :left-options="{showBack:false}"  style="background-color:#22292C">
        <a slot="left" @click="goBack">
            <span style="font-size:26px;" class="iconfont icon-weibiaoti-"></span>
        </a>
            物料选择
    </x-header>
    <s-cell backgroundColor="#F2F2F2">
      <div slot="content" class="m-searchcontent">
        <input style="-webkit-user-select: auto;" @keyup.enter="findMateriel" contenteditable="true" v-model="SearchMateriel" placeholder="" class="input input_white"
        />
        <s-icon class="searchicon" type="#icon-search" color="#CCCCCC" :size="16"></s-icon>
      </div>
    </s-cell>
    <div class="flexwrap" style="display:flex">

      <s-scroll @pullup="getMateriel" @pullDownRefresh="refreshMateriel" :stopPullUp="stopCheckAsnPullup"
        :pullup="true" :pulldown="true" :data='contactmateriel'>
        <div @click="choiceMateriel(item)" class="m-peopel" v-for="(item,index) in contactmateriel" :key="index">
            <div class="peoplebox">
                <span class="tag">物料编码</span>
                <span class="text">{{item.ItemCode}}</span>
            </div>
            <div class="peoplebox">
                <span class="tag">物料名称</span>
                <span class="text">{{item.ItemName}}</span>
            </div>
        </div>

      </s-scroll>
    </div>
    <toast width='12em' v-model="showPositionValue" type="text" :time="2500" :text="Msg" position="middle"></toast>
    <s-loading v-show="showThost" :img="true" :transition="true"></s-loading>
    <s-nodata backgroundColor="#F2F2F2" v-show="showNodata"></s-nodata>
  </div>
</template>
<script>
  export default {
      name:'ChoiceMateriel',
    data() {
      return {
        showPositionValue:false,    //控制消息提示的显隐
        Msg:'',                     //显示消息提示         

        PreRouter:null,             //上一级路由
        stopCheckAsnPullup: false,  //控制是否显示最后一页
        LoadMore:false,             //控制加载图标的显示隐藏
        contactmateriel: [
            
        ],
       
        showThost: false,           //控制等待的图标的显隐
        showNodata: false,           //当没有数据的时候显示
        PostData:{},                //传回去的对象值

        AssetId:null,               //固定资产id
        Unit:null,                  //单元
        Attach:null,                //配件

        SearchMateriel:null,        //查询的条件
        PageSize:20,                //一页显示多少条
        NowPage:1,                   //当前页
        TotlePageCount:null,             //总页数
        StopPullUp:false,           //停止上拉
      }
    },
    watch: {
        // contactmateriel(newval,oldval){
        //     if(val.length<=0){
        //         this.showNodata=true
        //     }
        // }
    },
    methods: {
        //点击选择其中一项，将数据存到vuex里面，并且返回原来的地方
        choiceMateriel(item){
            console.log(123);
            
            this.$router.push({name:this.PreRouter,params:{choiceMateriel:item}})
        },
        //接口：获取物料
        getItems(keyword,pageSize,pageNumber){
            this.$axiosApi.getItems(keyword,pageSize,pageNumber).then(res=>{
                if(res.Success==true){
                    // console.log(res);
                    res.Result.Datas.forEach((item,index) => {
                        this.contactmateriel.push(item)
                    });
                    if(this.contactmateriel.length<=0){
                        this.showNodata=true
                    }else{
                        this.showNodata=false
                    }
                    this.TotlePageCount=res.Result.PageCount
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
            })
        },
        //返回前面
        goBack(){
            
            this.$router.push({name:this.PreRouter,params:{choiceMateriel:null}})
        //   this.$emit('comeBack')
        },
        //执行下拉刷新
        refreshMateriel(){
            console.log('刷新了');
            this.contactmateriel=[]
            this.NowPage=1
            this.getItems(this.SearchMateriel,this.PageSize,this.NowPage)
        },
        //上拉加载更多
        getMateriel(){
            console.log('加载完成');
            if(this.NowPage<this.TotlePageCount){
                this.NowPage++
                this.getItems(this.SearchMateriel,this.PageSize,this.NowPage)
            }else{
                this.stopCheckAsnPullup=true
            }
        },
        //当查询框的值变化时，去执行查询人员的接口
        findMateriel(){
            console.log(this.SearchMateriel);
            this.NowPage=1
            this.contactmateriel=[]
            this.getItems(this.SearchMateriel,this.PageSize,this.NowPage)
        }
    },

    created(){
        console.log(this.$route.params);
        this.PreRouter=this.$route.params.route
        this.AssetId=this.$route.params.AssetId
        this.Unit=this.$route.params.Unit
        this.Attach=this.$route.params.Attach
        this.getItems(this.SearchMateriel,this.PageSize,this.NowPage)
        
    },
    mounted() {
    //     console.log(this.$route.params.route);
    //   console.log('mount:'+this.PreRouter);
        // if(this.contactmateriel.length<=0){
        //     this.showNodata=true
        // }
    },
  }

</script>
<style>


</style>
