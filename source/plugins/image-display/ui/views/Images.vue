<template>
	<v-app>
		<v-content  fluid app>
			<v-container pr-2 pl-2 pt-4>
				I AM THE IMAGES PAGE
				<button @click="dataVar='Button to change the var'">click Me!</button>
				<v-btn @click="changePage('cmp')">Cmp</v-btn>
				<v-btn @click="changePage('cmp1')">Cmp1</v-btn>
				<router-view></router-view>
			</v-container>
		</v-content>
	</v-app>
</template>

<script lang="ts">

import Vue from "vue";
export default Vue.extend({
	name: "Images",
	beforeCreate() {
		console.log("This is the before Create event");
		console.log(this);
	},
	created() {
		console.log("This is the created event");
		this.dataVar = "Changed"
		console.log(this);
	},
	
	beforeMount() {
		console.log("This is the before mount event");
	},
	mounted() {
		console.log("This is the mounted event");
	},
	
	beforeUpdate() {
		console.log("This is the before update event");
		console.log(this.dataVar);
	},
	updated() {
		console.log("This is the updated event");
		console.log(this.dataVar);
	},
	
	beforeDestroy() {
		console.log("This is the before destroy event");
	},
	destroyed() {
		console.log("This is the destroyed event");
	},
	data() {
		return {
			dataVar:""
		};
	},
	methods: {
		changePage(page:string) {
			if(page === "cmp") {
				this.$router.push("/workspace/images/cmp");
			} else {
				this.$router.push("/workspace/images/cmp1");
			}
		}
	}
});
</script>
