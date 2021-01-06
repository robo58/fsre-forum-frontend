<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="12" sm="12">
                <v-card class="mx-4 py-6">
                    <v-card-title>Admin dashboard</v-card-title>
                    <v-tabs
                        v-model="tab"
                        fixed-tabs
                    >
                        <v-tab
                            v-for="item in tabs"
                            :key="item.tab"
                            class="mx-4"
                        >
                            {{ item.tab }}
                        </v-tab>
                    </v-tabs>
                    <v-divider></v-divider>
                    <div class="mx-4 my-4">
                        <v-tabs-items v-model="tab">
                            <v-tab-item
                                v-for="item in tabs"
                                :key="item.tab"
                            >
                                <component v-bind:is="item.content"></component>
                            </v-tab-item>
                        </v-tabs-items>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import CategoriesComponent from "../components/CategoriesComponent";
    import ThemesComponent from "../components/ThemesComponent";
    import UsersComponent from "../components/UsersComponent";
    import PostsComponent from "../components/PostsComponent";

    export default {
        name: "Dashboard",
        components: {CategoriesComponent, UsersComponent, ThemesComponent, PostsComponent},
        created() {

        },
        computed:{

        },
        data: ()=> ({
            tab: null,
            tabs: [
                { tab: 'Users', content: 'UsersComponent' },
                { tab: 'Categories', content: 'CategoriesComponent' },
                { tab: 'Themes', content: 'ThemesComponent' },
                { tab: 'Posts', content: 'PostsComponent' },
            ],
        }),
    }
</script>

<style scoped>

</style>
