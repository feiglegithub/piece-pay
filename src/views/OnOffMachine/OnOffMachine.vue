<template>
  <div>
    <x-header
      class="m-header"
      :left-options="{ backText: '' }"
      style="background-color: #22292c"
    >
      上下机
    </x-header>

    <div class="m-inp f-mtb5">
      <span class="laber">工站</span>
      <span class="inp s-inpbg">
        <input
          type="text"
          v-model="BarCode"
          @keyup.enter="getStation"
          class="s-inpbg"
          ref="barinput"
        />
        <span class="iconfont icon-iconfontscan" @click="scanBarCode"></span>
      </span>
    </div>

    <divider>我登录的工作站</divider>

    <div style="height: calc(100vh - 125px); overflow-x: scroll">
      <div
        style="padding: 5px; border-bottom: 1px solid"
        v-for="(item, index) in myLoginStations"
        :key="index"
        class="normal"
      >
        <div>工站编码：{{ item.WorkStationCode }}</div>
        <div>工站：{{ item.WorkStationName }}</div>
        <div>岗位：{{ item.PositionName }}</div>
        <div>上机时长：{{ item.LoadTime }}</div>
        <div>工站上机情况：{{ item.LoadSituation }}</div>
        <x-button @click.native="logOut(item.WorkStationId)">下机</x-button>
      </div>
    </div>

    <toast
      width="12em"
      v-model="showPositionValue"
      type="text"
      :time="2500"
      :text="Msg"
      position="middle"
    ></toast>

    <popup v-model="showChooseStation" position="bottom" height="auto">
      <div class="normal">
        <div style="background-color: #305eb9; color: white; padding: 2px">
          选择工站/岗位
        </div>

        <checker
          v-model="selectedStations"
          default-item-class="item-default"
          selected-item-class="item-selected"
          type="checkbox"
          :radio-required="true"
        >
          <checker-item
            :value="item"
            v-for="(item, index) in stationList"
            :key="index"
          >
            <div
              style="
                text-align: left;
                border-bottom: 1px black dotted;
                padding-bottom: 5px;
              "
            >
              <div>工作编码：{{ item.WorkStationCode }}</div>
              <div>工作站：{{ item.WorkStationName }}</div>
              <div>
                岗位：
                <el-select
                  v-model="positionId"
                  placeholder="请选择"
                  size="mini"
                  @change="onChange"
                  :disabled="index > 0"
                >
                  <el-option
                    v-for="item1 in item.PositionDatas"
                    :key="item1.Id"
                    :label="item1.PositionName"
                    :value="item1.Id"
                    :disabled="item1.IsFull"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </checker-item>
        </checker>

        <div style="text-align: center">
          <x-button type="default" mini v-if="stationList.length > 1"
            >全选</x-button
          >
          <x-button type="default" mini @click.native="onLogin">上机</x-button>
          <x-button
            type="default"
            mini
            @click.native="showChooseStation = false"
            >取消</x-button
          >
        </div>
      </div>
    </popup>

    <confirm
      ref="confirm1"
      v-model="showChooseLogin"
      title="选择"
      confirm-text="上机"
      @on-cancel="onCancel"
      @on-confirm="onConfirm1"
      @on-show="onShow"
      @on-hide="onHide"
    >
      <div style="text-align: left; margin-bottom: 10px">
        当前已登录工站，是否缺换登录或同时登录多工站？
      </div>
      <checker
        v-model="chooseLogin"
        default-item-class="item-default2"
        selected-item-class="item-selected"
      >
        <checker-item value="1">切换</checker-item>
        <checker-item value="2">同时登录</checker-item>
      </checker>
    </confirm>

    <confirm
      ref="confirm2"
      v-if="showToggleLogin"
      v-model="showToggleLogin"
      title="切换登录"
      confirm-text="上机"
      @on-cancel="onCancel"
      @on-confirm="onConfirm2"
      @on-show="onShow"
      @on-hide="onHide"
      :show-confirm-button="false"
      :show-cancel-button="false"
    >
      <div style="text-align: left">
        <div>
          切换工站：
          <el-select
            v-model="selectWorkStationId"
            placeholder="请选择"
            size="mini"
            @change="onChange"
          >
            <el-option
              v-for="item in myLoginStations"
              :key="item.Id"
              :label="item.WorkStationName"
              :value="item.WorkStationId"
              :disabled="item.IsFull"
            >
            </el-option>
          </el-select>
        </div>

        <div>
          工站编码：
          <el-select
            v-model="selectWorkStationCode"
            placeholder="请选择"
            size="mini"
            @change="onChange"
          >
            <el-option
              v-for="item in myLoginStations"
              :key="item.Id"
              :label="item.PositionName"
              :value="item.PositionId"
              :disabled="item.IsFull"
            >
            </el-option>
          </el-select>
        </div>

        <div>工站：{{ stationList[0].WorkStationName }}</div>

        <div>
          岗位：
          <el-select
            v-model="selectPositionId"
            placeholder="请选择"
            size="mini"
            @change="onChange"
          >
            <el-option
              v-for="item in myLoginStations.PositionDatas"
              :key="item.Id"
              :label="item.PositionName"
              :value="item.Id"
              :disabled="item1.IsFull"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <x-button mini @click.native="onConfirm2">上机</x-button>
      <x-button mini @click.native="showToggleLogin = false">取消</x-button>
    </confirm>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectPositionId: "",
      selectWorkStationCode: "",
      showToggleLogin: false,
      selectWorkStationId: "",
      chooseLogin: "",
      showChooseLogin: false,
      BarCode: "",
      showPositionValue: false,
      Msg: "",
      showChooseStation: false,
      positionId: "",
      myLoginStations: [],
      stationList: [],
      selectedStations: [],
    };
  },
  methods: {
    logOut(Id) {
      this.$vux.loading.show();

      this.$axiosApi
        .submitUnLoadAttece(id)
        .then((res) => {
          let data = res.data;
          if (data.Success) {
            this.getEmployeeAttenceDataList();
          } else {
            this.$vux.alert.show({
              title: "错误",
              content: data.Message,
            });
          }
        })
        .catch((err) => {
          this.$vux.alert.show({
            title: "异常",
            content: err.toString(),
          });
        });
    },

    getEmployeeAttenceDataList() {
      this.$vux.loading.show();

      this.$axiosApi
        .getEmployeeAttenceDataList()
        .then((res) => {
          this.$vux.loading.hide();

          let data = res.data;
          console.log("上机列表：", data);
          if (data.Success) {
            this.myLoginStations = data.Result;
          } else {
            this.$vux.alert.show({
              title: "错误",
              content: data.Message,
            });
          }
        })
        .catch((err) => {
          this.$vux.loading.hide();

          this.$vux.alert.show({
            title: "异常",
            content: err.toString(),
          });
        });
    },

    login(selectWorkStationId) {
      let loginStations = [];

      for (const iterator of this.selectedStations) {
        let station = {};
        station.WorkStationId = iterator.WorkStationId;
        station.SelectWorkStationId = selectWorkStationId;
        station.PositionId = this.positionId;
        loginStations.push(station);
      }
      console.log("上机参数", loginStations);
      this.$axiosApi
        .submitLoadAttece(loginStations)
        .then((res) => {
          this.$vux.loading.hide();
          let data = res.data;
          console.log("上机结果", data);
          if (data.Success) {
            this.getEmployeeAttenceDataList();
          } else {
            this.$vux.alert.show({
              title: "错误",
              content: data.Message,
            });
          }
        })
        .catch((err) => {
          this.$vux.loading.hide();
          this.$vux.alert.show({
            title: "异常",
            content: err.toString(),
          });
        });
    },

    onLogin() {
      if (this.selectedStations.length > 0 && this.positionId != "") {
        if (this.myLoginStations.length > 1) {
          this.showChooseLogin = true;
        } else {
          this.showChooseStation = false;
          this.$vux.loading.show();

          this.login("");
        }
      } else {
        this.$vux.alert.show({
          title: "警告",
          content: "请选择上机信息",
        });
      }
    },

    toggleLogin() {},

    onChange() {
      this.getStation();
    },

    getStation() {
      if (this.BarCode == null || this.BarCode == "") {
        this.showPositionValue = true;
        this.Msg = "条码不能为空";
        this.BarCode = null;
        return;
      }

      this.$vux.loading.show();

      this.$axiosApi
        .getEmployeeAttenceDataByCode(
          this.BarCode,
          this.positionId === "" ? 0 : this.positionId
        )
        .then((res) => {
          this.$vux.loading.hide();

          let data = res.data;
          console.log("工站信息", data);
          if (data.Success) {
            this.stationList = data.Result;
            this.showChooseStation = true;
          } else {
            this.$vux.alert.show({
              title: "错误",
              content: data.Message,
            });
          }
        })
        .catch((err) => {
          this.$vux.loading.hide();
          this.$vux.alert.show({
            title: "异常",
            content: err.toString(),
          });
        });
    },

    scanBarCode() {
      let _this = this;
      console.log("调用扫描接口");
      if (window.cordova) {
        this.$hybridApi.scanCode({
          success: function (res) {
            _this.BarCode = res;
            _this.getStation();
          },
        });
      } else {
        
      }
    },

    onCancel() {},

    onConfirm1() {
      if (this.chooseLogin == 1) {
        this.showToggleLogin = true;
      } else {
        this.onLogin();
      }
    },

    onConfirm2() {
      if (
        this.selectPositionId == "" ||
        this.selectWorkStationCode == "" ||
        this.selectWorkStationId == ""
      ) {
        this.$vux.alert.show({
          title: "警告",
          content: "表单字段不能为空",
        });
      } else {
        this.showToggleLogin = false;
        this.login(this.selectWorkStationId);
      }
    },

    onShow() {},

    onHide() {},

    onVisibleChange(visible) {
      if (visible) {
        let els = document.getElementsByClassName("weui-dialog");
        for (const el of els) {
          el.style.zIndex = 1000;
        }
      }
    },
  },

  mounted() {
    this.getEmployeeAttenceDataList();
  },
};
</script>
<style scoped lang="less">
.item-default {
  border: 1px solid #ececec;
  padding: 5px;
  margin: 5px;
  width: calc(100vw - 3);
}
.item-default2 {
  border: 1px solid #ececec;
  padding: 5px 15px;
}
.item-selected {
  border: 1px solid green;
}
.normal {
  font-size: 16px;
}
</style>