<template>
    <v-container>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title><h2>{{ post.title }}</h2></v-card-title>
                    <v-divider></v-divider>
                    <v-card-subtitle>
                        <h4>Author: {{ post.author.name }}</h4>
                        <h4>Posted at: {{ post.created_at }}</h4>
                        <h4>Last edited at: {{ post.updated_at }}</h4>
                    </v-card-subtitle>
                    <v-divider></v-divider>
                    <v-card-text style="font-size: large">
                        {{ post.content }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <comments
                    :items="post.comments"
                    @addComment="submitComment"
                    @updateComment="updateComment"
                ></comments>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Comments from "../components/Comments";
    export default {
        name: "Post",
        components: {Comments},
        created() {
            this.axios.get('/posts/'+this.$route.params.post_id+'?include=author,theme,comments')
                .then(response=>{
                    this.post = response.data.data;
                })
        },
        computed:{
            loggedInUser(){
                return this.$store.state.user.user;
            }
        },
        methods:{
          submitComment(data){
              this.axios.post('/comments', {content: data, author_id: this.loggedInUser.id, post_id: this.post.id}).then(response=>{
                  response.data.data.author = this.loggedInUser;
                 this.post.comments.push(response.data.data);
              });
          },
            updateComment(data){
                this.axios.patch('/comments/'+data.id, {content: data.content, author_id: this.loggedInUser.id, post_id: this.post.id}).then(response=>{
                    response.data.data.author = this.loggedInUser;
                    this.post.comments.filter(x=>x.id===data.id)[0] = response.data.data;
                });
            }
        },
        data: ()=> ({
            post: null,
        }),
    }
</script>

<style scoped>

</style>
