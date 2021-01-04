<template>
    <v-row>
        <v-col>
            <v-card-text>
                <b>Username:</b> {{ user.name }}
                <br><br>
                <b>Email:</b> {{user.email}}
                <br><br>
                <b>Joined at:</b> {{user.created_at}}
                <br><br>
                <b>Post count:</b> {{ user.post_count }}
                <br><br>
                <b>Comment count:</b> {{ user.comment_count }}
            </v-card-text>
        </v-col>
    </v-row>

</template>

<script>
    export default {
        name: "UserProfile",
        props:{
            user: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style scoped>

</style>
