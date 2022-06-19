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
          <template v-slot:item="{ item, index }" >
            <tr @click="checkUserChoiceCompleted" >
              <td >
                {{ item.name }}
              </td>
              <td v-for="radio in radioList" :key="radio.key">
                <v-radio-group v-model="preferences[item.name]">
                  <v-radio
                    class="justify-center"
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
      default() {
        return [];
      },
    },
  },
  created(){
    let obj1 = new Object();
    for(let purpose of this.categories){
      obj1[purpose] = null
    }
    this.preferences = JSON.parse(JSON.stringify(obj1))
    
  },
  data() {
    return {
      preferences: {},
      view: {
        selected: "",
        show: false,
      },
      radioList: [
        {
          key:'Comfortable',
          value:0,
          color:"green"
        },
        {
          key:'No opinion',
          value:1,
          color:"red"
        },
        {
          key:'Not comfortable',
          value:2,
          color:"red"
        },
      ],
      headers: [
        {
          text: "Purpose",
          align: "start",
          value: "name",
          sortable: true,
        },
        {
          text: "Comfortable",
          align: "center",
          value: "fine",
          sortable: false,
        },
        {
          text: "No opinion",
          align: "center",
          value: "no",
          sortable: false,
        },
        {
          text: "Not comfortable",
          align: "center  ",
          value: "neutral",
          sortable: false,
        },
      ],
    };
  },
  computed: {
    categoriesTransformed() {
      return this.categories.map((item) => ({ name: item }));
    },
  },
  methods: {
    select(item, row) {
      row.select(true);
      this.view.selected = item.name;
      this.view.show = true;
      this.checkUserChoiceCompleted();
    },
    checkUserChoiceCompleted(){
      if(Object.values(this.preferences).filter(x => x !== null).length === this.categories.length){
        let choices = new Object()
        for (let purpose of this.categories) {
          choices[purpose]= this.headers[Number(this.preferences[purpose])+1].text
        }
        Object.keys(choices).forEach(key => {
          choices[key] = choices[key]
        });
        this.$emit("userChoinces", choices);
      }
    }
  }
};
</script>