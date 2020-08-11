<template>
    <div>
        <h1>Title</h1>
        <div>
            <h3>Displaying Variables/Methods</h3>
            {{dynamicText}}
            <br>
            {{numberVariable}}
            <br>
            {{boolVariable}}
            <br>
            {{objectVariable}}
            <br>
            {{returnFunction()}}
            <br>
        </div>
        <h3>v-if/v-show</h3>
        <button v-on:click="seeIfIMustDisplayIt = !seeIfIMustDisplayIt;"> We can Change the if </button>
        <div v-if="seeIfIMustDisplayIt" >
             <!-- <div v-if="notAVariable !== undefined">However</div> -->
            I am displayed if
        </div>
        <div v-else-if="seeIfIMustShowIt">
            I am not displayed but show is displayed
        </div>
        <div v-else>
            I am not displayed
        </div>

        <br>
        <button v-on:click="seeDirective('show')"> We can Change the show </button>
        <div v-show="seeIfIMustShowIt">
             <!-- <div v-if="notAVariable">However</div> -->
            I am displayed show
        </div>
        <h3>Alerts</h3>
        <!-- Here is the comment that you want to write -->
        <button v-on:click="changeAlert()"> Change Alert! </button>
        <button v-on:click="clickMeFunction()"> Click Me! </button> 
        <h3>v-model</h3>
        {{vModelVariable}}
        <br>
        <input 
            style="border: 1px solid red;"
            v-model="vModelVariable"
        >
        <button v-on:click="consoleLogFunction()">
            Display the input text;
        </button>

        <h3>v-bind - ing</h3>
        <a href="https://www.w3schools.com" target="_blank">
        Visit W3Schools.com!
        </a>
        <br>
        <!-- With full sequence for v-bind -->
        <a v-bind:href="dynamicLinkFunction()" target="_blank">
        Visit W3Schools.com! with function binding
        </a>
        <br>

        
        <!-- With short hand sequence for v-bind => : -->
        <h3>v-actions</h3>
        <a :href="dynamicLink" :target="targetValue">
            {{dynamicLink}}
        </a>
        <button  v-on:dblclick="printThatI()">
            Double Click
        </button>
        <!-- With full writing sequence for v-on -->
         <input 
            style="border: 1px solid red;"
            v-model="actionModel"
            v-on:input="printChange()"
            v-on:keyup.enter="printThatI()"
        >
        <!-- With short hand sequence for v-on => @ -->
        <input 
            style="border: 1px solid red;"
            v-model="actionModel"
            @input="printChange()"
            @keyup.enter="printThatI()"
        >

        <h3>Vuetify vs Vue</h3>
        <button>
            Basic Vue/HTML Button
        </button>
        <v-btn>
            Vuetify Button
        </v-btn>

    </div>
</template>

<script lang="ts">

import Vue from "vue";

export default Vue.extend({
	name: "Cmp",
	data() {
        //Here is the local variable storage
        //This is a single line comment

        /*
            This is 
            a multi
            line
            comment        
         */

        /**
         * Every line is 
         * indented
         * right
         */

        let objectVariable = {
                variable:"Value",
                text:2,
                bool:false
            };
        let displayText = JSON.stringify(objectVariable);
        let jsObject = JSON.parse(displayText);
        return {
            messageAlert:"This is a dynamic Alert message",
            dynamicText:"Dynamic text to display",
            numberVariable:2,
            boolVariable:false,
            objectVariable:{
                variable:"Value",
                text:2,
                bool:false
            },
            seeIfIMustDisplayIt:false,
            seeIfIMustShowIt:false,
            vModelVariable:"",
            dynamicLink:"https://www.w3schools.com",
            targetValue:"_blank",
            actionModel:""
		};
	},
	methods: {
        //Here is the function storage
		clickMeFunction() {
            alert(this.messageAlert);
        },
		changeAlert() {
            this.messageAlert = "Your first click me funciton";
        },
        returnFunction(){
            return {
                prop:"This is an object",
                value:12
            };
        },
        seeDirective(type:string) {
            if(type === "if")
                this.seeIfIMustDisplayIt = !this.seeIfIMustDisplayIt;
            else if(type === "show")
                this.seeIfIMustShowIt = !this.seeIfIMustShowIt;
        },
        consoleLogFunction() {
            console.log(this.vModelVariable); 
            console.log('Not a function');
        },
        dynamicLinkFunction() {
            return "https://www.w3schools.com";
        },
        changeActualLink() {
            if(this.dynamicLink === "https://www.w3schools.com") {
                this.dynamicLink = "https://www.google.com";
            } else if(this.dynamicLink === "https://www.google.com") {
               this.dynamicLink = "https://www.github.com";
            } else if(this.dynamicLink === "https://www.github.com") {
               this.dynamicLink = "https://www.w3schools.com";
            }
        },
        printThatI() {
            console.log("I double clicked");
        },
        printChange() {
            console.log("I changed something");
        }
	}
});

</script>
