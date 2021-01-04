<template>
    <v-container>
        <v-row class="py-5">
            <v-col>
                <v-card>
                    <v-card-title>
                        <h2>
                            {{  editMode ? 'Edit profile' : 'Profile' }}
                        </h2>
                    </v-card-title>
                    <v-switch
                        v-model="editMode"
                        :label="`Edit mode`"
                        class="px-3"
                        v-if="loggedInUser.id === user.id"
                    ></v-switch>
                    <v-divider class="ma-4"></v-divider>
                    <UserProfile :user="user" v-if="!editMode"></UserProfile>
                    <EditProfile :user="user" v-else></EditProfile>
                    <v-divider class="ma-4"></v-divider>
                    <h3 class="text-center">My posts</h3>
                    <v-row class="ma-4 pa-2">
                        <v-col>
                            <v-btn color="primary" to="/posts/new">
                                Create new post
                            </v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-list-item-group class="ma-4 pa-2">
                                <v-list-item v-for="post in user.posts" :key="post.id" :to="'/categories/'+post.theme.category_id+'/themes/'+post.theme_id+'/posts/'+post.id">
                                    <v-list-item-content>
                                        <v-list-item-title>{{ post.title }}</v-list-item-title>
                                        <v-list-item-subtitle class="py-3">
                                            <small>
                                                Theme: {{post.theme.name}} | Posted at: {{ post.created_at }} | Last edited: {{ post.updated_at }}
                                            </small>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import UserProfile from "../components/UserProfile";
    import EditProfile from "../components/EditProfile";
    export default {
        name: "Profile",
        components: {UserProfile, EditProfile},
        created() {
            this.loadUserAndPosts();
        },
        computed:{
          loggedInUser(){
              return this.$store.state.user.user;
          }
        },
        methods:{
          loadUserAndPosts(){
              this.axios.get('/users/'+this.$route.params.user_id+'?include=posts').then(response=>{
                  this.user = response.data.data;
              });
          }
        },
        data: ()=> ({
            editMode: false,
            user: null,
        }),
    }
</script>

<style scoped>

</style>
