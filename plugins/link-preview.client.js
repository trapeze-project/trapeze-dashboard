import Vue from 'vue'
import LinkPreview from '@ashwamegh/vue-link-preview'
import { CalendarHeatmap } from 'vue-calendar-heatmap'
import VueResizeText from 'vue-resize-text'
import VueTour from 'vue-tour'

require('vue-tour/dist/vue-tour.css')

Vue.use(VueTour)
Vue.use(VueResizeText)
Vue.component('calendarHeatmap', CalendarHeatmap)
Vue.component('LinkPreview', LinkPreview)
