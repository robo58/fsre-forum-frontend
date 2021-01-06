<template>
    <div>
        <v-card>
            <v-card-title>

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
                item-key="id"
                :page.sync="page"
                :items-per-page="12"
                :search="search"
                hide-default-footer
                @page-count="pageCount = $event"
            >
                <template v-slot:item.action="item">
                    <v-btn small color="primary" :to="'/users/'+item.item.id"><v-icon>mdi-book-arrow-left</v-icon></v-btn>
                    <v-btn small color="info" @click.stop="setEdit(item.item), dialog = true" ><v-icon>mdi-pencil</v-icon></v-btn>
                    <v-btn small color="error" @click.stop="setDelete(item.item), dialogDelete = true"><v-icon>mdi-trash-can</v-icon></v-btn>
                </template>
            </v-data-table>
            <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
            >
                <v-card>
                    <v-card-title>
                        <span class="headline">Edit user roles</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col
                                    cols="12"
                                >
                                    <v-text-field
                                        label="Name"
                                        disabled
                                        v-model="editing.name"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                >
                                    <v-text-field
                                        label="Name"
                                        disabled
                                        v-model="editing.email"
                                    ></v-text-field>
                                </v-col>
                                <v-col
                                    cols="12"
                                >
                                    <v-select
                                        label="Select roles..."
                                        :items="roles"
                                        item-text="name"
                                        item-value="id"
                                        required
                                        multiple
                                        v-model="editing.roles"
                                    ></v-select>
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
                </v-card>
            </v-dialog>
            <v-dialog
                v-model="dialogDelete"
                max-width="290"
            >
                <v-card>
                    <v-card-title class="headline">
                        Delete {{ deleting.name }}
                    </v-card-title>

                    <v-card-text>
                        Are you sre you want to delete the user {{ deleting.name }}?
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
        name: "UsersComponent",
        created() {
            this.axios.get('/users?include=roles').then(response=>{
                this.items = response.data.data;
                this.items.map(x=>{
                    x.role_list = x.roles.map(r=>r.name).join(', ');
                });
            });
            this.axios.get('/roles').then(response=>{
                this.roles = response.data.data;
            })
        },
        methods: {
            setEdit(item) {
                this.editing = item;
                this.editing.index = this.items.indexOf(item)
            },
            setDelete(item) {
                this.deleting = item;
            },
            submitEdit: function () {
                this.axios.patch('/users/' + this.editing.id + '/roles/sync', {resources: this.editing.roles}).then(() => {
                    this.dialog = false;
                    this.editing.role_list = this.roles.map(r => this.editing.roles.includes(r.id) ? r.name : '').join(', ');

                    this.items.splice(this.editing.index, 1, this.editing);
                });
            },
            submitDelete(){
                this.axios.delete('/categories/'+this.deleting.id).then(()=>{
                    this.items = this.items.filter(x=>x.id !== this.deleting.id);
                    this.dialogDelete = false;
                });
            },
        },

        data:()=>({
            headers: [
                {
                    text: '#',
                    align: 'start',
                    value: 'id',
                },
                { text: 'Name', value: 'name' },
                { text: 'Email', value: 'email' },
                { text: 'Roles', value: 'role_list' },
                { text: 'Created_at', value: 'created_at' },
                { text: 'Updated_at', value: 'updated_at' },
                { text: 'Action', sortable: false, value: 'action' },
            ],
            items: [],
            loading: true,
            page: 1,
            pageCount: 3,
            search: '',
            roles: [],
            editing: { name: '' },
            deleting: { name: '' },
            dialog: false,
            dialogDelete: false,
        })
    }
</script>

<style scoped>

</style>
