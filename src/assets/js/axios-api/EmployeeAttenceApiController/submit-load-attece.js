import Vue from 'vue'
import storage from '../../storage'

export default function (employeeAttenceDatas) {
    return Vue.axios.post(storage.url(), {
        "ApiType": "EmployeeAttenceApiController",
        "Parameters": [{
            Value: employeeAttenceDatas
        }],
        "Method": "SubmitLoadAttece",
        "Context": {
            "Ticket": storage.ticket(),
            "InvOrgId": storage.orgid()
        }
    })
}