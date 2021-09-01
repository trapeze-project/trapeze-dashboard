<template>
  <PExpandableContainer
    :title="$i18n.t('profile.title')"
    :subtitle="$i18n.t('profile.subtitle')"
    icon="account_circle"
  >
    <div style="padding: 15px">
      <v-list>
        <v-list-item>
          <v-subheader><b>{{ $t('profile.username') }}:</b></v-subheader>
          <v-spacer />
          <div>
            {{ items.user.username }}
          </div>
        </v-list-item>
        <v-list-item>
          <v-subheader><b>{{ $t('profile.password') }}:</b></v-subheader>
          <v-spacer />
          <div>***</div>
        </v-list-item>
        <v-divider inset />
      </v-list>
    </div>
  </PExpandableContainer>
</template>
<script>
export default {
  props: {
    items: {
      type: Object,
      required: true
    }
  }
}
</script>
