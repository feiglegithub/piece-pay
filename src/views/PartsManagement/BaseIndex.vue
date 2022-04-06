<template>
  <div class="g-index">
    <s-header @closeApp="closeApp"></s-header>
    <div class="f-flexvscroll" style="background-color: #fff">
      <grid
        :show-lr-borders="false"
        :show-vertical-dividers="false"
        class="m-navgrid"
        :cols="3"
      >
        <!-- <grid-item class="f-flexjscen" @click.native="$router.push({name:'SparePart'})">
                    <div class="m-otheroperation">
                        <img slot="icon" src="../../assets/img/4.png">
                        <p class="operationtitle">备料点数</p>
                    </div>
                </grid-item> -->
        <grid-item
          class="f-flexjscen"
          @click.native="$router.push({ name: 'ReceivingGoods' })"
          v-show="showCollection"
        >
          <div class="m-otherchoice">
            <div>
              <span class="iconfont icon-gongyede-6"></span>
              <p class="operationtitle">配件采集</p>
            </div>
          </div>
        </grid-item>
        <grid-item
          class="f-flexjscen"
          @click.native="$router.push({ name: 'ToolReplacementScanType' })"
          v-show="showToolReplacement"
        >
          <div class="m-otherchoice">
            <div>
              <span class="iconfont icon-gaishan"></span>
              <p class="operationtitle">配件更换</p>
            </div>
          </div>
        </grid-item>
        <grid-item
          class="f-flexjscen"
          @click.native="$router.push({ name: 'ReworkHandover' })"
          v-show="showReworkHandover"
        >
          <div class="m-otherchoice">
            <div>
              <span class="iconfont icon-handshakedealp"></span>
              <p class="operationtitle">外发维修</p>
            </div>
          </div>
        </grid-item>
        <grid-item
          class="f-flexjscen"
          @click.native="$router.push({ name: 'ReworkRecevingGood' })"
          v-show="showReworkRecevingGood"
        >
          <div class="m-otherchoice">
            <div>
              <span class="iconfont icon-gongyede-19"></span>
              <p class="operationtitle">外修接收</p>
            </div>
          </div>
        </grid-item>
        <grid-item
          class="f-flexjscen"
          @click.native="$router.push({ name: 'ReworkReceving' })"
          v-show="showReworkReceving"
        >
          <div class="m-otherchoice">
            <div>
              <span class="iconfont icon-gongyede-14"></span>
              <p class="operationtitle">配件交接</p>
            </div>
          </div>
        </grid-item>
      </grid>
    </div>
    <div class="m-footers">
      <!-- <div class="footerlogo">
                <div class="logo">
                    <img src="../../assets/img/home.png" alt="">
                </div>
                <div class="title">首页</div>
            </div> -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import devlogin from "../../assets/js/devLogin.js";

export default {
  name: "",
  data() {
    return {
      RoleController: null,
      showCollection: false,
      showReworkHandover: false,
      showToolReplacement: false,
      showReworkRecevingGood: false,
      showReworkReceving: false,
    };
  },
  components: {},
  methods: {
    //登陆
    login() {
      devlogin(this).then((res) => {
        console.log("登陆的用户" + JSON.stringify(res));
        this.getAuthorizedAppMenus();
      });
    },
    //获取app权限
    getAuthorizedAppMenus() {
      this.$axiosApi
        .getAuthorizedAppMenus("配件管理", this.$store.getters.getUserId)
        .then((res) => {
          console.log(res);
          if (res !== null) {
            this.RoleController = res.Result;
            console.log(this.RoleController.childs);
            this.RoleController.childs.forEach((element) => {
              console.log(element.code);
              if (element.code == "配件采集") {
                this.showCollection = true;
              }
              if (element.code == "配件更换") {
                this.showToolReplacement = true;
              }
              if (element.code == "外发维修") {
                this.showReworkHandover = true;
              }
              if (element.code == "外修接收") {
                this.showReworkRecevingGood = true;
              }
              if (element.code == "配件交接") {
                this.showReworkReceving = true;
              }
            });
          }
        });
    },
    closeApp() {
      console.log("关闭App");
      this.$hybridApi.closeApp();
    },
  },
  mounted() {
    this.login();
    //用于处理清空使用人的vuex存储
    this.$store.dispatch("changeUserInfo", { attr: "user", val: "" });
    // console.log('路由的id：'+this.$route.query.index);
    localStorage.setItem("BillNo", "123456");
  },
};
</script>

<style lang="less">
</style>
