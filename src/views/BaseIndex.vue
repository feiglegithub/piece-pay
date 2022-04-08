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
        <grid-item
          class="f-flexjscen"
          @click.native="$router.push({ name: 'onOffMachine' })"
          v-show="showOnOffMachine"
        >
          <div class="m-otherchoice">
            <div>
              <span class="iconfont icon-jiantou_shangxiaqiehuan"></span>
              <p class="operationtitle">上下机</p>
            </div>
          </div>
        </grid-item>
        <grid-item
          class="f-flexjscen"
          @click.native="$router.push({ name: 'onOffMachineManager' })"
          v-show="showOnOffMachineManager"
        >
          <div class="m-otherchoice">
            <div>
              <span class="iconfont icon-renyuanguanli"></span>
              <p class="operationtitle">上下机管理</p>
            </div>
          </div>
        </grid-item>
      </grid>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import devlogin from "@/assets/js/devLogin.js";

export default {
  name: "",
  data() {
    return {
      RoleController: null,
      showOnOffMachine: false,
      showOnOffMachineManager: false,
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
        .getAuthorizedAppMenus("计件工资", this.$store.getters.getUserId)
        .then((res) => {
          console.log('app权限',res);
          if (res !== null) {
            this.RoleController = res.Result;
            console.log(this.RoleController.childs);
            this.RoleController.childs.forEach((element) => {
              console.log(element.code);
              if (element.code == "上下机") {
                this.showOnOffMachine = true;
              }
              if (element.code == "上下机管理" && window.cordova) {
                this.showOnOffMachineManager = true;
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
    // this.$store.dispatch("changeUserInfo", { attr: "user", val: "" });
    // console.log('路由的id：'+this.$route.query.index);
    localStorage.setItem("BillNo", "123456");
  },
};
</script>

<style lang="less">
</style>
