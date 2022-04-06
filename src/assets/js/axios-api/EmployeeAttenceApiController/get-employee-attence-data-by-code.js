import Vue from 'vue'
import storage from '../../storage'

export default function (workStationCode, positionId) {

    return Vue.axios.post(storage.url(), {
        "ApiType": "EmployeeAttenceApiController",
        "Parameters": [
            {
                "Value": workStationCode
            },
            {
                "Value": positionId
            }
        ],
        "Method": "GetEmployeeAttenceDataByCode",
        "Context": {
            "Ticket": storage.ticket(),
            "InvOrgId": storage.orgid()
        }
    })
}