import Vue from 'vue';
import App from './App.vue';
import Home from './Home.vue';
import UserDetails from './components/user.vue';
import About from './components/about.vue';
import Projects from './components/project.vue';
import Adduser from './components/adduser.vue';
import ProjectsDetails from './components/projectDetails.vue';
import Login from './components/login.vue';
import AddProject from './components/addproject.vue';
import EditUser from './components/editUser.vue';
import logOut from './components/logout.vue';
import VueCookies from 'vue-cookies';
import VueSession from '../node_modules/vue-session';
import VueClip from 'vue-clip';
// import SocialSharing from '../node_modules/vue-social';

// Vue.use(SocialSharing);
Vue.use(VueClip);
Vue.use(VueCookies);
Vue.use(VueSession);

import VueResource from 'vue-resource';
Vue.use(VueResource);




import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path:'/',
            component: Home
        },
        {
            path:'/users/:id',
            component: UserDetails
        },
        {
            path:'/project',
            component:Projects
        },
        {
            path:'/about',
            component:About
        },
        {
            path:'/adduser',
            component: Adduser
        },
        {
            path:'/login',
            component: Login
        },
        {
            path:'/project/:id',
            component:ProjectsDetails
        },
        {
            path:'/addproject',
            component:AddProject
        },
        {
            path:'/editUser/:id',
            component:EditUser
        },
        {
            path:'/logout',
            component:logOut
        }
    ]
});



new Vue({
        router,
    template:`
    <div id = "app">
        <nav class="navbar navbar-default">
        <div class="container">
            <div class="navbar-header">
            <button type = "button" class="navbar-toggle collapsed" data-toggle = "#navbar" aria-expanded="false" aria-controls="navbar">
            <span class = "sr-only">Toggle navigation</span>
            <span class="iron-bar"></span>
            <span class="iron-bar"></span>
            <span class="iron-bar"></span>         
            </button>
            <a class="navbar-brand" href="http://localhost:8080/">FundRaising</a>
            </div>
        <div id="navbar" class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
        <li v-if="this.$session.get('userSession')"> 
        <router-link v-bind:to="'/users/' + this.$route.params.id">User Details</router-link></li>
        
        <li><router-link to="/project">Projects</router-link></li>
        <li><router-link to="/about">About Us</router-link></li>
        
</ul>
        <ul class="nav navbar-nav navbar-right">
        
        <li v-if="this.$session.get('userSession')"> 
        <router-link to="/logout">Log Out</router-link>
        </li>
        
        
        
        <li v-else><router-link to="/login">Log In</router-link></li>
        <li><router-link to="/adduser">Sign Up</router-link></li>

        
   </ul>
      </div>
        </div>
            
        </nav>
        <router-view></router-view>         
           <br/>
           <br/>
        <nav class="navbar navbar-default">
                   
        <div class="container">
            <br/>
            <div class="navbar-footer">
            <table class="table table-striped">
            <thead>
                <tr>
                    <th><router-link to="/about">About Us</router-link></th>
                    <th>Help</th>
                    <th>Discover</th>
                    <th>Hello</th>
                    <th>Find Us</th>
                </tr>
            </thead>
            <tbody>
                <td>
                <br/>
                <div>What is FundRaising?</div>
                <div>Who we are</div>
                <div>Impact</div>
                <div>Jobs</div>
                </td>
                <td>
                <br/>
                <div>Help Center</div>
                <div>Our Rules</div>
                <div>Experts</div>
                <div>Terms of Use</div>
                </td>
                <td>
                <br/>
                <div>Art</div>
                <div>Comics</div>
                <div>Food</div>
                <div>Dance</div></td>
                <td>
                <br/>
                <div>Happening</div>
                <div>The Creative</div>
                <div>Independent</div>
                <div>Company Blog</div>
                </td>
                <td>
                
</td>
            </tbody>
            </table>
            </div>
            </div>
            </nav>
        </div>
       
        `
}).$mount('#app')
