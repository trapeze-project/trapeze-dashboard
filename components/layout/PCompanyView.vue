<template>
  <v-card outlined color="transparent">
    <v-img src="/img/company.png" />
    <v-card-text>
      {{ $t("company.name") }}<br />
      {{ $t("company.add1") }}<br />
      {{ $t("company.add2") }}<br />
      {{ $t("company.website") }}<br />
      <br />
      {{ $t("company.position") }}<br />
      {{ $t("company.email") }}<br />
      {{ $t("company.pos-name") }}<br />
      <PContactFirm
        class="mt-3"
        :company-name="$t('company.name')"
        :btn-name="$t('company.contact')"
        :email="$t('company.email')"
      />
    </v-card-text>
  </v-card>
</template>
