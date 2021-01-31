const axios = require('axios')

const dataField = 'instanceData'

const id = 1

const cache = {}

module.exports = function (mappings) {
  return (jsonList, cb) => map(JSON.parse(JSON.stringify(jsonList)), mappings, cb)
}

function map (jsonList, mappings, cb) {
  if (cache[id] != null) {
    return cb(cache[id])
  } else {
    const groupedList = groupListByTypes(jsonList, mappings)
    mapItemData(groupedList).then((mappedGroupedList) => {
      const finalJson = { components: [] }
      for (const group of mappedGroupedList) {
        finalJson.components.push({ component: group.mapping.componentName, items: group.items })
      }
      cache[id] = finalJson
      cb(finalJson)
    })
  }
}

function groupListByTypes (jsonList, mappings) {
  const groupedList = []
  let defaultList = JSON.parse(JSON.stringify(jsonList))
  for (const mapping of mappings.mappings) {
    const mappedList = []
    for (const item of jsonList) {
      if (item[mapping.dataType.key] === mapping.dataType.value) {
        mappedList.push(item)
        defaultList = defaultList.filter(it => JSON.stringify(it) !== JSON.stringify(item))
      }
    }
    groupedList.push({ mapping, items: mappedList })
  }
  if (defaultList.length !== 0) {
    groupedList.push({ mapping: mappings.default, items: defaultList })
  }
  return groupedList
}

async function mapItemData (groupedList) {
  for (const group of groupedList) {
    for (let i = 0; i < group.items.length; i++) {
      const mappedItem = await mapItemToData(group.mapping, group.items[i])
      group.items[i] = mappedItem
    }
  }
  return groupedList
}

async function mapItemToData (mapping, item) {
  if (mapping.requirements === null || mapping.requirements === undefined) {
    return item
  }
  const mappedItem = {}
  for (const key in mapping.requirements) {
    if (item[dataField][key] !== null && item[dataField][key] !== undefined) {
      mappedItem[key] = item[dataField][key]
    } else if (item[dataField][key] == null && mapping.computed[key] !== null) {
      mappedItem[key] = await mapping.computed[key](item[dataField], axios, mapping.res)
    } else {
      return null
    }
  }
  return mappedItem
}
