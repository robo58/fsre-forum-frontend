<template>
    <v-card>
        <v-card-title>Comments</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
                    <v-list-item>
                        <v-text-field
                            label="Enter a new comment..."
                            v-model="newComment"
                        ></v-text-field>
                        <v-btn plain color="success" @click.prevent="addComment">
                            Add
                        </v-btn>
                    </v-list-item>
                    <template v-for="(item, index) in items">
                        <v-list-item :key="item">
                            <template>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.author.name"></v-list-item-title>

                                    <v-list-item-subtitle
                                        class="text--primary"
                                        v-text="item.updated_at"
                                    ></v-list-item-subtitle>

                                    <p class="my-5">{{ item.content }}</p>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-btn color="info" @click="startEdit(item)">
                                        <v-icon>
                                            mdi-pencil
                                        </v-icon>
                                    </v-btn>
                                    <v-btn color="warning">
                                        <v-icon>
                                            mdi-flag
                                        </v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </template>
                        </v-list-item>

                        <v-divider
                            v-if="index < items.length - 1"
                            :key="index"
                        ></v-divider>
                    </template>
        </v-card-text>
        <v-dialog
            v-model="editDialog"
            persistent
            max-width="600px"
        >
            <v-card>
                <v-card-title>
                    <span class="headline">Edit comment</span>
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
                                    v-model="editComment.content"
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
                        @click="editDialog = false"
                    >
                        Close
                    </v-btn>
                    <v-btn
                        color="blue darken-1"
                        text
                        @click="updateComment"
                    >
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-card>

</template>

<script>
    export default {
        name: "Comments",
        props: ['items'],
        methods:{
          addComment(){
                this.$emit('addComment', this.newComment);
                this.newComment = '';
          },
            startEdit(item){
              this.editComment=item;
                this.editDialog = true;
            },
            updateComment(){
                this.$emit('updateComment', this.editComment);
                this.editComment = '';
                this.editDialog = false;
            }
        },
        watch:{
          items: {
              // eslint-disable-next-line no-unused-vars
              handler(val, oldVal){
                  oldVal = val;
              }
          }
        },
        data: ()=>({
            newComment: '',
            editComment: {},
            editDialog: false
        })
    }
</script>

<style scoped>

</style>
