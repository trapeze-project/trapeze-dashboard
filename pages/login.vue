<template>
  <div>
    <v-card class="mx-6">
      <v-card-title><h2>TRAPEZE - Login</h2></v-card-title>

      <div class="mx-4">
        <p>TRAPEZE ID (?)</p>
        <v-text-field v-model="id" placeholder="" outlined dense style="max-width:450px"/>
        <p>Password</p>
        <v-text-field v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :type="show ? 'text' : 'password'"  @click:append="show = !show" placeholder="" outlined dense style="max-width:450px"/>
      </div>
			<v-card-actions>
				<v-btn @click="logIn">
					log in
				</v-btn>
			</v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  layout: "appBarOnly",
  data() {
    return {
      id: "Erika_Musterman",
      password: "123",
			show:false
    };
  },
	methods:{
		logIn(){
			this.$store.commit('setIsAuthenticated',true)
			console.log('asdasdasdad')
			this.$router.push({path: this.localePath('service-selection')})
		}
	}

};
</script>
