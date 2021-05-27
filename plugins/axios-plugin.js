export default function ({ $axios, $config: { baseURL } }, inject) {
  const axiosbase = $axios.create()
  axiosbase.defaults.baseURL = baseURL
  inject('axiosbase', axiosbase)
}
