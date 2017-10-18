<template>
    <div class = "adduser container">
        <div class="col-xs-12 col-sm-4 col-sm-offset-5">
        <Alert v-if="alert" v-bind:message = "alert" />
        <h1 class="page-header">Sign Up</h1>
        <form v-on:submit = "addUser">
            <div class = "well">
                <h4>User Information</h4>
                    <div class="form group has-feedback" v-bind:class="[addUsernameSuccessClass]">
                        <input ref="txtAddUsername" type = "text" class="form-control" @input="checkAddUsername" placeholder="Username" v-model="username">
                        <span v-bind:class="[addUsernameIconClass]"></span>
                    </div>

                    <br/>
                    <div class="form group has-feedback" v-bind:class="[emailSuccessClass]">
                        <input ref="txtEmail" type = "email" class="form-control" @input="checkEmail" placeholder="Email" v-model="email">
                        <span v-bind:class="[EmailIconClass]"></span>
                    </div>

                    <br />
                    <div class="form group has-feedback" v-bind:class="[addPasswordSuccessClass]">
                        <input ref="txtAddPassword" type = "password" class="form-control" @input="checkAddPassword" placeholder="Password" v-model="password">
                        <span v-bind:class="[addPasswordIconClass]"></span>
                    </div>

                    <br />
                    <div class="form group has-feedback" v-bind:class="[addLocationSuccessClass]">
                        <input ref="txtLocation" type = "text" class="form-control" @input="checkLocation" placeholder="Location" v-model="location">
                        <span v-bind:class="[addLocationIconClass]"></span>
                    </div>
            </div>
            <button type ="submit" class="btn btn-primary">Create Account</button>
        </form>
        </div>
    </div>
</template>

<script>
    import Alert from './alert.vue';
    export default {
        name : 'addUser',
        data (){
            return {
                user:{},
                addUsernameSuccessClass:'',
                addUsernameIconClass:'',
                emailSuccessClass:'',
                EmailIconClass:'',
                addPasswordSuccessClass:'',
                addPasswordIconClass:'',
                addLocationSuccessClass:'',
                addLocationIconClass:'',
                alert: '',
                username:'',
                email:'',
                password:'',
                location:''

            }
        },

        created(){
            if(this.$route.query.alert){
                this.alert = this.$route.query.alert;
            }
            this.addUser();
        },

        methods:{
            addUser(e){
                if(!this.username || !this.email || !this.password || !this.location){
                    console.log('Please fill in all required fields');
                } else {
                    let newUser = {
                        "username" : this.username,
                        "email" : this.email,
                        "password" : this.password,
                        "location" : this.location
                    }

                    this.$http.post('http://csse-s365.canterbury.ac.nz:4974/api/v2/users', newUser)
                        .then(function (response) {
                            this.$router.push({path: '/login', query:{alert: 'User Created'}})
                        });
                    e.preventDefault();
                }
                e.preventDefault();
            },
            checkAddUsername:function () {
                if (this.$refs.txtAddUsername.checkValidity()) {
                    this.addUsernameSuccessClass = 'has-success';
                    this.addUsernameIconClass = 'glyphicon glyphicon-ok form-control-feedback';
                }
                else{
                    this.addUsernameSuccessClass = 'has-error';
                    this.addUsernameIconClass = 'glyphicon glyphicon-remove form-control-feedback'
                }
            },
            checkEmail:function () {
                if (this.$refs.txtEmail.checkValidity()) {
                    this.emailSuccessClass = 'has-success';
                    this.EmailIconClass = 'glyphicon glyphicon-ok form-control-feedback';
                }
                else{
                    this.emailSuccessClass = 'has-error';
                    this.EmailIconClass = 'glyphicon glyphicon-remove form-control-feedback'
                }
            },
            checkAddPassword:function () {
                if (this.$refs.txtAddPassword.checkValidity()) {
                    this.addPasswordSuccessClass = 'has-success';
                    this.addPasswordIconClass = 'glyphicon glyphicon-ok form-control-feedback';
                }
                else{
                    this.addPasswordSuccessClass = 'has-error';
                    this.addPasswordIconClass = 'glyphicon glyphicon-remove form-control-feedback'
                }
            },
            checkLocation:function () {
                if (this.$refs.txtLocation.checkValidity()) {
                    this.addLocationSuccessClass = 'has-success';
                    this.addLocationIconClass = 'glyphicon glyphicon-ok form-control-feedback';
                }
                else{
                    this.addLocationSuccessClass = 'has-error';
                    this.addLocationIconClass = 'glyphicon glyphicon-remove form-control-feedback'
                }
            }
        },

        components: {
            Alert
        }

    }
</script>

<style scoped>
</style>