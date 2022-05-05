<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers_email"
      :items="emails"
      item-key="date"
      class="elevation-1"
      single-select
      @click:row="handleClick_email"
    />

    <div v-show="isHidden_email" id="PEmail" class="mt-4">
      <PEmail :date="date" :event="event" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTabs: [],
      date: '',
      event: '',
      isHidden_email: false,
      headers_email: [
        {
          text: 'Date',
          align: 'start',
          value: 'date'
        },
        { text: 'Event', value: 'event' },
        { text: 'Policy', value: 'policy' }
      ],

      emails: [
        {
          date: '5 Feb 2022 14:00 CEST',
          event: 'Consent Request - Policy Update',
          policy: 'clover-pol.v2.pdf  (inactive)'
        },
        {
          date: '1 Feb 2022 16:38 CEST',
          event: 'Consent Revocation',
          policy: 'clover-pol.v1.pdf (active)'
        },
        {
          date: '3 Jan 2022 14:05 CEST',
          event: 'Consent Giving',
          policy: 'clover-pol.v1.pdf  (active)'
        },
        {
          date: '3 Jan 2022 14:00 CEST',
          event: 'Consent Request - Account Creation',
          policy: 'clover-pol.v1.pdf  (active)'
        }
      ],            
    };
  },
  computed: {
    selected: {
      get() {
        return this.selectedTabs;
      },
      set(value) {
        this.$emit('selected', value);
      }
    }
  },
  methods: {
    handleClick_email (item, row) {
      this.isHidden_email = true
      row.select(true)
      this.date = item.date;
      this.event = item.event;
    },
  }
};
</script>