<template>
    <v-container class="text-center">
        <v-card class="py-5">
            <v-row justify="center">
                <v-card-title><h1>Login</h1></v-card-title>
            </v-row>
            <v-card-actions>
                <v-row>
                    <v-col cols="8" offset="2">
                        <v-form @submit.prevent="login">
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
                            <v-btn
                                color="success"
                                class="mr-4"
                                type="submit"
                            >
                                Login
                            </v-btn>
                            <br><br>
                            <router-link to="/reset_password" class="py-3">
                                Forgot Password? Reset now.
                            </router-link>
                            <br><br>
                            <router-link to="/register">
                                No account? Register now.
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
                email: '',
                password: ''
            }
        },

        methods: {
            login () {
                this.$store
                    .dispatch('login', {
                        email: this.email,
                        password: this.password
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
