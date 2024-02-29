import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' 
import '@/assets/controlbar.css'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark'
  },
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
})

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')