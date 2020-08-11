<template>
    <v-app>
		<v-navigation-drawer app>
			<!-- -->
		</v-navigation-drawer>

		<v-app-bar app>
			<!-- -->
		</v-app-bar>

		<!-- Sizes your content based upon application components -->
		<v-main>

			<!-- Provides the application the proper gutter -->
			<v-container fluid>
				<div heigh="100px">
					<v-img contain src="someimagehigherthan 100px" alt=""></v-img>
					 <v-btn @click="myFunction()" text small>Normal</v-btn>
				</div>
			<!-- If using vue-router -->
				<router-view></router-view>
			</v-container>
		</v-main>

		<v-footer app>
			<!-- -->
		</v-footer>
	</v-app>
</template>

<script lang="ts">

import Vue from "vue";

export default Vue.extend({
	name: "Cmp1",
	data() {
        return {

		};
	},
	methods: {
       myFunction() {
		   ///Does some things
	   }
	}
});

</script>
