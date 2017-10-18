<template>
    <div class = "projects container">
        <h1 class="page-header" >Projects information</h1>
        <div class="input-group">
            <label for="mobile-site-search" class="sr-only">Search this site</label>
            <input name="query" type="search" id="mobile-site-search" class="form-control" placeholder="Search" v-model="filterInput">
            <span class="input-group-btn">
                <button type="submit" class="btn btn-white">
                    <span class="glyphicon glyphicon-search"></span>
                </button>
            </span>
        </div>
        <br/>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Subtitle</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
            <tr v-for = "project in filterBy(projects, filterInput)" v-if="project.open == true">

                <td>{{project.id}}</td>
                <td>{{project.title}}</td>
                <td>{{project.subtitle}}</td>
                <figure class="col-md-12 col-sm-6 col-xs-4 col-xxs-12">
                    <a v-bind:href="'/project/' + project.id" class="hover-link" style="height: 560px;">
                        <div class="">
                            <img v-bind:src = "'http://csse-s365.canterbury.ac.nz:4974/api/v2/' + project.imageUri"  style="width:300px; height: 200px" class="img-responsive">
                        </div>
                    </a>
                    <br/>
                </figure>



                <td><router-link class = "btn btn-default" v-bind:to="'/project/' + project.id">View Details</router-link></td>

            </tr>
            </tbody>
        </table>
        <!--<div>{{projects.length}}</div>-->
            <span class="pull-right"><button class="btn btn-primary" type="button" @click="goNext()"  style="margin-left: 10px">Next Page</button></span>

            <span class="pull-right" v-if="this.startIndex >= 4"><button class="btn btn-primary"  type="button" @click="goBack()">Previous Page</button></span>


    </div>
</template>

<script>
    export default {
        name : 'projects',
        data (){
            return {
                projects:[],
                filterInput:'',
                startIndex:0,
                count:4
            }
        },
        methods: {
            fetchProjects(){
                this.$http.get('http://csse-s365.canterbury.ac.nz:4974/api/v2/projects', {
                    params: {
                        startIndex: this.startIndex,
                        count: this.count
                    }
                })
                    .then(function (response) {
                        this.projects = (response.body);
                    });
            },
            filterBy(list, value){
                value = value.charAt(0).toUpperCase() + value.slice(1);
                return list.filter(function (project) {
                    return project.title.indexOf(value) > -1;
                });
            },
            goNext: function () {
                if(this.projects.length < 4){
                    ;
                }else {
                    this.startIndex += 4;
                    this.fetchProjects();
                }
            },
            goBack: function () {
                this.startIndex -= 4;
                this.fetchProjects();
            }
//            deleteProject(id){
//                this.$http.delete('http://csse-s365canterbury.ac.nz:4974/api/v2//projects' + id)
//                    .then(function (response) {
//                        this.$route.push({path:'/',query:{alert: 'Project Deleted'}});
//                    });
//            }
        },
        created:function () {
            this.fetchProjects();
        }
    }
</script>

<style scoped>
</style>