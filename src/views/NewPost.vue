<template>
    <v-container>
        <v-card>
            <v-card-title>
                Create a post
            </v-card-title>
            <v-row>
                <v-col>
                    <v-select
                        label="Select category..."
                        :items="categories"
                        item-text="name"
                        item-value="id"
                        class="px-4"
                        filled
                        @change="setThemes"
                        v-model="selectedCategory"
                    ></v-select>
                    <v-select
                        label="Select theme..."
                        :items="themes"
                        item-text="name"
                        item-value="id"
                        class="px-4"
                        filled
                        v-model="post.theme_id"
                    ></v-select>
                    <v-text-field
                    label="Enter post title..."
                    class="px-4"
                    v-model="post.title"
                    filled
                    >
                    </v-text-field>
                    <v-textarea
                        filled
                        label="Enter post text..."
                        auto-grow
                        v-model="post.content"
                        class="px-4"
                    ></v-textarea>
                    <v-btn
                        color="success"
                        type="submit"
                        class="d-flex mx-auto"
                        :disabled="formCheck"
                        @click.prevent="addPost"
                    >
                        Create post
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: "Post",
        created() {
            this.axios.get('/categories?include=themes').then(response=>{
                this.categories = response.data.data
            })
        },
        computed:{
            loggedInUser(){
                return this.$store.state.user.user;
            },
            formCheck(){
                return this.post.title === '' && this.post.content.equals === '' && this.post.theme_id === -1 && this.post.author_id === -1;
            }
        },
        methods:{
            setThemes(){
                this.themes = this.categories.filter(x=>x.id===this.selectedCategory)[0].themes;
            },
            addPost(){
                this.post.author_id = this.loggedInUser.id;
                this.axios.post('/posts', this.post).then(response=>{
                    console.log(response.data);
                    this.$router.push('/');
                })

            }
        },
        data: ()=> ({
            post: {title: '', content: '', theme_id: -1, author_id: -1},
            categories: [],
            themes: [],
            selectedCategory: -1,
        }),
    }
</script>

<style scoped>

</style>
