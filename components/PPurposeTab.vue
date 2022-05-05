<template>
  <div>
    <v-data-table
      :headers="headers_purpose"
      :items="purpose"
      item-key="purpose"
      class="elevation-1"
      single-select
      @click:row="handleClick_purpose"
    >
      <template v-slot:item.issue="{ item }">
        <v-chip
          label
          :color="item.issue === '0 issues' ? 'transparent' : 'orange'"
        >
          {{ item.issue }}
        </v-chip>
      </template>
    </v-data-table>
    <div v-show="isHidden_purpose" class="mt-4">
      <PDataHeader :category="category" />
      <v-row>
        <v-col>
          <PDataCategoryPurpose
            :show-data-card="showDataCard"
            :categories="categories[category]"
          />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      purpose: [
        {
          data: "None",
          purpose: "Service Optimization",
          issue: "0 issues",
        },
        {
          data: "Name, Fingerprint, Bank account, Credit Card Number",
          purpose: "Advertising",
          issue: "2 issues",
        },
        {
          data: "Bank Account, Credit Card Number",
          purpose: "Marketing",
          issue: "2 issues",
        },
        {
          data: "Name",
          purpose: "Identity Verification",
          issue: "1 issue",
        },
        {
          data: "Name, Fingerprint",
          purpose: "Authentication",
          issue: "0 issues",
        },
      ],
      headers_purpose: [
        {
          text: "Purposes",
          align: "start",
          value: "purpose",
        },
        { text: "Data", value: "data" },
        { text: "Issues", value: "issue" },
      ],
      isHidden_purpose: false,
      showDataCard: false,
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
    handleClick_purpose(item, row) {
      this.isHidden_purpose = true;
      row.select(true);
      this.category = item.purpose;
      this.showDataCard = false;
    },
  },
};
</script>