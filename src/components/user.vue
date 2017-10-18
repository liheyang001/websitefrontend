<template>
    <div class = "userDetails container">
        <!--<Alert v-if='alert' v-bind:message = "alert" />-->
        <h1 class="page-header">User information</h1>
        <button class="pull-right"><router-link v-bind:to= "'/editUser/' + user.id">Update My Details</router-link></button>
        <h3><li class = "list-group item">UserId : {{user.id}}</li></h3>
        <h3><li class = "list-group item">UserName : {{user.username}}</li></h3>
        <h3><li class = "list-group item">Email Address : {{user.email}}</li></h3>
        <h3><li class = "list-group item">Location : {{user.location}}</li></h3>
        <h1 class="page-header">My Projects</h1>
        <button class="pull-right"><router-link to="/addProject">Create Project</router-link></button>
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>Project Id</th>
                    <th>Project Title</th>
                    <th>View Project</th>
                </tr>
                </thead>
                <tbody>
                <!--<th>{{this.projects}}</th>-->
                    <tr v-for = "project in projects">
                        <th>{{project.id}}</th>
                        <th>{{project.title}}</th>
                        <th><router-link class = "btn btn-default" v-bind:to="'/project/' + project.id">View Details</router-link></th>
                    </tr>

                </tbody>
            </table>




    </div>
</template>

<script>
//    import Alert from './alert.vue';
    export default {
        name : 'userDetails',
        data (){
           return {
                user:{},
               projects:[]
//                Alert: ''
           }
        },
        mounted: function()
            {
              this.fetchUsers();
              this.userProject();
            },
        methods:{
            fetchUsers(){
                this.$http.get('http://csse-s365.canterbury.ac.nz:4974/api/v2/users/' + this.$session.get("userId"), {
                    headers:{
                        'X-Authorization': this.$session.get("userSession")
                    }}).then(function (response) {
                    this.user = (response.body);
                });
            },
            userProject: function(){
                this.$http.get('http://csse-s365.canterbury.ac.nz:4974/api/v2/projects?creator='+ this.$session.get("userId"), {
                    headers:{
                        'X-Authorization': this.$session.get("userSession")
                    }}).then(function (response) {
                        this.projects = response.body;
                    });
            },
        },
        created:function () {
//            if(this.$route.query.alert){
//                this.alert = this.$route.query.alert;
//            }
            this.fetchUsers(this.$route.params.id);
        },
        updated:function () {

        },
        components: {
//            Alert
        }
    }
</script>

<style scoped>
    </style>