import { createWebHistory, createRouter } from 'vue-router'

import FormularioTarea from '../components/FormularioTarea.vue'
import ListaTareas from '../components/ListaTareas.vue'

//import { data } from 'jquery'

const routes = [
    { path: '/', name: 'Home', component: FormularioTarea }
    ,{ path: '/formulario', name: 'Formulario', component: FormularioTarea }
    ,{ path: '/lista', name: 'Lista', component: ListaTareas }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router 

