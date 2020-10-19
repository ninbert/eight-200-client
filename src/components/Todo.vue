<template>
	<v-card>
		<v-snackbar :value="snack" shaped top :color="snackColor">
			{{ success ? 'Data Updated' : 'An Error Occurred' }}
			<template v-slot:action="{ attrs }">
				<v-btn v-bind="attrs" text @click="snack = false">
					Close
				</v-btn>
			</template>
		</v-snackbar>
		<v-card-title :style="titleColor">
			{{ this.done ? 'Done ' : 'To Do' }}
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
						<v-btn
							:disabled="selected.length == 0"
							color="error"
							@click="removeTasks"
						>
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
									:disabled="selected.length == 0"
									color="secondary"
									dark
									v-bind="attrs"
									v-on="on"
								>
									Move To
								</v-btn>
							</template>
							<v-list>
								<v-list-item link @click="moveItems">
									<v-list-item-title>{{
										done ? 'To Do' : 'Done'
									}}</v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
					</v-col>
				</v-row>
			</template>
			<template v-slot:item.name="props">
				<v-edit-dialog :return-value.sync="props.item.name">
					{{ props.item.name }}
					<template v-slot:input>
						<v-text-field
							v-model="props.item.name"
							label="Edit"
							single-line
							counter
							@keyup.enter="
								editTask({
									name: props.item.name,
									_id: props.item._id,
									whenToDo: props.item.whenToDo,
								})
							"
						></v-text-field>
					</template>
				</v-edit-dialog>
			</template>

			<template v-slot:item.whenToDo="{item}">
				<v-edit-dialog ref="editDialog">
					{{item.whenToDo}}
					<template v-slot:input>
						<v-date-picker v-model="item.whenToDo" no-title scrollable>
							<v-btn
								text
								
								@click="closeDialog"
							>
								Close
							</v-btn>
							<v-spacer></v-spacer>
							<v-btn
								text
								class="dp-btn-color"
								@click="saveDate({_id:item._id,whenToDo:item.whenToDo,name:item.name})"
							>
								OK
							</v-btn>
						</v-date-picker>
					</template>
				</v-edit-dialog>
			</template>
			<template v-slot:item.actions="{ item }">
				<v-icon small @click="removeOneTask(item)">
					mdi-delete
				</v-icon>
			</template>
		</v-data-table>
	</v-card>
</template>

<script>
import TaskInput from './TaskInput';
import http from '../services/httpService';
import moment from 'moment'

export default {
	components: {
		TaskInput,
	},
	props: {
		tasks: {
			type: Array,
		},
		done: {
			type: Boolean,
		},
	},
	data() {
		return {
			success: false,
			snack: false,
			errorPopup: false,
			selected: [],
			headers: [
				{ text: 'Task', value: 'name' },
				{ text: 'when to do it', value: 'whenToDo', width: 150 },
				{ text: 'actions', value: 'actions', width: 100 },
			],
		};
	},
	computed: {
		snackColor() {
			return this.success ? 'success' : 'error';
		},
		titleColor() {
			return this.done ? { color: '#00e676 !important' } : {};
		},
	},
	methods: {
		async createTask(obj) {
			console.log(obj)
			obj.status = this.done ? 'DONE' : 'NOT_DONE';
			let response = await http.post('/tasks/createNewTask', obj);
			console.log(response);
			if (response.ok) {
				this.tasks.push(response.ops[0]);
			} else {
				this.snack = true;
			}
			this.snack = false;
		},
		moveItems() {
			this.$emit('moveItems', {
				selected: this.selected,
				status: this.done ? 'DONE' : 'NOT_DONE',
			});
		},
		closeDialog(){
			this.$refs.editDialog.isActive = false
		},
		async saveDate(data){
			await this.editTask(data)
			this.$refs.editDialog.isActive = false
			
		},
		removeTasks() {
			this.$emit('removeTasks', {
				selected: this.selected,
				status: this.done ? 'DONE' : 'NOT_DONE',
			});
		},
		async editTask(data) {
			const response = await http.post('/tasks/editTask', data);
			console.log(response);
			if (response.ok) {
				this.success = true;
				this.snack = true;
			} else {
				this.snack = true;
			}
		},
		removeOneTask(item) {
			console.log(item);
			this.$emit('removeTasks', {
				selected: [item],
				status: this.done ? 'DONE' : 'NOT_DONE',
			});
		},
		log(value){
			console.log(value)
		},
		moment(date){
			return moment(date).format('DD-mmm-YY');
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
