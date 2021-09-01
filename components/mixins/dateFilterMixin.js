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
  data: () => ({
    deleteDialog: false,
    selectedForDel: null
  }),
  methods: {
    filterItems (items, from, to) {
      return items.filter(item => item.timestamp >= from && item.timestamp <= to)
    },
    openDeleteDialog (item) {
      this.selectedForDel = item
      this.deleteDialog = true
    },
    // temporary solution
    deleteItem () {
      const index = this.items.indexOf(this.selectedForDel)
      if (index > -1) {
        this.items.splice(index, 1)
      }
      this.abortDeletion()
    },
    abortDeletion () {
      this.selectedForDel = null
      this.deleteDialog = false
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
