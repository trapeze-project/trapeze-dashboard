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
            <tr>
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
    <v-row v-show="view.show">
      <v-col>
        <PConsentHelperDataCard :category-name="view.selected" />
      </v-col>
    </v-row>
    <div>{{preferences}}</div>
    <div>{{categories}}</div>
    <div>{{completedUserChoice}}</div>
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
    completedUserChoice(){
      if(this.preferences.length === this.categories.length){
        let choices = []
        for (let i =0 ; i < this.categories.length ; i++) {
          if(this.preferences[i] === null ){
            continue;
          }
          const lol = new Object();
          lol[this.categories[i]]= this.headers[Number(this.preferences[i])+1].text
          choices.push(lol);
        }
        return choices
      }else{
        return []
      }
    }
  },
  methods: {
    select(item, row) {
      row.select(true);
      this.view.selected = item.name;
      this.view.show = true;
    },
  },
};
</script>