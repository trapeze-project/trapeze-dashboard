<template>
  <PExpandableContainer :title="title">
    <div style="padding: 20px 0px;">
      <div style="text-align: center; padding: 10px 10px;">
        <v-img max-height="400px" eager contain :src="imgUrl" />
      </div>
      <br>
      <div style="padding: 10px 10px;">
        {{ description }}
      </div>
      <v-list>
        <div v-for="(item,i) in info" :key="i">
          <v-divider />
          <v-list-item>
            <v-row>
              <v-col cols="12" md="6">
                <v-list-item-title v-text="item.key" />
              </v-col>
              <v-col>
                <address v-if="item.adress">
                  <div v-for="adressPiece in item.adress.split(',')" :key="adressPiece">
                    {{ adressPiece }}
                  </div>
                </address>
                <a v-else-if="item.href" :href="item.href">
                  {{ item.href }}
                </a>
                <div v-else>
                  -------
                </div>
              </v-col>
            </v-row>
          </v-list-item>
        </div>
      </v-list>
    </div>
  </PExpandableContainer>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    imgUrl: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    info: {
      type: Array,
      required: true
    }
  }
}
</script>
