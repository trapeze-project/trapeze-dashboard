<template>
  <div id="consent-assistant">
    <v-row>
      <v-col class="pa-0">
        <v-data-table
          :headers="headers"
          :items="categoriesTransformed"
          hide-default-footer
          single-select
          item-key="name"
          hide-default-header
          mobile-breakpoint="1"
        >
          <template v-slot:header="{ props }">
            <thead>
              <tr>
                <th
                  v-for="h, index in props.headers"
                  :key="index"
                >
                  {{ h.text }}
                </th>
              </tr>
            </thead>
          </template>

          <template v-slot:body="{ items }">
            <tbody>
              <tr
                v-for="item, index in items"
                :key="index"
              >
                <td>
                  <PHoverCard :term="$t(item.name)" :definition="$t(item.name.split('.')[1])" />
                </td>
                <td v-for="radio in radioList" :key="radio.key">
                  <v-radio-group v-model="preferences[item.name]">
                    <v-radio
                      :name="item.name"
                      :value="radio.value"
                      :color="radio.color"
                    />
                  </v-radio-group>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
      default () {
        return ""
      }
    },    
    categoryMap: {
      type: Object,
      required: true,
      default () {
        return {}
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
          color: 'black'
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
  watch: {
    preferences: {
      deep: true,
      handler: function(n, o) {
        this.checkUserChoiceCompleted();
      }
    }
  },
  computed: {
    categories() {
      return this.categoryMap[this.type];
    },
    categoriesTransformed () {
      return this.categories.map(item => ({ name: item }))
    }
  },
  created () {
    let stored = window.localStorage.getItem(this.type);
    if (stored) {
      this.preferences = JSON.parse(stored);
      this.checkUserChoiceCompleted();
    } else {
      const obj1 = {}
      for (const purpose of this.categories) {
        obj1[purpose] = null
      }
      this.preferences = JSON.parse(JSON.stringify(obj1))
    }
  },
  methods: {
    checkUserChoiceCompleted () {
      if (Object.values(this.preferences).filter(x => x !== null).length === this.categories.length) {
        let stored = JSON.parse(window.localStorage.getItem(this.type)) || {};
        window.localStorage.setItem(this.type, JSON.stringify(Object.assign(stored, this.preferences)));
        
        const choices = {}
        for (const purpose of this.categories) {
          choices[purpose] = this.radioList[Number(this.preferences[purpose])].key
        }
        Object.keys(choices).forEach((key) => {
          choices[key] = choices[key]
        })
        
        this.$emit('userChoices', choices, this.type)
      }
    }
  }
}
</script>

<style>
#consent-assistant .v-data-table > .v-data-table__wrapper > table {
  width: 100%;
  border-spacing: 0;
  table-layout: fixed;
}
</style>
