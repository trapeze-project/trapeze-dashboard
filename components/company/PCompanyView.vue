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
            <div>
              <v-list-item-title v-text="item.key" />
            </div>
            <v-spacer />
            <div>
              <div v-if="item.adress">
                {{ item.adress }}
              </div>
              <a v-if="item.href" :href="item.href">
                {{ item.href }}
              </a>
            </div>
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
