import BaseIndex from '../../views/PartsManagement/BaseIndex.vue'
import ScanType from '../../views/PartsManagement/Collection/ScanType.vue'
import ReceivingGoods from '../../views/PartsManagement/Collection/ReceivingGoods.vue'
import ReworkHandover from '../../views/PartsManagement/ReworkHandover/ReworkHandover.vue'
import ChoicePeople from '../../views/PartsManagement/ReworkHandover/ChoicePeople.vue'
import ReworkRecevingGood from '../../views/PartsManagement/ReworkRecevingGood/ReworkRecevingGood.vue'
import ReworkReceving from '../../views/PartsManagement/ReworkReceving/ReworkReceving.vue'
import ToolReplacementScanType from '../../views/PartsManagement/ToolReplacement/ToolReplacementScanType.vue'
import PartsReplaceIndex from '../../views/PartsManagement/ToolReplacement/PartsReplaceIndex.vue'
import ReplaceOriginalParts from '../../views/PartsManagement/ToolReplacement/ReplaceOriginalParts.vue'
import ReplaceParts from '../../views/PartsManagement/ToolReplacement/ReplaceParts.vue'
import ChoiceMateriel from '../../views/PartsManagement/ToolReplacement/ChoiceMateriel.vue'
import DisassembleOriginalParts from '../../views/PartsManagement/ToolReplacement/DisassembleOriginalParts.vue'
import DisassembleParts from '../../views/PartsManagement/ToolReplacement/DisassembleParts.vue'
export default [
    
  {
    path: '/',
    name: 'BaseIndex',
    component: BaseIndex,
  },
  {
    path: '/ScanType',
    name: 'ScanType',
    component: ScanType,
  },
  {
    path: '/ReceivingGoods',
    name: 'ReceivingGoods',
    component: ReceivingGoods,
  },
  {
    path: '/ReworkHandover',
    name: 'ReworkHandover',
    component: ReworkHandover,
  },
  {
    path: '/ChoicePeople',
    name: 'ChoicePeople',
    component: ChoicePeople,
  },
  {
    path: '/ReworkRecevingGood',
    name: 'ReworkRecevingGood',
    component: ReworkRecevingGood,
  },
  {
    path: '/ReworkReceving',
    name: 'ReworkReceving',
    component: ReworkReceving,
  },
  {
    path: '/ToolReplacementScanType',
    name: 'ToolReplacementScanType',
    component: ToolReplacementScanType,
  },
  {
    path: '/PartsReplaceIndex',
    name: 'PartsReplaceIndex',
    component: PartsReplaceIndex,
  },
  {
    path: '/ReplaceOriginalParts',
    name: 'ReplaceOriginalParts',
    component: ReplaceOriginalParts,
  },
  {
    path: '/ChoiceMateriel',
    name: 'ChoiceMateriel',
    component: ChoiceMateriel,
  },
  {
    path: '/ReplaceParts',
    name: 'ReplaceParts',
    component: ReplaceParts,
  },
  {
    path: '/DisassembleOriginalParts',
    name: 'DisassembleOriginalParts',
    component: DisassembleOriginalParts,
  },
  {
    path: '/DisassembleParts',
    name: 'DisassembleParts',
    component: DisassembleParts,
  },
]