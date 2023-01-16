String.prototype.interpolate = function (params) {
  const names = Object.keys(params)
  const values = Object.values(params)
  return new Function(...names, `return \`${this}\`;`)(...values)
}

// import Vue from 'vue'

// import AlexITController from '~/static/data/AlexITController.json'
// import CloverITController from '~/static/data/CloverITController.json'
// export default function ({ route } ,inject) {
//   let organizationName = route.params.organization
//   if(organizationName === 'CloverIT'){
//     inject('GlobalVariables', Vue.observable({ dataController: CloverITController }))
//   }else if(organizationName === 'AlexIT'){
//     inject('GlobalVariables', Vue.observable({ dataController: AlexITController }))
//   }else{
//     inject('GlobalVariables', Vue.observable({ dataController: {lol:'lol'} }))

//   }

// }

