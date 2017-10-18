<template>
    <div class = "addProject container">
        <div class="col-xs-12 col-sm-4 col-sm-offset-5">
            <!--<Alert v-if = "alert" v-bind:message = "alert" />-->
            <h1 class="page-header">Create Project</h1>
            <form v-on:submit = "addProject">
                <div class = "well">
                    <h4>Project Information</h4>
                    <div class="form group has-feedback" v-bind:class="[TitleSuccessClass]">
                        <input ref="txtTitle" type = "text" class="form-control" @input="checkTitle" placeholder="Title" v-model = "title">
                        <span v-bind:class="[TitleIconClass]"></span>
                    </div>

                    <br/>
                    <div class="form group has-feedback" v-bind:class="[SubtitleSuccessClass]">
                        <input ref="txtSubtitle" type = "text" class="form-control" @input="checkSubtitle" placeholder="Subtitle" v-model = "subtitle">
                        <span v-bind:class="[SubtitleIconClass]"></span>
                    </div>

                    <br />
                    <div class="form group has-feedback" v-bind:class="[DescriptionSuccessClass]">
                        <input ref="txtDescription" type = "text" class="form-control" @input="checkDescription" placeholder="Description" v-model = "description">
                        <span v-bind:class="[DescriptionIconClass]"></span>
                    </div>

                    <br />
                    <div class="form group has-feedback" v-bind:class="[TargetSuccessClass]">
                        <input ref="txtTarget" type = "number" class="form-control" @input="checkTarget" placeholder="Target" v-model = "target">
                        <span v-bind:class="[TargetIconClass]"></span>
                    </div>
                    <br/>
                    <div class="form group has-feedback" v-bind:class="[CreatorSuccessClass]">
                        <input ref="txtCreator" type = "number" class="form-control" @input="checkCreator" placeholder="Project Creators" v-model = "creators">
                        <span v-bind:class="[CreatorIconClass]"></span>
                    </div>

                    <br/>
                    <div class="form group has-feedback" v-bind:class="[AmountSuccessClass]">
                        <input ref="txtAmount" type = "number" class="form-control" @input="checkAmount" placeholder="Project Rewards Amount" v-model = "amount">
                        <span v-bind:class="[AmountIconClass]"></span>
                    </div>

                    <br/>
                    <div class="form group has-feedback" v-bind:class="[ProjectDescSuccessClass]">
                        <input ref="txtProjectDesc" type = "text" class="form-control" @input="checkProjectDesc" placeholder="Project Rewards Description" v-model ="rewardsDesc">
                        <span v-bind:class="[ProjectDescIconClass]"></span>
                    </div>


                </div>
                <button type ="submit" class="btn btn-primary">Create Project</button>
            </form>
        </div>
    </div>
</template>

<script>
    import Alert from './alert.vue';
    export default {
        name : 'addProject',
        data (){
            return {
                project:{},
                TitleSuccessClass:'',
                TitleIconClass:'',
                SubtitleSuccessClass:'',
                SubtitleIconClass:'',
                DescriptionSuccessClass:'',
                DescriptionIconClass:'',
                TargetSuccessClass:'',
                TargetIconClass:'',
                CreatorSuccessClass:'',
                CreatorIconClass:'',
                AmountSuccessClass:'',
                AmountIconClass:'',
                ProjectDescSuccessClass:'',
                ProjectDescIconClass:'',
                target:'',
                description:'',
                rewardsDesc:'',
                amount:'',
                creators:'',
                subtitle:'',
                title:''

//                alert: ''
            }
        },
        methods:{

            addProject(event){
                if(!this.title || !this.subtitle || !this.description || !this.target || !this.amount || !this.creators  || !this.rewardsDesc){
                    console.log('Please fill in all required fields');
                } else {
                    let newProject = {
                        "title": this.title,
                        "subtitle": this.subtitle,
                        "description": this.description,
                        "target": parseInt(this.target),
                        "creators": [
                            {
                                "id": parseInt(this.creators)
                            }
                        ],
                        "rewards": [
                            {
                                "amount": parseInt(this.amount),
                                "description": this.rewardsDesc
                            }
                        ]
                    }
                    console.log(newProject);

                    this.$http.post('http://csse-s365.canterbury.ac.nz:4974/api/v2/projects', newProject, {
                        headers:{
                            'X-Authorization': this.$session.get("userSession")
                        }})
                        .then(function (response) {
                            this.$router.push({path: '/project'});
//                                , query:{alert: 'Success added user'}});
                        });
                    event.preventDefault();
                }
                event.preventDefault();
            },
            checkTitle:function () {
                if (this.$refs.txtTitle.checkValidity()) {
                    this.TitleSuccessClass = 'has-success';
                    this.TitleIconClass = 'glyphicon glyphicon-ok form-control-feedback';
                }
                else{
                    this.TitleSuccessClass = 'has-error';
                    this.TitleIconClass = 'glyphicon glyphicon-remove form-control-feedback'
                }
            },
            checkSubtitle:function () {
                if (this.$refs.txtSubtitle.checkValidity()) {
                    this.SubtitleSuccessClass = 'has-success';
                    this.SubtitleIconClass = 'glyphicon glyphicon-ok form-control-feedback';
                }
                else{
                    this.SubtitleSuccessClass = 'has-error';
                    this.SubtitleIconClass = 'glyphicon glyphicon-remove form-control-feedback'
                }
            },
            checkDescription:function () {
                if (this.$refs.txtDescription.checkValidity()) {
                    this.DescriptionSuccessClass = 'has-success';
                    this.DescriptionIconClass = 'glyphicon glyphicon-ok form-control-feedback';
                }
                else{
                    this.DescriptionSuccessClass = 'has-error';
                    this.DescriptionIconClass = 'glyphicon glyphicon-remove form-control-feedback'
                }
            },
            checkTarget:function () {
                if (this.$refs.txtTarget.checkValidity()) {
                    this.TargetSuccessClass = 'has-success';
                    this.TargetIconClass = 'glyphicon glyphicon-ok form-control-feedback';
                }
                else{
                    this.TargetSuccessClass = 'has-error';
                    this.TargetIconClass = 'glyphicon glyphicon-remove form-control-feedback'
                }
            },
            checkCreator:function () {
                if (this.$refs.txtCreator.checkValidity()) {
                    this.CreatorSuccessClass = 'has-success';
                    this.CreatorIconClass = 'glyphicon glyphicon-ok form-control-feedback';
                }
                else{
                    this.CreatorSuccessClass = 'has-error';
                    this.CreatorIconClass = 'glyphicon glyphicon-remove form-control-feedback'
                }
            },
            checkAmount:function () {
                if (this.$refs.txtAmount.checkValidity()) {
                    this.AmountSuccessClass = 'has-success';
                    this.AmountIconClass = 'glyphicon glyphicon-ok form-control-feedback';
                }
                else{
                    this.AmountSuccessClass = 'has-error';
                    this.AmountIconClass = 'glyphicon glyphicon-remove form-control-feedback'
                }
            },
            checkProjectDesc:function () {
                if (this.$refs.txtProjectDesc.checkValidity()) {
                    this.ProjectDescSuccessClass = 'has-success';
                    this.ProjectDescIconClass = 'glyphicon glyphicon-ok form-control-feedback';
                }
                else{
                    this.ProjectDescSuccessClass = 'has-error';
                    this.ProjectDescIconClass = 'glyphicon glyphicon-remove form-control-feedback'
                }
            }
        },
        created:function(){
            if(this.$route.query.alert){
                this.alert = this.$route.query.alert;
            }
            this.addProject();
        },
        components: {
            Alert
        }
    }
</script>

<style scoped>
</style>