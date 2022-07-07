<template>
  <v-card shaped>
    <v-img max-height="300px" :src="filename" />

    <v-card-title>
      {{ title }}
    </v-card-title>

    <v-card-text>
      {{ content }}
    </v-card-text>

    <v-card-actions>
      <v-spacer />
      <v-btn v-bind="btnProps">
        {{ $t("home.explore-btn") }}
      </v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: 'Title'
    },
    content: {
      type: String,
      required: true,
      default: 'Content'
    },
    filename: {
      type: String,
      required: true
    },
    href: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      btnProps:""
    };
  },
  created(){
    this.btnProps = this.calculateButtonProps()

  },
  methods:{
    calculateButtonProps(){
      let obj ={}
      if(this.href.startsWith('http')){
        obj.href = this.href
      }else{
        obj.to = this.localePath(this.href)
      }
      obj.depressed = true;
      obj.class = "black--text"
      obj.color="primary"
      return obj
    }
  }
}
</script>
