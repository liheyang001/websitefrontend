<template>
    <div class = "adduser container">
        <div class="col-xs-12 col-sm-4 col-sm-offset-5">
            <Alert v-if="alert" v-bind:message = "alert" />
            <h1 class="page-header">Update My Details</h1>
            <form v-on:submit = "updateUser(id)">
                <div class = "well">
                    <h4>User Information</h4>
                    <div class="form group has-feedback" v-bind:class="[updateUsernameSuccessClass]">
                        <input ref="txtupdateUsername" type = "text" class="form-control" @input="checkupdateUsername" placeholder="New Username" v-model="updateUsername">
                        <span v-bind:class="[updateUsernameIconClass]"></span>
                    </div>

                    <br/>
                    <div class="form group has-feedback" v-bind:class="[updateEmailSuccessClass]">
                        <input ref="txtupdateEmail" type = "email" class="form-control" @input="checkupdateEmail" placeholder="New User Email" v-model="updateEmail">
                        <span v-bind:class="[updateEmailIconClass]"></span>
                    </div>

                    <br />
                    <div class="form group has-feedback" v-bind:class="[updatePasswordSuccessClass]">
                        <input ref="txtupdatePassword" type = "password" class="form-control" @input="checkupdatePassword" placeholder="New Password" v-model="updatePassword">
                        <span v-bind:class="[addPasswordIconClass]"></span>
                    </div>

                    <br />
                    <div class="form group has-feedback" v-bind:class="[updateLocationSuccessClass]">
                        <input ref="txtupdateLocation" type = "text" class="form-control" @input="checkupdateLocation" placeholder="New User Location" v-model="updateLocation">
                        <span v-bind:class="[addLocationIconClass]"></span>
                    </div>
                </div>
                <button type ="submit" class="btn btn-primary">Update</button>
            </form>
        </div>
    </div>
</template>

<script>
    import Alert from './alert.vue';
    export default {
        name : 'updateUser',
        data (){
            return {
                user:{},
                updateUsernameSuccessClass:'',
                updateUsernameIconClass:'',
                updateEmailSuccessClass:'',
                updateEmailIconClass:'',
                updatePasswordSuccessClass:'',
                updatePasswordIconClass:'',
                updateLocationSuccessClass:'',
                updateLocationIconClass:'',
                alert: '',
                updateLocation:'',
                addPasswordIconClass:'',
                updatePassword:'',
                addLocationIconClass:'',
                updateEmail:'',
                updateUsername:''
            }
        },

        created:function (){
            if(this.$route.query.alert){
                this.alert = this.$route.query.alert;
            }
            this.fetchUser(this.$route.params.id);
        },

        methods:{
            fetchUser(){
                    this.$http.get('http://csse-s365.canterbury.ac.nz:4974/api/v2/users/' + this.$session.get("userId"), {
                        headers:{
                            'X-Authorization': this.$session.get("userSession")
                        }}).then(function (response) {
                        this.user = (response.body);
                    });
            },
            updateUser(e){

                if(!this.updateUsername || !this.updateEmail || !this.updatePassword || !this.updateLocation){
                    console.log('Please fill in all required fields');
                } else {
                    let update = {
                        "username": this.updateUsername,
                        "email": this.updateEmail,
                        "password": this.updatePassword,
                        "location": this.updateLocation
                    }
                    this.$http.put('http://csse-s365.canterbury.ac.nz:4974/api/v2/users/' + this.$session.get("userId"), update, {
                        headers:{
                            'X-Authorization': this.$session.get("userSession")
                        }}).then(function (response) {
                            console.log("route");
                            this.$router.push('/project');
                        });
//                    this.$router.push('/');
                    e.preventDefault();
                }
                e.preventDefault();
            },
            checkupdateUsername:function () {
                if (this.$refs.txtupdateUsername.checkValidity()) {
                    this.updateUsernameSuccessClass = 'has-success';
                    this.updateUsernameIconClass = 'glyphicon glyphicon-ok form-control-feedback';
                }
                else{
                    this.updateUsernameSuccessClass = 'has-error';
                    this.updateUsernameIconClass = 'glyphicon glyphicon-remove form-control-feedback'
                }
            },

            checkupdateEmail:function () {
                if (this.$refs.txtupdateEmail.checkValidity()) {
                    this.updateEmailSuccessClass = 'has-success';
                    this.updateEmailIconClass = 'glyphicon glyphicon-ok form-control-feedback';
                }
                else{
                    this.updateEmailSuccessClass = 'has-error';
                    this.updateEmailIconClass = 'glyphicon glyphicon-remove form-control-feedback'
                }
            },
            checkupdatePassword:function () {
                if (this.$refs.txtupdatePassword.checkValidity()) {
                    this.updatePasswordSuccessClass = 'has-success';
                    this.updatePasswordIconClass = 'glyphicon glyphicon-ok form-control-feedback';
                }
                else{
                    this.updatePasswordSuccessClass = 'has-error';
                    this.updatePasswordIconClass = 'glyphicon glyphicon-remove form-control-feedback'
                }
            },
            checkupdateLocation:function () {
                if (this.$refs.txtupdateLocation.checkValidity()) {
                    this.updateLocationSuccessClass = 'has-success';
                    this.updateLocationIconClass = 'glyphicon glyphicon-ok form-control-feedback';
                }
                else{
                    this.updateLocationSuccessClass = 'has-error';
                    this.updateLocationIconClass = 'glyphicon glyphicon-remove form-control-feedback'
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