<template>
    <v-container fluid>
        <v-card class="py-4">
            <v-row>
                <v-col sm="4" cols="12" offset-sm="0" class="text-center justify-center">
                    <v-card-title class="text-center">
                        {{ theme.name }}
                    </v-card-title>
                </v-col>
                <v-col sm="5" cols="10" offset="1" offset-sm="0">
                    <v-text-field
                        label="Search posts..."
                        append-icon="mdi-magnify"
                        v-model="searchPosts"
                        single-line
                    ></v-text-field>
                </v-col>
                <v-col sm="2" cols="8" offset-sm="1" offset-md="0">
                    <v-btn color="primary" to="/posts/new" class="mx-4">
                        Create new post
                    </v-btn>
                </v-col>
            </v-row>
            <v-card-actions>
                <v-row>
                    <v-col>
                        <v-list three-line>
                            <v-list-item-group>
                                <v-list-item v-for="post in filteredPosts" :key="post.id" :to="'/categories/'+theme.category_id+'/themes/'+theme.id+'/posts/'+post.id">
                                    <v-list-item-content>
                                        <v-list-item-title>{{ post.title }}</v-list-item-title>
                                        <v-list-item-subtitle class="py-3">
                                            <small>
                                                Posted by: {{post.author.name}} | Posted at: {{ post.created_at }} | Last edited: {{ post.updated_at }}
                                            </small>
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>

    </v-container>
</template>

<script>
    export default {
        name: "Theme",

        created() {
            this.axios.get('/themes/'+this.$route.params.theme_id)
                .then(response=>{
                   this.theme = response.data.data;
                });
            this.axios.get('/themes/'+this.$route.params.theme_id+'/posts?include=author')
              .then(response=>{
                    this.posts = response.data.data;
              });
        },
        computed:{
            filteredPosts(){
                let filtered = [];
                for(let i=0;i<this.posts.length;i++){
                    if(this.posts === '' || this.posts[i].title.toLowerCase().includes(this.searchPosts.toLowerCase())){
                        filtered.push(this.posts[i]);
                    }
                }
                return filtered;
            }
        },

        data: ()=>({
           theme: null,
            posts: [],
            searchPosts: ''

        }),
    }
</script>

<style scoped>

</style>
