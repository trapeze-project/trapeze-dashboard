<template>
  <v-card style="position: fixed">
    <v-img
      height="250"
      width="300"
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
      <PContactFirm class="mt-3" :companyName="$t('company.name')"  :btnName="$t('company.contact')" :email="$t('company.email')"/>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
}
</script>
