<template>
    <div>
        <v-card>
        <v-card-title>
            <v-btn color="success" @click.stop="dialogNew = true">
                New Category
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
                <v-btn small color="primary" :to="'/categories/'+item.item.id"><v-icon>mdi-book-arrow-left</v-icon></v-btn>
                <v-btn small color="info" @click.stop="setEdit(item.item), dialog = true" ><v-icon>mdi-pencil</v-icon></v-btn>
                <v-btn small color="error" @click.stop="setDelete(item.item), dialogDelete = true"><v-icon>mdi-trash-can</v-icon></v-btn>
            </template>
        </v-data-table>
            <v-dialog
                v-model="dialogNew"
                persistent
                max-width="600px"
            >
                <v-card>
                    <v-card-title>
                        <span class="headline">New category</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col
                                    cols="12"
                                >
                                    <v-text-field
                                        label="Name"
                                        required
                                        v-model="newItem.name"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="dialogNew = false"
                        >
                            Close
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="submitNew"
                        >
                            Save
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
        >
            <v-card>
                <v-card-title>
                    <span class="headline">Edit category</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col
                                cols="12"
                            >
                                <v-text-field
                                    label="Name"
                                    required
                                    v-model="editing.name"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="dialog = false"
                    >
                        Close
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="submitEdit"
                    >
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>        </v-dialog>
            <v-dialog
                v-model="dialogDelete"
                max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">
                        Delete {{ deleting.name }}
                    </v-card-title>

                    <v-card-text>
                        Are you sre you want to delete the category {{ deleting.name }}?
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
        name: "CategoriesComponent",
        created() {
            this.axios.get('/categories').then(response=>{
                this.items = response.data.data;
            })
        },
        methods: {
            setEdit(item) {
                this.editing = item;
            },
            setDelete(item) {
                this.deleting = item;
            },
            submitEdit() {
                this.axios.patch('/categories/' + this.editing.id, {name: this.editing.name}).then(() => {
                    this.dialog = false;
                });
            },
            submitDelete(){
                this.axios.delete('/categories/'+this.deleting.id).then(()=>{
                    this.items = this.items.filter(x=>x.id !== this.deleting.id);
                    this.dialogDelete = false;
                });
            },
            submitNew(){
                this.axios.post('/categories/', {name: this.newItem.name}).then(response=>{
                    this.items.push(response.data.data);
                    this.newItem.name = '';
                    this.dialogNew = false;
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
                { text: 'Name', value: 'name' },
                { text: 'Created_at', value: 'created_at' },
                { text: 'Updated_at', value: 'updated_at' },
                { text: 'Action', sortable: false, value: 'action' },
            ],
            items: [],
            loading: true,
            page: 1,
            pageCount: 3,
            search: '',
            editing: { name: '' },
            deleting: { name: '' },
            newItem: { name: '' },
            dialog: false,
            dialogDelete: false,
            dialogNew: false
        })
    }
</script>

<style scoped>

</style>
