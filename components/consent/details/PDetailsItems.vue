<template>
  <div>
    <p class="font-weight-black ml-4">
      {{ $t("general.category") }}
    </p>
    <p />
    <v-row>
      <v-col cols="4">
        <v-card class="ml-2">
          <v-data-table
            :headers="headers"
            :items="categoriesTransformed"
            hide-default-header
            hide-default-footer
            single-select
            item-key="name"
            @click:row="handleClick_dataCat"
          >
            <template #item.name="{ item }">
              <v-row align="center" justify="center">
                <v-col class="fill-height" cols="8">
                  {{ item.name }}
                </v-col>
                <v-col cols="4">
                  <v-switch v-model="localSwitchValues[item.name]" @click="changeSwitchValues()"/>
                </v-col>
              </v-row>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col v-show="showDataCard">
        <PDetailsCard :category-name="categoryName" />
      </v-col>
    </v-row>
    <p />
    <div>localSwitchValues : {{this.localSwitchValues}}</div>
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
    switchvalues:{
      type: Object,
      required: false,
      default() {
        return [];
      },
    },
    purpose:{
      type: String,
      required: true,
    }
  },
  data() {
    return {
      showDataCard: false,
      categoryName: "",
      headers: [
        {
          text: "Name",
          value: "name",
        },
      ],
      localSwitchValues:this.switchvalues
    };
  },
  computed: {
    categoriesTransformed() {
      return this.categories.map((item) => ({ name: item }));
    },
  },
  methods: {
    handleClick_dataCat(item, row) {
      this.showDataCard = true;
      row.select(true);
      this.categoryName = item.name;
    },
    changeSwitchValues(){
      let obj ={}
      obj[this.purpose]=this.localSwitchValues
      this.$emit('changeSwitchValues',obj)
    }
  },
};
</script>

<style scoped>
tr.v-data-table__selected {
  background: #000000 !important;
}
</style>
