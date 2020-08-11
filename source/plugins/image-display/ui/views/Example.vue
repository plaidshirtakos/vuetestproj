<template>
    <div>
       {{fullName}}
	   <br>
	   <h1>Please enter your first name</h1>
	   <input style="border: 1px solid red;" v-model="firstName">
	   <br>
	   <h1>Please enter your last name</h1>
	   <input style="border: 1px solid red;" v-model="lastName">   
	   <PropExample 
	   	:title="example"
		:subtitle="properties"
		:message="message"
	   >
		</PropExample>    
		<v-btn @click="example='NOT AN EXAMPLE'">Click Me 1</v-btn>
		<v-btn @click="properties='NOT A SUBTITLE'">Click Me 2</v-btn> 
		<v-btn @click="message='NOT A MESSAGE'">Click Me 3</v-btn>  
	</div>
</template>

<script lang="ts">

import Vue from "vue";
import PropExample from "./PropExample.vue";

export default Vue.extend({
	name: "Example",
	components:{
		PropExample
	},
	data() {
        return {
			firstName:"Marius",
			lastName:"Aluculesei",
			counter:0,
			example:"Example title",
			properties:"Properties subtitle",
			message:"Message here I am "
			
		};
	},
	watch: {
		firstName: {
			immediate:true,
			handler(newFirstName, oldFirstName) {
				console.log(newFirstName,oldFirstName);
				// if(this.firstName.includes("-"))
				// 	this.firstName = this.firstName.split("-")[0];
				// this.fullName = this.firstName + " " + this.lastName;
			}
		},
		lastName: {
			immediate:true,
			handler(newLastName, oldLastName) {
				console.log(newLastName,oldLastName);
				// this.lastName = this.lastName[0] + ".";
				// this.fullName = this.firstName + " " + this.lastName;
			}
		},
	},
	computed: {
		fullName():string {
			return this.firstName + " " + this.lastName;
		}
	},
	props:[],
	methods: {
	}
});

</script>
