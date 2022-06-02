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
          <template v-slot:item="{ item, index }">
            <tr @click="checkUserChoiceCompleted">
              <td>
                {{ item.name }}
              </td>
              <td>
                <v-radio-group v-model="preferences[index]">
                  <v-radio
                    class="justify-center"
                    :name="item.name"
                    value="0"
                    color="green"
                  />
                </v-radio-group>
              </td>
              <td>
                <v-radio-group v-model="preferences[index]">
                  <v-radio
                    class="justify-center"
                    :name="item.name"
                    value="1"
                    color="darkgrey"
                  />
                </v-radio-group>
              </td>
              <td>
                <v-radio-group v-model="preferences[index]">
                  <v-radio
                    class="justify-center"
                    :name="item.name"
                    value="2"
                    color="red"
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
    <div>{{preferences}}</div>
    <div>{{categories}}</div>
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
  data() {
    return {
      preferences: [],
      view: {
        selected: "",
        show: false,
      },
      headers: [
        {
          text: "Purpose",
          align: "start",
          value: "name",
        },
        {
          text: "Comfortable",
          align: "center",
          value: "fine",
        },
        {
          text: "No opinion",
          align: "center",
          value: "no",
        },
        {
          text: "Not comfortable",
          align: "center  ",
          value: "neutral",
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
      if(this.preferences.filter(x => x !== null).length === this.categories.length){
        let choices = new Object()
        for (let i =0 ; i < this.categories.length ; i++) {
          choices[this.categories[i]]= this.headers[Number(this.preferences[i])+1].text
        }
        console.log(choices)
        this.$emit("userChoinces", choices);
      }
    }
  }
};
</script>