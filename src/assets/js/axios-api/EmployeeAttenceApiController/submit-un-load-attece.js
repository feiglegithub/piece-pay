import Vue from 'vue'
import storage from '../../storage'

export default function (id) {
    return Vue.axios.post(storage.url(), {
        "ApiType": "EmployeeAttenceApiController",
        "Parameters": [{
            Value: id
        }],
        "Method": "SubmitUnLoadAttece",
        "Context": {
            "Ticket": storage.ticket(),
            "InvOrgId": storage.orgid()
        }
    })
}