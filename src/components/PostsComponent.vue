<template>
    <div>
        <v-card>
            <v-card-title>
                <v-btn color="success" to="/posts/new">
                    New Post
                </v-btn>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                :headers="headers"
                :items="items"
                :page.sync="page"
                :items-per-page="12"
                :search="search"
                hide-default-footer
                @page-count="pageCount = $event"
            >
                <template v-slot:item.action="item">
                    <v-btn small color="primary" :to="'/categories/'+item.item.theme.category_id+'/themes/'+item.item.theme_id+'/posts/'+item.item.id"><v-icon>mdi-book-arrow-left</v-icon></v-btn>
                    <v-btn small color="info" :to="'/posts/'+item.item.id+'/edit'"><v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn small color="error" @click.stop="setDelete(item.item), dialogDelete = true"><v-icon>mdi-trash-can</v-icon></v-btn>
                </template>
            </v-data-table>
            <v-dialog
                v-model="dialogDelete"
                max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">
                        Delete {{ deleting.title }}
                    </v-card-title>

                    <v-card-text>
                        Are you sre you want to delete the post {{ deleting.title }}?
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn
                            color="info"
                            text
                            @click="dialogDelete = false"
                        >
                            Cancel
                        </v-btn>

                        <v-btn
                            color="error"
                            text
                            @click="submitDelete"
                        >
                            Delete
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card>
    </div>

</template>

<script>
    export default {
        name: "PostsComponent",
        created() {
            this.axios.get('/posts?include=author,theme').then(response=>{
                this.items = response.data.data;
                this.items.map(x=> {
                    x.author_name = x.author.name;
                    x.theme_name = x.theme.name;
                });
            })
        },
        methods: {
            setEdit(item) {
                this.editing = item;
            },
            setDelete(item) {
                this.deleting = item;
            },

            submitDelete(){
                this.axios.delete('/posts/'+this.deleting.id).then(()=>{
                    this.items = this.items.filter(x=>x.id !== this.deleting.id);
                    this.dialogDelete = false;
                });
            }
        },

        data:()=>({
            headers: [
                {
                    text: '#',
                    align: 'start',
                    value: 'id',
                },
                { text: 'Title', value: 'title' },
                { text: 'Theme', value: 'theme_name' },
                { text: 'Author', value: 'author_name' },
                { text: 'Created_at', value: 'created_at' },
                { text: 'Updated_at', value: 'updated_at' },
                { text: 'Action', sortable: false, value: 'action' },
            ],
            items: [],
            loading: true,
            page: 1,
            pageCount: 3,
            search: '',
            deleting: { title: '' },
            dialog: false,
            dialogDelete: false,

        })
    }
</script>

<style scoped>

</style>
