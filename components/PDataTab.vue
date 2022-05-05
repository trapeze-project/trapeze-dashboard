<template>
  <div>
    <v-data-table
      :headers="headers_data"
      :items="data"
      item-key="data"
      class="elevation-1"
      single-select
      @click:row="handleClick_data"
    >
      <template v-slot:item.issue="{ item }">
        <v-chip
          label
          :color="'transparent'"
          :text-color="item.issue === '0 issues' ? 'black' : 'red'"
        >
          {{ item.issue }}
        </v-chip>
      </template>
    </v-data-table>

    <div v-if="isHidden_data">
      <PDataHeader :category="category" />
      <PDataCategory
        :key="category"
        :categories="categories[category]"
        :show-data-card="showDataCard"
      />
      <PSensitivity :sensitivity="sensitivity[category]" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [
        {
          data: "Location",
          purpose: "None",
          recipient: "None",
          issue: "0 issues",
        },
        {
          data: "Bank Account",
          purpose: "Advertising, Marketing",
          recipient: "Company A",
          issue: "2 issues",
        },
        {
          data: "Credit Card Number",
          purpose: "Advertising, Marketing, Identity Verification",
          recipient: "Company A",
          issue: "2 issues",
        },
        {
          data: "Fingerprint",
          purpose: "Advertising",
          recipient: "Company A",
          issue: "1 issue",
        },
        {
          data: "Name",
          purpose: "Advertising, Marketing, Identity Verification, and 5 more",
          recipient: "Company A",
          issue: "0 issues",
        },
      ],
      headers_data: [
        {
          text: "Data",
          align: "start",
          value: "data",
        },
        { text: "Purposes", value: "purpose" },
        { text: "Recipient", value: "recipient" },
        { text: "Issues", value: "issue" },
      ],
      sensitivity: {
        Name: 30,
        Fingerprint: 10,
        Location: 0,
        "Credit Card Number": 50,
        "Bank Account": 20,
      },
      showDataCard: false,
      isHidden_data: false,

      category: "",
      categories: {
        Name: ["Advertising", "Marketing", "Identity Verification"],
        Fingerprint: ["Advertising"],
        Location: [],
        "Credit Card Number": [
          "Advertising",
          "Marketing",
          "Identity Verification",
        ],
        "Bank Account": ["Advertising", "Marketing"],
        "Service Optimization": [],
        Advertising: [
          "Name",
          "Fingerprint",
          "Bank account",
          "Credit Card Number",
        ],
        Marketing: ["Bank Account", "Credit Card Number"],
        "Identity Verification": ["Name"],
        Authentication: ["Name", "Fingerprint"],
      },
    };
  },
  methods: {
    handleClick_data(item, row) {
      this.isHidden_data = true;
      row.select(true);
      this.category = item.data;
      this.showDataCard = false;
    },
  },
};
</script>