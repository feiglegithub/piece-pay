export default [
    {
        path: '/onOffMachine',
        name: 'onOffMachine',
        component: () => import('@/views/OnOffMachine/OnOffMachine')
    },
    {
        path: '/onOffMachineManager',
        name: 'onOffMachineManager',
        component: () => import('@/views/OnOffMachine/OnOffMachineManage')
    }
]