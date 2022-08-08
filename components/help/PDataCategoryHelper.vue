<template>
  <div>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="categoriesTransformed"
          hide-default-footer
          single-select
          item-key="name"
          @click:row="select"
        >
          <template v-slot:item="{ item }">
            <tr @click="checkUserChoiceCompleted">
              <td >
                <PHoverCard :term="$t(item.name)" :definition="$t(item.name.split('.')[1])" />
              </td>
              <td v-for="radio in radioList" :key="radio.key">
                <v-radio-group v-model="preferences[item.name]">
                  <v-radio
                    style="max-width: 20px"
                    class="justify-left"
                    :name="item.name"
                    :value="radio.value"
                    :color="radio.color"
                  />
                </v-radio-group>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <v-row v-if="view.show">
      <v-col>
        <PConsentHelperDataCard :category-name="view.selected" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      preferences: {},
      view: {
        selected: '',
        show: false
      },
      radioList: [
        {
          key: 'consent-helper.comfortable',
          value: 0,
          color: 'green'
        },
        {
          key: 'consent-helper.no-opinion',
          value: 1,
          color: 'red'
        },
        {
          key: 'consent-helper.not-comfortable',
          value: 2,
          color: 'red'
        }
      ],
      headers: [
        {
          text: this.$t('consent-helper.purpose'),
          align: 'start',
          value: 'name',
          sortable: true
        },
        {
          text: this.$t('consent-helper.comfortable'),
          align: 'left',
          value: 'fine',
          sortable: false
        },
        {
          text: this.$t('consent-helper.no-opinion'),
          align: 'left',
          value: 'no',
          sortable: false
        },
        {
          text: this.$t('consent-helper.not-comfortable'),
          align: 'left  ',
          value: 'neutral',
          sortable: false
        }
      ]
    }
  },
  computed: {
    categoriesTransformed () {
      return this.categories.map(item => ({ name: item }))
    }
  },
  created () {
    const obj1 = {}
    for (const purpose of this.categories) {
      obj1[purpose] = null
    }
    this.preferences = JSON.parse(JSON.stringify(obj1))
  },
  methods: {
    select (item, row) {
      row.select(true)
      this.view.selected = item.name
      this.view.show = true
      this.checkUserChoiceCompleted()
    },
    checkUserChoiceCompleted () {
      if (Object.values(this.preferences).filter(x => x !== null).length === this.categories.length) {
        const choices = {}
        for (const purpose of this.categories) {
          choices[purpose] = this.radioList[Number(this.preferences[purpose])].key
        }
        Object.keys(choices).forEach((key) => {
          choices[key] = choices[key]
        })
        this.$emit('userChoinces', choices)
      }
    }
  }
}
</script>
