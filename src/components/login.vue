<template>
    <div class = "logIn container">
        <div class = "row">
            <div class="col-xs-12 col-sm-4 col-sm-offset-5">
                <div class = "panel panel-primary">
                    <div class="panel-heading">
                        <h1 class="panel-title">Log In</h1>
                    </div>
                    <div class = "panel-body">
                        <form @submit.prevent="submit">
                            <div class = "form-group has-feedback" v-bind:class="[usernameSuccessClass]">
                                <label for="Username" class="control-label sr-only">Please Enter your username.</label>
                                <input ref="txtUsername" type = "text" class="form-control" @input="checkUsername" id="username" placeholder="Username" v-model ="username" autofocus required>
                                <span v-bind:class="[usernameIconClass]"></span>
                            </div>
                            <div class="form-group has-feedback" v-bind:class="[passwordSuccessClass]">
                                <label for="password" class="control-label sr-only">Add your password.</label>
                                <input ref="txtPassword" type = "password" class="form-control" @input="checkPassword" id="password" placeholder="Password" v-model ="password" required pattern=".{2,20}" aria-describedby="HelpSession">
                                <span v-bind:class="[passwordIconClass]"></span>
                                <small id="HelpSession">Password length must be between 2 to 20</small>
                            </div>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" id="rememberMe" v-model="remember_Me">
                                    Remember Me
                                </label>
                            </div>
                            <button class="btn btn-primary pull-right">Log In</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//    import Authentication from '../../../backend/app/controllers/users.controller.js';
    export default {
        name : 'LogIn',
        data (){
            return {
                usernameSuccessClass:'',
                passwordSuccessClass:'',
                usernameIconClass:'',
                passwordIconClass:'',
                remember_Me: false,
                password:'',
                username:'',
            }
        },

        methods:{
            checkUsername:function () {
                if (this.$refs.txtUsername.checkValidity()) {
                    this.usernameSuccessClass = 'has-success';
                    this.usernameIconClass = 'glyphicon glyphicon-ok form-control-feedback'
                }else{
                    this.usernameSuccessClass = 'has-error';
                    this.usernameIconClass = 'glyphicon glyphicon-remove form-control-feedback'
                }
            },
            checkPassword:function () {
                if (this.$refs.txtPassword.checkValidity()) {
                    this.passwordSuccessClass = 'has-success';
                    this.passwordIconClass = 'glyphicon glyphicon-ok form-control-feedback'
                }else{
                    this.passwordSuccessClass = 'has-error';
                    this.passwordIconClass = 'glyphicon glyphicon-remove form-control-feedback'
                }
            },
            submit:function (e) {
                this.$http.post('http://csse-s365.canterbury.ac.nz:4974/api/v2/users/login?username=' + this.username + '&password=' + this.password)
                    .then(function (response) {
                        this.userid = response.data.id;
                        this.token = response.data.token;
                        this.$session.set("userId", this.userid);
                        this.$session.set("userSession", this.token);
                        this.$session.set("username",this.username);
//
//                        if(this.remember_Me){
//                            let date = new Date();
//                            date.setTime(date.getTime() + 7*24*60*60*1000);
//                            this.$cookies.set("username",this.username);
//                            this.$cookies.set("password",this.password);
//                            let cookie = 'username=' + this.username + ';expires=' + date.toUTCString();
//                            let cookie2 = 'password=' + this.password + ';expires=' + date.toUTCString();
//                            console.log('hello cookie' + cookie + cookie2);
////                    'key=value: expires = current dateTime in UTC: path=/'
//                        } else {
//                            this.$cookies.set("username","");
//                            this.$cookies.set("password","");
//                            document.cookie = 'username=; expires=Mon, 01, Jan 2000 00:00:00 UTC; path=/;';
//                            document.cookie = 'password=; expires=Mon, 01, Jan 2000 00:00:00 UTC; path=/;';
//                            console.log('bye cookie' + document.cookie);
//                        }
                    }).then(function (response) {
                    this.$router.push({path: '/users/' + this.userid , query:{alert: "User Successful Login"}})
                });

                e.preventDefault();
            }
        }
    }
</script>

<style scoped>
</style>