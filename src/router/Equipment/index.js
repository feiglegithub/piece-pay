import BaseIndex from '../../views/Equipment/BaseIndex.vue'
import SparePart from '../../views/Equipment/SparePart.vue'
import Dotest from '../../views/Equipment/Dotest.vue'
import MaintenanceAppliaction from '../../views/Equipment/MaintenanceAppliaction/MaintenanceAppliaction'
import DoRepairIndex from '../../views/Equipment/DoRepair/DoRepairIndex'
import DoRepair from '../../views/Equipment/DoRepair/DoRepair.vue'
export default [
    
  {
    path: '/',
    name: 'BaseIndex',
    component: BaseIndex,
  },
  {
    path: '/SparePart',
    name: 'SparePart',
    component: SparePart,
  },
  {
    path: '/Dotest',
    name: 'Dotest',
    component: Dotest,
  },
  {
    path: '/MaintenanceAppliaction',
    name: 'MaintenanceAppliaction',
    component: MaintenanceAppliaction,
  },
  {
    path: '/DoRepairIndex',
    name: 'DoRepairIndex',
    component: DoRepairIndex,
  },
  {
    path: '/DoRepair',
    name: 'DoRepair',
    component: DoRepair,
  },
]