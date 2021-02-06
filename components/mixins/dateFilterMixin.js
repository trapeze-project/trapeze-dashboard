export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    from: {
      type: Number,
      required: false
    },
    to: {
      type: Number,
      required: false
    }
  },
  methods: {
    filterItems (items, from, to) {
      return items.filter(item => item.timestamp >= from && item.timestamp <= to)
    }
  },
  computed: {
    clientFilteredItems () {
      if ((!this.from && !this.to) || (!this.from && this.to)) {
        return this.items
      } else if (this.from && !this.to) {
        return this.filterItems(this.items, this.from, Date.now())
      } else {
        return this.filterItems(this.items, this.from, this.to)
      }
    }
  }
}
