<template>
	<v-card>
		<v-snackbar
			:timeout="3000"
			:value="errorPopup"
			shaped
			top
			color="error"
		>
			An Error Occurred
		</v-snackbar>
		<v-card-title color="primary">
			To Do
		</v-card-title>
		<TaskInput @createTask="createTask" />
		<v-data-table
			v-model="selected"
			:items="tasks"
			:headers="headers"
			item-key="_id"
			show-select
			class="elevation-1"
		>
			<template v-slot:top>
				<v-row class="mb-3">
					<v-col
						cols="4"
						:style="{ display: 'flex', justifyContent: 'center' }"
					>
						<v-btn color="error">
							<v-icon>mdi-delete</v-icon>
							Delete Selected
						</v-btn>
					</v-col>
					<v-col
						cols="4"
						:style="{ display: 'flex', justifyContent: 'center' }"
					>
						<v-menu offset-y>
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									color="secondary"
									dark
									v-bind="attrs"
									v-on="on"
								>
									Move To
								</v-btn>
							</template>
							<v-list>
								<v-list-item
								link
								@click="moveItems"
								>
									<v-list-item-title>Done</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
					</v-col>
				</v-row>
			</template>
		</v-data-table>
	</v-card>
</template>

<script>
import TaskInput from './TaskInput';
import http from '../services/httpService';
export default {
	components: {
		TaskInput,
	},
	props: {
		tasks: {
			type: Array,
		},
	},
	data() {
		return {
			errorPopup: false,
			selected: [],
			headers: [
				{ text: 'Task', value: 'name' },
				{ text: 'when to do it', value: 'whenToDo' },
			],
		};
	},
	methods: {
		async createTask(obj) {
			let response = await http.post('/tasks/createNewTask', obj);
			console.log(response);
			if (response.ok) {
				this.tasks.push(response.ops[0]);
			} else {
				this.errorPopup = true;
			}
		},
		moveItems(){
			console.log(this.selected)
		}
	},
	watch: {
		date() {
			console.log(this.date);
		},
		selected() {
			console.log(this.selected);
		},
	},
};
</script>

<style lang="scss">
.v-date-picker-table .v-btn {
	background: var(--v-primary-text) !important;
	& :active {
		background: var(--v-primary);
	}
}
.dp-btn-color {
	background: var(--v-primary-base) !important;
}
</style>
