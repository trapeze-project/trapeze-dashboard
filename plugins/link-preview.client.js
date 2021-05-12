import Vue from 'vue'
import LinkPreview from '@ashwamegh/vue-link-preview'
import { CalendarHeatmap } from 'vue-calendar-heatmap'
import VueResizeText from 'vue-resize-text'
Vue.use(VueResizeText)
Vue.component('calendarHeatmap', CalendarHeatmap)
Vue.component('LinkPreview', LinkPreview)
