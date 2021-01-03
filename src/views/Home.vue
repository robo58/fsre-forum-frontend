<template>
	<v-container fluid>
		<v-card class="py-4">
			<v-row>
				<v-col sm="4" cols="10" offset="2" offset-sm="0">
					<v-card-title>
						Popular themes
					</v-card-title>
				</v-col>
				<v-col sm="6" cols="10" offset="1" offset-sm="0">
					<v-text-field
							label="Search themes..."
							append-icon="mdi-magnify"
							v-model="searchThemes"
							single-line
					></v-text-field>
				</v-col>
			</v-row>
            <v-card-actions>
                <v-row>
                    <v-col>
                        <v-list two-line>
                            <v-list-item-group>
                                <v-list-item v-for="theme in filteredThemes" :key="theme.id" :to="'/categories/'+theme.category_id+'/themes/'+theme.id">
                                    <v-list-item-content>
                                        <v-list-item-title>{{ theme.name }}</v-list-item-title>

                                        <v-list-item-subtitle class="py-3">{{ theme.post_count }} posts</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-col>
                </v-row>
            </v-card-actions>
		</v-card>

	</v-container>
</template>

<script>
    // @ is an alias to /src

    export default {
        name: 'Home',
        created() {
          this.axios.get('/themes').then(response=>{
              this.themes = response.data.data;
          })
        },
        computed:{
          filteredThemes(){
              let filtered = [];
                for(let i=0;i<this.themes.length;i++){
                    if(this.searchThemes === '' || this.themes[i].name.toLowerCase().includes(this.searchThemes.toLowerCase())){
                        filtered.push(this.themes[i]);
                    }
                }
             return filtered;
          }
        },
        data: () => ({
            themes: [],
            searchThemes: '',
        }),
    }
</script>
