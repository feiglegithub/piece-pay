<template>
  <div class="g-flex flex-vertical">
    <!-- <x-header class="m-header" :left-options="{backText:''}" style="background-color:#22292C">
        选择使用人
    </x-header> -->
    <x-header class="m-header" :left-options="{showBack:false}"  style="background-color:#22292C">
        <a slot="left" @click="goBack">
            <span style="font-size:26px;" class="iconfont icon-weibiaoti-"></span>
        </a>
            选择使用人
    </x-header>
    <s-cell backgroundColor="#F2F2F2">
      <div slot="content" class="m-searchcontent">
        <input style="-webkit-user-select: auto;" @keyup.enter="findPeople" contenteditable="true" v-model="search" placeholder="" class="input input_white"
        />
        <s-icon class="searchicon" type="#icon-search" color="#CCCCCC" :size="16"></s-icon>
      </div>
    </s-cell>
    <div class="flexwrap" style="display:flex">

      <s-scroll @pullup="getPullup" @pullDownRefresh="getPullDownRefresh" :stopPullUp="stopCheckAsnPullup"
        :pullup="true" :pulldown="true" :data='contactPeople'>
        <div @click="selectContactAsnNo(item)" class="m-peopel" v-for="(item,index) in contactPeople" :key="index">
            <div class="peoplebox">
                <span class="tag">工号</span>
                <span class="text">{{item.Code}}</span>
            </div>
            <div class="twobox">
                <div class="peoplebox">
                    <span class="tag">姓名</span>
                    <span class="text">{{item.Name}}</span>
                </div>
                <div class="peoplebox">
                    <span class="tag">部门</span>
                    <span class="text">{{item.DemartName}}</span>
                </div>
            </div>
        </div>

      </s-scroll>
    </div>
    <!-- <s-loading v-show="showThost" :img="true" :transition="true"></s-loading> -->
    <loading :show="showThost"></loading>
    <s-nodata backgroundColor="#F2F2F2" v-show="showNodata"></s-nodata>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        PageSize:20,
        NowPage:1,       //当前页
        TotlePageCount:1,    //一共有多少页
        search: "",
        stopCheckAsnPullup: false,
        LoadMore:false,
        contactPeople: [
            ],
        seletedContactAsnNo: {},
        showThost: false,
        showNodata: false
      }
    },
    methods: {
        selectContactAsnNo(item){
            // this.$emit('choicePeople',item)
            // this.$router.push({name:'ReworkHandover',params:{choicepeople:item}})
            this.$store.dispatch('changeUserInfo',{attr:'userpeople',val:item});
            // this.$router.push({name:'ReworkHandover'})
            console.log(123);
            // this.$emit('choicePeople',item)
            this.$router.push({name:'ReworkHandover'})
        },
        //返回前面
        goBack(){
        //   this.$emit('comeBack')
        this.$router.push({name:'ReworkHandover'})
        },
        getPullup(){
            console.log('加载完成');
            this.LoadMore=true
            if(this.NowPage<this.TotlePageCount){
                this.NowPage++
                this.getRepairEmployees(this.search,this.PageSize,this.NowPage)
            }else{
                this.stopCheckAsnPullup=true
            }
        },
        getPullDownRefresh(){
            console.log('刷新了');
            this.contactPeople=[]
            this.NowPage=1
            this.getRepairEmployees(this.search,this.PageSize,this.NowPage)
        },
        //当查询框的值变化时，去执行查询人员的接口
        findPeople(val){
            // console.log(this.search);
            console.log(22);
            this.NowPage=1
            this.contactPeople=[]
            this.getRepairEmployees(this.search,this.PageSize,this.NowPage)
        },
        //获取员工接口
        getRepairEmployees(keyword,pageSize,pageNumber){
            this.$axiosApi.getRepairEmployees(keyword,pageSize,pageNumber).then(res=>{
                console.log(res);
                if(res.Success==true){
                    // this.SupplierName=res.Result.Name
                    res.Result.Datas.forEach((item,index) => {
                        this.contactPeople.push(item)
                    });
                    if(this.contactPeople.length<=0){
                        this.showNodata=true
                    }else{
                        this.showNodata=false
                    }
                    // this.LoadMore=false
                    this.TotlePageCount=res.Result.PageCount
                }else{
                    this.showPositionValue=true
                    this.Msg=res.Message
                }
            })
        },
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus();
        }
      }
    },
    mounted() {
      console.log(999);
      this.getRepairEmployees(this.search,this.PageSize,this.NowPage)
    },
  }

</script>
<style>


</style>
