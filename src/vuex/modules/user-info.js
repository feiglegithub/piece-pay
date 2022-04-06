export default {
   state:{
   userName:"",
   userCode:"",
   ticket:"",
   url:"",
 //    password:"", 
   userId:0,
   orgId:0,
   wareId:0,
   warehouse:"",
   authMenus:{},
   user:"",
   scantype:"",
   materiel:null,
   popupindex:null,
   userpeople:{},
   equipMsg:null,          //配件更换，保存设备信息
   originalParts:null,          //配件更换，原配件信息
   },
   mutations:{
       changeUserInfo(state,{attr,val}){
           state[attr]=val
       }
   },
   getters:{
    getUserCode(state){
           return state.userCode
       },
    getTicket(state){
        return state.ticket
    },
    getOrgId(state){
        return state.orgId
    },
    getUserName(state){
        return state.userName
    },
    getUrl(state){
         return state.url
    },
    getUserId(state){
        return state.userId
    },
    getOrgId(state){
        return state.orgId
    },
    getWareId(state){
        return state.wareId
    },
    getWarehouse(state){
        return state.warehouse
    },
    getAuthMenus(state){
            return state.authMenus
        },
    getUser(state){
        return state.user
    },
    getScantype(state){         //用于存储配件扫描类型
        return state.scantype
    },
    getMateriel(state){         //用于存储选择的物料
        return state.materiel
    },
    getPopupindex(state){         //用于存储点击的弹窗
        return state.popupindex
    },
    getUserpeople(state){         //用于存储选择的使用人
        return state.userpeople
    },
    getEquipMsg(state){         //用于存储设备信息
        return state.equipMsg
    },
    getOriginalParts(state){         //用于存储原配件信息
        return state.originalParts
    },
   },
   actions:{
       changeUserInfo(context, { attr, val }) {
        //    console.log('changeUserInfo',{ attr, val })
        context.commit('changeUserInfo',{attr,val})
    }
   }
   
    
}
