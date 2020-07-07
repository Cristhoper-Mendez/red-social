import Vue from 'vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas, faUserSecret, faImages } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret, fas, faImages)

Vue.component('font-awesome-icon', FontAwesomeIcon)
