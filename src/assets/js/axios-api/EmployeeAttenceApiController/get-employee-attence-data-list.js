import Vue from 'vue'
import storage from '../../storage'

export default function () {
    return Vue.axios.post(storage.url(), {
        "ApiType": "EmployeeAttenceApiController",
        "Parameters": [],
        "Method": "GetEmployeeAttenceDataList",
        "Context": {
            "Ticket": storage.ticket(),
            "InvOrgId": storage.orgid()
        }
    })
}