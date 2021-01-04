<template>
  <v-app>
      <v-navigation-drawer
          v-model="drawer"
          fixed
          app
      >
          <v-row class="text-center py-4">
              <v-col cols="12">
                  <h1>
                      <router-link to="/" class="text-decoration-none">
                          FSRE forum
                      </router-link>
                  </h1>
              </v-col>
          </v-row>
            <v-divider></v-divider>
              <v-list-item three-line v-if="isLogged">
<!--                  <v-list-item-avatar>-->
<!--                      <img src="https://randomuser.me/api/portraits/women/81.jpg">-->
<!--                  </v-list-item-avatar>-->

                  <v-list-item-content>
                      <v-list-item-title>{{user.user.name}}</v-list-item-title>
                      <v-list-item-subtitle>{{ user.user.email }}</v-list-item-subtitle>
                  </v-list-item-content>
              </v-list-item>
          <v-list-item @click="logout" v-if="isLogged" dense>
              <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>
          <v-list
              nav
              dense
          >
              <v-list-item-group
                  active-class="deep-purple--text text--accent-4"
              >
                  <v-list-item to="/">
                      <v-list-item-icon>
                          <v-icon>mdi-home</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>Home</v-list-item-title>
                  </v-list-item>
                  <v-list-item to="/login" v-if="!isLogged">
                      <v-list-item-icon>
                          <v-icon>mdi-account-box-multiple</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>Login/Register</v-list-item-title>
                  </v-list-item>
                  <v-list-item :to="'/users/'+user.user.id" v-if="isLogged">
                      <v-list-item-icon>
                          <v-icon>mdi-account</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>Profile</v-list-item-title>
                  </v-list-item>
                  <v-list-item to="/posts/new" v-if="isLogged">
                      <v-list-item-icon>
                          <v-icon>mdi-pencil-plus</v-icon>
                      </v-list-item-icon>
                      <v-list-item-title>Create a post</v-list-item-title>
                  </v-list-item>

              </v-list-item-group>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-list-item-group
                active-class="deep-purple--text text--accent-4"
            >
                <v-list-item disabled>
                    <v-list-item-title>Categories</v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item v-for="category in categories" :key="category.id" :to="'/categories/'+category.id">
                    <v-list-item-title v-text="category.name"></v-list-item-title>
                </v-list-item>
            </v-list-item-group>
          </v-list>
      </v-navigation-drawer>

      <v-app-bar
          fixed
          app
          color="primary"
          dark
    >
          <v-row>
              <v-col cols="2">
                  <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
              </v-col>
              <v-col sm="8" cols="10">
                  <v-text-field
                      label="Search all..."
                      append-icon="mdi-magnify"
                      single-line
                  ></v-text-field>
              </v-col>
          </v-row>
    </v-app-bar>


    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
  </v-app>
</template>

<script>
    import { mapGetters } from 'vuex'
export default {
  name: 'App',
    created() {
      this.axios.get('/categories').then(response=>{
          this.categories = response.data.data
      })
    },
    computed: {
        ...mapGetters([
            'isLogged',
        ]),

        user(){
            if(this.isLogged){
                return this.$store.state.user;
            }else{
                return null;
            }
        }
    },
    methods:{
        logout () {
            this.$store.dispatch('logout')
        }
    },
    data: () => ({
        categories: null,
        drawer: null,
  }),
};
</script>
