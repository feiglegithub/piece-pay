/**
 * 配件更换：获取单元
 * @return  obj={"Success": true,
                 "Message": null,
                  "Result": [],
                 "Context": {
                    "Ticket": "str"票据信息
                }
                }
 *  @example $axiosApi.getAsnType().then(obj=>{})
 */
import Vue from 'vue';
import Storage from '../../storage.js'
export default function (equipId,assetId,equipUnitAttach,knifeNo) {
    return Vue.axios.post(Storage.url(), {
        "ApiType": "KnifeChangeApiController",
        "Parameters": [
          {
            "Value": equipId
          },
          {
            "Value": assetId
          },
          {
            "Value": equipUnitAttach
          },
          {
            "Value": knifeNo
          }
        ],
        "Method": "GetEquipUnits",
        "Context": {
            "Ticket": Storage.ticket(),
            "InvOrgId": Storage.orgid()
        }
      }
    ).then(res => {
        console.log(res);
        
        if (res.data.Success) {
            Storage.refreshTicket(res.data.Context.Ticket)
        };
        let obj = res.data
        return obj
    }).catch(err => {
        if (Vue.$vux.loading.isVisible()) {
            Vue.$vux.loading.hide()
        }; //如果当前有显示loading就先隐藏 
        Vue.$vux.toast.show({
            // text: err.toString(),
            text: "连接服务器失败",
            width: '5rem',
            time: 2000,
            position: 'middle',
            type: "text"
        })
    })
}