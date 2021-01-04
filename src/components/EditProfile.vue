<template>
    <v-row>
        <v-col>
            <v-form @submit.prevent="updateProfile" class="pa-4">
                <v-text-field
                    v-model="user.name"
                    label="Username"
                    required
                ></v-text-field>
                <v-text-field
                    v-model="user.email"
                    label="E-mail"
                    required
                ></v-text-field>
                <v-btn
                    color="info"
                    class="mr-4"
                    type="submit"
                >
                    Update
                </v-btn>
                <v-dialog
                    v-model="dialog"
                    max-width="600"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="warning"
                            class="mr-4"
                            type="submit"
                            v-bind="attrs"
                            v-on="on"
                        >
                            Change password
                        </v-btn>
                    </template>
                    <v-card class="pa-4" >
                        <v-row class="pa-4">
                            <v-col>
                                <h3 class="text-center">Change password</h3>
                            </v-col>
                        </v-row>
                            <v-row class="pa-4">
                                <v-col>
                                    <v-text-field
                                        v-model="password"
                                        label="Password"
                                        type="password"
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="pa-4">
                                <v-col>
                                    <v-text-field
                                        v-model="cPassword"
                                        label="Confirm password"
                                        type="password"
                                        required
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row class="pa-4">
                                <v-col cols="4" offset="4">
                                    <v-btn
                                        color="success"
                                        class="mr-4"
                                        type="submit"
                                        @click.prevent="changePassword"
                                    >
                                        Set password
                                    </v-btn>
                                </v-col>
                            </v-row>
                    </v-card>
                </v-dialog>
            </v-form>
        </v-col>
    </v-row>

</template>

<script>
    export default {
        name: "EditProfile",
        props:{
            user: {
                type: Object,
                required: true
            }
        },
        methods:{
            updateProfile(){
                this.axios.put('/users/'+this.user.id, this.user);
            },
            changePassword(){
                if(this.password.equals(this.cPassword)){
                    this.axios.put('/users/'+this.user.id, {user: this.user, password: this.password, confirmPassword: this.cPassword});
                }
            }
        },
        data: ()=> ({
            dialog: false,
            password: '',
            cPassword: ''
        }),

    }
</script>

<style scoped>

</style>
