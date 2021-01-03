<template>
    <v-container class="text-center">
        <v-card class="py-5">
            <v-row justify="center">
                <v-card-title><h1>Register</h1></v-card-title>
            </v-row>
            <v-card-actions>
                <v-row>
                    <v-col cols="8" offset="2">
                        <v-form @submit.prevent="register">
                            <v-text-field
                                v-model="name"
                                label="Name"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="email"
                                label="E-mail"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="password"
                                label="Password"
                                type="password"
                                required
                            ></v-text-field>
                            <v-text-field
                                v-model="cPassword"
                                label="Confirm password"
                                type="password"
                                required
                            ></v-text-field>
                            <v-btn
                                color="success"
                                class="mr-4"
                                type="submit"
                            >
                                Register
                            </v-btn>
                            <br><br>
                            <router-link to="/login">
                                Already have an account? Login now.
                            </router-link>
                        </v-form>
                    </v-col>
                </v-row>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        data () {
            return {
                name: '',
                email: '',
                password: '',
                cPassword: ''
            }
        },

        methods: {
            register () {
                this.$store
                    .dispatch('register', {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        confirmPassword: this.cPassword
                    })
                    .then(() => {
                        this.$router.push({ name: 'Home' })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        }
    }
</script>
