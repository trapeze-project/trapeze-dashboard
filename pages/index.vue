<template>
  <div id="index">
    {{ $auth.loggedIn }}
    <h1 class="title">
      {{ $t('home.title') }}
    </h1>
    <v-divider />
    <br>
    <v-row justify="center" align="center">
      <v-col
        v-for="(item, idx) in Object.values($t('home.items'))"
        :key="idx"
        cols="12"
        sm="9"
        md="9"
        lg="9"
      >
        <PExplainCard :title="item.title" :content="item.content" :filename="item.filename" href="/profile">
          <div>
            {{ item.list.listHeader }}
            <ul>
              <li v-for="(entry,ind) in Object.values(item.list.items)" :key="ind">
                {{ entry }}
              </li>
            </ul>
          </div>
        </PExplainCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
}
</script>
