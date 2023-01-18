String.prototype.interpolate = function (params) {
  const names = Object.keys(params)
  const values = Object.values(params)
  return new Function(...names, `return \`${this}\`;`)(...values)
}