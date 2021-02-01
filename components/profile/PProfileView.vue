<template>
  <PExpandableContainer title="Account credentials" subtitle="Your username (in this case: email address) and password." icon="account_circle">
    <div style="padding: 15px">
      <v-list>
        <div v-for="(item, index) in items" :key="index">
          <v-list-item>
            <v-subheader><b>{{ item.title.toUpperCase() }}:</b></v-subheader>
            <v-spacer />
            <div>
              {{ item.description }}
            </div>
          </v-list-item>
          <v-divider inset />
        </div>
      </v-list>
    </div>
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
