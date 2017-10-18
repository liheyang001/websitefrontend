<template>
    <section class = "projectDetails container">

        <div class="col-sm-6">
        <h1 class="page-header">Project Details</h1>

            <div v-if="this.$session.get('userSession')">

            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#pledge">Pledge</button>
                <div class="modal fade" id="pledge" tabindex="-1" role="dialog" aria-labelledby="pledgeLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="pledgeLabel">Pledge This Project</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <input type="number" placeholder="Pledge Amount" v-model="amountPledge">
                            </div>

                            <div class="modal-body">
                                <input type="text" placeholder="Card" v-model="card">
                            </div>

                            <div class="modal-body">
                            <input type="checkbox" id="checkbox" v-model="checked">
                                <label for="checkbox">anonymous</label>
                            </div>

                            <div class="modal-footer">
                                <button type ="button" class="btn btn-primary" data-dismiss="modal" @click="pledgeMe">Pledge</button>
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <img v-bind:src = "'http://csse-s365.canterbury.ac.nz:4974/api/v2/' + project.imageUri" style="width:500px; height: 500px"/>
            <br />
            <br />


            <div class="progress">
                <div class="progress-bar progress-bar-success progress-bar-striped active" v-bind:style="'width:'+ progress()"></div>
                Progress: {{progress()}}
            </div>

            <li class = "list-group item">Current Pledged : {{project.progress.currentPledged}}</li>
            <li class = "list-group item">Number Of Backer : {{project.progress.numberOfBackers}}</li>

            <li class = "list-group item">Project Backers : {{project.backers}}</li>

        </div>
        <div class="col-sm-6">
            <br>

            <div v-if="this.$session.get('userId') == project.creators[0].id">
                <h2>Manage My Project</h2>
                <table class="table table-striped" id="ManagementMyProject">
                    <thead class="col-sm-10">
                    <tr>
                        <th>Change Project Current Status To</th>
                        <th>Upload Image</th>
                        <th>Change Project Details</th>
                    </tr>
                    </thead>
                    <br/><br/><br/><br/>
                    <tbody class="col-sm-8">
                    <tr>
                        <td><input type="button" class="btn btn-primary" v-on:click="statusChange($route.params.id)" value="Close This Project"></td>

                        <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#upload">Upload Image</button>
                            <div class="modal fade" id="upload" tabindex="-1" role="dialog" aria-labelledby="uploadLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="uploadLabel">Upload Image</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>


                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="">
                                                    <img :src="image" class="img-responsive">
                                                </div>
                                                <div class="col-md-10">
                                                    <input id = "imageUpload" type="file" v-on:change="onFileChange"  class="form-control">
                                                </div>
                                                <div class="col-md-2">
                                                    <button class="btn btn-primary"@click="upload()">Upload</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td><router-link to ="/editprojects" type="button" class="btn btn-primary">Change Project Details</router-link></td>
                    </tr>
                    </tbody>
                </table>


                <!--<select class="btn btn-primary" v-model="selected">-->
                <!--<option>Open</option>-->
                <!--<option>Close</option>-->
                <!--</select>-->



            </div>

            <br/>
            <ul class="list-group">
                <br/>
                <h2><li class = "list-group item">Project ID :  {{project.id}}</li></h2>
                <h2><li class = "list-group item">Project Title :  {{project.title}}</li></h2>
                <li class = "list-group item">Project Subtitle :  {{project.subtitle}}</li>
                <li class = "list-group item">Project Description :  {{project.description}}</li>
                <li class = "list-group item">Project Target :  {{project.target}}</li>
                <li class = "list-group item">Project Creation Date :  {{this.timeConverter()}}</li>

                <li class = "list-group item">Project Creators : </li>
                    <table class="table table-striped" id="creatorTable">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for = "creator in project.creators">

                            <td>{{creator.id}}</td>
                            <td>{{creator.username}}</td>
                        </tr>
                        </tbody>
                    </table>

                <li class = "list-group item"> Project Rewards:</li>
                    <table class="table table-striped" id="rewardsTable">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Amount</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for = "reward in project.rewards">

                            <td>{{reward.id}}</td>
                            <td>{{reward.amount}}</td>
                            <td>{{reward.description}}</td>
                        </tr>
                        </tbody>
                    </table>

            </ul>
            <span class="pull-right"> <button class="btn btn"><router-link to="/project">Back</router-link></button></span>


        </div>


    </section>


</template>

<script>

    export default {
        name: 'projectDetails',
        data (){
            return {
                project: '',
                image: '',
                amountPledge:'',
                card:'',
                checked:'',
                projects:[]
            }
        },
        mounted: function()
        {
            this.userProject();
        },
        methods: {
            pledgeMe(){
                let pledge =
                {
                    "id": this.$session.get("userId"),
                    "amount": parseInt(this.amountPledge),
                    "anonymous": false,
                    "card": {
                    "authToken": this.card
                    }
                }

                console.log(pledge);

                this.$http.post('http://csse-s365.canterbury.ac.nz:4974/api/v2/projects/' + this.$route.params.id + '/pledge', pledge, {
                    headers:{
                        'X-Authorization': this.$session.get("userSession")
                    }})
                    .then(function (response) {
                        this.$router.go({path:'http://localhost:4941/api/v2/projects'});
//                                , query:{alert: 'Success added user'}});
                    });
            },
            statusChange(id) {
                this.$http.put('http://csse-s365.canterbury.ac.nz:4974/api/v2/projects/'+ id,{
                        "open": false
                    },
                    {
                        headers:
                            {
                                'X-Authorization': this.$session.get("userSession")
                            }
                    })
            },

            fetchProject(id){
                this.$http.get('http://csse-s365.canterbury.ac.nz:4974/api/v2/projects/' + id)
                    .then(function (response) {
                        this.project = (response.body);
                    });
            },
            timeConverter:function () {
                var time = this.project.creationDate;
                var a = new Date(time);
                var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                var year = a.getFullYear();
                var month = months[a.getMonth()];
                var date = a.getDate();
                var hour = a.getHours();
                var min = a.getMinutes();
                var sec = a.getSeconds();
                var result = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
                return result;
            },
            progress:function(){
                var target = this.project.target;
                var prog = this.project.progress.currentPledged;
                var progressResult = prog/target;
                return (progressResult) * 100 +'%';
            },

            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                let reader = new FileReader();
                let vm = this;
                reader.onload = (e) => {
                    vm.image = e.target.result;
                };
                reader.readAsDataURL(file);

            },
            upload(){
                this.file = $(this.$el).find('#imageUpload')[0].files[0];
                this.$http.put('http://csse-s365.canterbury.ac.nz:4974/api/v2/projects/' + this.$route.params.id + '/image' ,this.file,
                    {
                        headers:{
                            'Content-Type': 'image/png',
                            'X-Authorization': this.$session.get("userSession")
                        }}).then(function (response) {

                    console.log(response);
                })
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
        created: function () {
            this.fetchProject(this.$route.params.id);
        },

    }
</script>

<style scoped>
</style>