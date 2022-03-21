<template>
  <v-card>
    <v-img
      height="250"
      src="/company.png"
    />
    <v-card-text>
      {{ $t('company.name') }}<br>
      {{ $t('company.add1') }}<br>
      {{ $t('company.add2') }}<br>
      {{ $t('company.website') }}<br> <br>
      {{ $t('company.position') }}<br>
      {{ $t('company.email') }}<br>
      {{ $t('company.pos-name') }}<br>
      <v-btn color="primary">
        {{ $t('company.contact') }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
</script>
