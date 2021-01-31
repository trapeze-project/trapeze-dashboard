<template>
  <PExpandableContainer title="Account credentials" subtitle="Your username (in this case: email address) and password." icon="account_circle">
    <v-list>
      <div v-for="(item, index) in items" :key="index">
        <v-list-item>
          <v-list-item-title>
            {{ item.title }}:
          </v-list-item-title>
          <div>
            {{ item.description }}
          </div>
        </v-list-item>
        <v-divider />
      </div>
    </v-list>
  </PExpandableContainer>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    }
  }
}
</script>
