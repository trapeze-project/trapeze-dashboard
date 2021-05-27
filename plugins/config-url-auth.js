export default ({ $axios, $config: { authApiUrl } }) => {
  $axios.defaults.baseURL = authApiUrl
}
