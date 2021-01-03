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
                    <v-card-text>
                        {{ post.content }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        name: "Post",
        created() {
            this.axios.get('/posts/'+this.$route.params.post_id+'?include=author,theme')
                .then(response=>{
                    this.post = response.data.data;
                })
        },
        computed:{

        },
        data: ()=> ({
            post: null,
        }),
    }
</script>

<style scoped>

</style>
