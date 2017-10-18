<template>
    <div class = "logout container">
        <h1 class="page-header">Log Out</h1>
        <form v-on:submit = "logoutUser">
        <button class="btn btn-primary pull-right">Log Out</button>
        </form>
    </div>
</template>

<script>
    export default {
        name : 'logout',
        data (){
            return {

            }
        },
        methods: {
            logoutUser: function (e) {
                this.$http.post('http://csse-s365.canterbury.ac.nz:4974/api/v2/users/logout', "", {
                    headers: {
                        'X-Authorization': this.$session.get("userSession")
                    }}).then(function (response) {
                    this.$session.remove("userId");
                    this.$session.remove("userSession");
                    this.$router.push({path: '/'})
                });
                e.preventDefault();
            }
        }
    }
</script>

<style scoped>
</style>