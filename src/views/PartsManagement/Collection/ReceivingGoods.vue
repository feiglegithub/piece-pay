<template>
  <div class="g-index">
    <!-- 头部 -->
    <x-header
      class="m-header"
      :left-options="{ backText: '' }"
      style="background-color: #22292c"
    >
      配件信息采集
      <!-- <a slot="right">取消</a> -->
      <a slot="right" @click="doPost" :class="{ 'f-noclick': showThost }"
        >提交</a
      >
    </x-header>
    
    <div class="f-flexvw f-flexg1">
      <div class="g-inp">
        <div class="m-inp f-mtb5">
          <span class="laber">条码</span>
          <span class="inp s-inpbg">
            <!-- <input type="text" v-model="BarCode" @keyup.enter="getBarCode()" class="s-inpbg" ref="barinput"> -->
            <input
              type="text"
              v-model="BarCode"
              @keyup.enter="getBarCode"
              class="s-inpbg"
              ref="barinput"
            />
            <span
              class="iconfont icon-iconfontscan"
              @click="scanBarCode"
            ></span>
          </span>
        </div>
        <div class="m-inp f-mtb5">
          <span class="laber">部门</span>
          <span class="inp s-bgwhile">{{ ChoiceDepartments }}</span>
          <!-- <div class="select s-bgwhile"  @click="ShowDepartment = true">
                        <popup-picker 
                            :show.sync="ShowDepartment" 
                            :data="DepartmentList" 
                            v-model="Department"
                            @on-change="changeDepartment"
                            value-text-align='left'
                        ></popup-picker>
                    </div> -->
        </div>
      </div>
      <div class="g-scrollbox">
        <div style="overflow-y: scroll">
          <s-messageheader
            class="f-mt10"
            messagetitle="条码信息"
            v-show="PartsList.length > 0"
          ></s-messageheader>
          <swipeout>
            <swipeout-item
              v-for="(item, index) in PartsList"
              :key="index"
              @on-close="handleEvents('on-close')"
              @on-open="handleEvents('on-open')"
              transition-mode="follow"
            >
              <div slot="right-menu" style="padding: 5px 0">
                <swipeout-button
                  @click.native="onButtonClick(index)"
                  type="warn"
                  >删除</swipeout-button
                >
              </div>
              <div slot="content" class="f-pd5 vux-1px-t">
                <div class="m-listbox">
                  <div class="num">
                    {{ PartsList.length - index }}
                  </div>
                  <div class="showbox">
                    <div class="showlistmsg">
                      <span class="label">序列号:</span>
                      <span class="showmsg">{{ item.No }}</span>
                    </div>
                    <div class="showlistmsg">
                      <span class="label">物料:</span>
                      <span class="showmsg">{{ item.Item }}</span>
                    </div>
                    <div class="rowtwo">
                      <div class="showlistmsg">
                        <span class="label">供应商:</span>
                        <span class="showmsg">{{ item.Supplier }}</span>
                      </div>
                      <div class="showlistmsg">
                        <span class="label">数量:</span>
                        <span class="showmsg">{{ item.Qty }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </swipeout-item>
          </swipeout>
        </div>
      </div>
    </div>
    <!-- <div v-transfer-dom>
            <popup v-model="ShowDepartment" position="bottom" height="100%">
                <group>
                <cell v-for="(item,index) in DepartmentList" :key="index" :title="item" @click.native="chooseList(item)"></cell>
                </group>
            </popup>
        </div> -->
    <s-confirm
      v-model="ShowConfirm"
      :content="ConfirmMsg"
      :showConfirmButton="false"
      :showCancelButton="false"
      :showSuccessButton="Successbtn"
      :showDangerButton="Dangerbtn"
      :bad="BadColor"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
    >
    </s-confirm>

    <toast
      width="12em"
      v-model="showPositionValue"
      type="text"
      :time="2500"
      :text="Msg"
      position="middle"
    ></toast>
    <!-- <s-loading v-show="showThost" :title="loadingtitle" :img="true" :transition="true"></s-loading> -->
    <loading :show="showThost" :text="loadingtitle"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
import getDate from "../../../assets/js/getDate.js";
export default {
  name: "ReceivingGoods",
  data() {
    return {
      Successbtn: false,
      Dangerbtn: false,
      showPositionValue: false,
      Msg: "",
      // ShowProcedure:false,
      ShowConfirm: false, //控制提示信息弹窗的显隐
      ConfirmMsg: "",
      BadColor: false,
      PartsList: [],
      BarCode: null, //条码
      DepartmentList: [], //部门列表
      ShowDepartment: false, //控制部门弹窗的显隐
      Department: [], //显示选择部门
      ChoiceDepartments: null, //选择的部门
      ChoiceDepartmentId: null, //选择的部门id

      showThost: false,
      loadingtitle: "提交中",
    };
  },
  components: {},
  methods: {
    //获取条码
    getBarCode() {
      console.log(this.BarCode);
      if (this.BarCode == null || this.BarCode == "") {
        this.showPositionValue = true;
        this.Msg = "条码不能为空";
        this.BarCode = null;
        return;
      }
      for (let i = 0; i < this.PartsList.length; i++) {
        if (this.PartsList[i].No == this.BarCode) {
          this.showPositionValue = true;
          this.Msg = "此条码已存在";
          this.BarCode = null;
          return;
        }
      }
      this.scanKnifeBarcode(this.BarCode);
    },

    scanBarCode() {
      let that = this;
      console.log("调用扫描接口");
      this.$hybridApi.scanCode({
        success: function (res) {
          that.BarCode = res;
          that.getBarCode();
        },
      });
    },

    //点击部门，显示部门的弹窗
    choiceDepartment() {
      this.ShowDepartment = true;
    },
    //选中部门的一项，显示部门名称
    chooseList(i) {
      console.log(i);
      this.Department = i;
      this.ShowDepartment = false;
    },

    //触发单项左右滑动
    handleEvents(type) {
      console.log(type);
    },

    //点击删除按钮，删除当前项
    onButtonClick(index) {
      console.log(index);
      this.PartsList.splice(index, 1);
    },

    //获取焦点事件
    getFocus() {
      console.log("获取焦点事件");
    },

    //获取焦点事件
    getBlur() {
      console.log("获取焦点事件");
    },

    //键盘回车事件
    getEnter() {
      console.log("键盘回车事件" + this.BarCode);
    },

    //点击提示弹窗的删除按钮
    onCancel() {
      console.log("取消");
      this.Successbtn = false;
      this.Dangerbtn = false;
      this.BadColor = false;
    },
    //点击提示弹窗的确认按钮
    onConfirm() {
      console.log("确认");
      this.Successbtn = false;
      this.Dangerbtn = false;
      this.BadColor = false;
    },
    //点击提交按钮
    doPost() {
      // this.ShowConfirm=true
      console.log(this.ChoiceDepartmentId);
      console.log(JSON.stringify(this.PartsList));
      this.submitKinfe(this.PartsList, this.ChoiceDepartmentId);
    },
    // changeDepartment(){
    //     this.choiceDepartments=this.Department[0]
    // },
    //获取当前登录人的部门
    getDepartment() {
      this.$axiosApi
        .getDepartment(this.$store.getters.getUserId)
        .then((res) => {
          console.log(res);
          if (res.Success == true) {
            this.ChoiceDepartments = res.Result.Name;
            this.ChoiceDepartmentId = res.Result.Id;
          } else {
            this.showPositionValue = true;
            this.Msg = res.Message;
          }
        });
    },
    //获取扫描返修条码的信息接口
    scanKnifeBarcode(BarCode) {
      this.loadingtitle = "加载中";
      this.showThost = true;
      this.$axiosApi.scanKnifeBarcode(BarCode).then((res) => {
        this.showThost = false;
        console.log(res);
        if (res.Success == true) {
          this.PartsList.unshift(res.Result);
          this.BarCode = null;
        } else {
          this.BarCode = null;
          this.showPositionValue = true;
          this.Msg = res.Message;
        }
      });
    },
    //提交数据的接口
    submitKinfe(datas, departmentId) {
      console.log("jin");
      this.loadingtitle = "提交中";
      this.showThost = true;
      this.$axiosApi.submitKinfe(datas, departmentId).then((res) => {
        this.showThost = false;
        if (res.Success == true) {
          this.PartsList = [];
          this.BadColor = false;
          this.Successbtn = true;
          this.ShowConfirm = true;
          this.ConfirmMsg = "提交成功";
        } else {
          this.BadColor = true;
          this.Dangerbtn = true;
          this.ShowConfirm = true;
          this.ConfirmMsg = res.Message;
        }
      });
    },
  },
  created() {
    this.getDepartment();
  },
  mounted() {
    console.log("BillNo:" + localStorage.getItem("BillNo"));
    console.log(this.$store.getters.getScantype); //获取当前选择的扫描类型
    console.log(this.$store.getters.getUserName); //获取当前选择的扫描类型
    // this.DepartmentList=this.DepartmentList.push(['部门一','部门二'])
    // this.DepartmentList.push(['部门一','部门二'])       //将获取到的部门填进去
    //获取当前时间
    let mydate = new Date();
    console.log(getDate(mydate));
    this.$refs.barinput.focus();
  },
};
</script>

<style lang="less">
</style>
