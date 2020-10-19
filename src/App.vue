<template>
	<v-app ref="app" class="main-app">
		<v-app-bar app>
			<v-toolbar-title> 8200 Task Manager</v-toolbar-title>

			<v-spacer></v-spacer>
			<v-icon class="pr-3 pb-1" :style="{ fontSize: '35px' }"
				>mdi-weather-night</v-icon
			>
			<v-switch
				class="pt-4"
				color="blue"
				v-model="isDarkMode"
				@change="changeDarkMode"
			>
			</v-switch>
		</v-app-bar>
		<v-main>
			<v-container>
				<v-row v-if="gotResponse" class="mb-5">
					<v-col offset-xl="3" xs="12" sm="12" md="12" lg="12" xl="6">
						<Todo :tasks="undoneTasks" />
					</v-col>
				</v-row>
				<v-row v-if="gotResponse">
					<v-col offset-xl="3" xs="12" sm="12" md="12" lg="12" xl="6">
						<DoneTasks :tasks="doneTasks"  />
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import Todo from './components/Todo.vue';
import DoneTasks from './components/DoneTasks.vue';
import http from './services/httpService';

export default {
	components: {
		Todo,
		DoneTasks,
	},
	data() {
		return {
			isDarkMode: false,
			gotResponse: false,
			doneTasks: [],
			undoneTasks: [],
		};
	},
	async created() {
		let dark;
		if (localStorage.getItem('DarkMode') === undefined) {
			await localStorage.setItem('DarkMode', false);
			this.isDarkMode = false;
		} else {
			dark = await localStorage.getItem('DarkMode');
		}
		if (dark === 'false') {
			this.isDarkMode = false;
			this.$vuetify.theme.dark = false;
		}
		if (dark === 'true') {
			this.isDarkMode = true;
			this.$vuetify.theme.dark = true;
		}

		let response = await http.get('/tasks/getAllTasks');
			this.gotResponse = true;
		
		this.undoneTasks = response.filter((item) => item.status != 'DONE');
		this.doneTasks = response.filter((item) => item.status == 'DONE');
	},
	methods: {
		async changeDarkMode(value) {
			this.$vuetify.theme.dark = value;
			if (value === true) {
				document.documentElement.style.setProperty(
					'--v-background-base',
					'#121212'
				);
			}
			if (value === false) {
				document.documentElement.style.setProperty(
					'--v-background-base',
					'#edf2f6'
				);
			}
			await localStorage.setItem('DarkMode', value);
		},
	},
};
</script>

<style>
.v-application--wrap {
	background-color: var(--v-background-base);
	justify-content: space-between !important;
}

.v-card__title {
	color: var(--v-primary-base) !important;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
