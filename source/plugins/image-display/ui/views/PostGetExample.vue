<template>
    <div>
        <!-- To access this page go to http://<<ip>>:6969/getpostexample -->
        <h3>Post Example</h3>
        <br>
        <v-btn @click="postRoute()">Call Post Route</v-btn> 
        <br>
        {{postData}}
        <br>
        
        <h3>Get Example</h3>
        <br>
        <v-btn @click="getRoute()">Call Get Route</v-btn> 
        <br>
        {{getData}}


        <h3> Data being loaded </h3>
        {{ exampleData }}
	</div>
</template>

<script lang="ts">

import Vue from "vue";

export default Vue.extend({
	name: "PostGetExample",
	data() {
        return {
			postData:"",
            getData:"",
            exampleData:null
		};
    },
    async mounted() {
        await this.getExample();
    },
	methods: {
        async postRoute() {
            try {
                let dataToSend = {
                    var1:"something",
                    var2:"Something Else"
                }
                //When you want to call an express route post, use the following syntax:
                /**
                 * this.ui.application.api.post("/api/v1 + <<the name of the route you created in express>>");
                 * In our case, the name of the route is /post/data so we need to append /post/data to /api/v1;
                 * That results in /api/v1/post/data
                 * 
                 * Also if you want to send data through the post route, you gotta offer another parameter to the 
                 *   this.ui.application.api.post() function, in our case the "dataToSend" object which will contain 
                 *   the values you need to work with in the backend
                 */



                let response = await this.ui.application.api.post("/api/v1/post/data", dataToSend);
                //If the response exists
                if(response) {
                    console.log()
                    //Assing the response data to the this.postData object
                    this.postData = response.data;

                }
            } catch (error) {
                //If error log it
                console.error(error);
            }
        },
        async getRoute() {
            try {
                let dataToSend = {
                    var1:"something",
                    var2:"Something Else"
                }
                //When you want to call an express get route, use the following syntax:
                /**
                 * this.ui.application.api.get("/api/v1 + <<the name of the route you created in express>>");
                 * In our case, the name of the route is /get/data so we need to append /get/data to /api/v1;
                 * That results in /api/v1/get/data
                 * 
                 * Also if you want to send data through the get route, you gotta append the parameters to the route, as we've seen in the cours
                 *   this.ui.application.api.get("/api/v1/get/data/:param1/:param2")
                 * In our case:  this.ui.application.api.get("/api/v1/get/data/ + parameter1 + "/" + parameter2)
                 */
                let parameter1="something";
                let parameter2="something else"
                let response = await this.ui.application.api.get("/api/v1/get/data");
                //If the response exists
                if(response) {
                    //Assing the response data to the this.postData object
                    this.getData = response.data;

                }
            } catch (error) {
                //If error log it
                console.error(error);
            }
        },
        
        async getExample() {
            try {
                let parameter1 = "This is the parameter ";
                let response = await this.ui.application.api.get("/api/v1/example/" + parameter1 + "/" + 2);

                if(response) {
                    let data = response.data;
                    this.exampleData = data.response;
                    console.log(data);
                } else {
                    console.log("We did not receive a response");
                }
            } catch (error) {
                //If error log it
                console.error(error);
            }
        },
	}
});

</script>
