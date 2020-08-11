<template>
    <div>
		This is the title: {{title}}
		<br>
		This is the subtitle: {{subtitle}}
		<br>
		This is the message: {{message}}
		<br>
		<v-btn @click="title = 'I CHANGED FROM THE INSIDE'">CHANGE</v-btn>   
	</div>
</template>

<script lang="ts">

import Vue from "vue";

export default Vue.extend({
	name: "PropExample",
	data() {
        return {

		};
	},
	props:['title','subtitle','message'],

	methods: {
		
	}
});

</script>
