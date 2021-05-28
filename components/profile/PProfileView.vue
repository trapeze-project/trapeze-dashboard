<template>
  <PExpandableContainer title="Account credentials" subtitle="Your username (in this case: email address) and password." icon="account_circle">
    <div style="padding: 15px">
      <v-list>
        <v-list-item>
          <v-subheader><b>USERNAME:</b></v-subheader>
          <v-spacer />
          <div>
            {{ $auth.user.username }}
          </div>
        </v-list-item>
        <v-divider inset />
      </v-list>
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
