export default ({ $axios, $config: { baseURL } }, inject) => {
  const axiosbase = $axios.create({
    baseURL
  })
  inject('axiosbase', axiosbase)
}
