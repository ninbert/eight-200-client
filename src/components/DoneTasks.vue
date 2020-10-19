<template>
	<v-card>
		<v-card-title color="primary">
			Done
		</v-card-title>
		<v-data-table
			v-model="selected"
			:items="tasks"
			:headers="headers"
			item-key="_id"
			show-select
		>
			<template v-slot:top>
				<v-row class="mb-3">
					<v-col
						cols="4"
						:style="{ display: 'flex', justifyContent: 'center' }"
					>
						<v-btn color="error" @click="removeTasks">
							<v-icon>mdi-delete</v-icon>
							Delete Selected
						</v-btn>
					</v-col>
				</v-row>
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
export default {
	props: {
		tasks: {
			type: Array,
		},
	},
	data() {
		return {
			selected: [],
			headers: [
				{ text: 'Task', value: 'name' },
				{ text: 'when to do it', value: 'whenToDo' },
				{text:'actions',value:'actions'}
			],
		};
	},
	methods: {
		removeTasks() {
			this.$emit('removeTasks', {
				selected: this.selected,
				status: 'DONE',
			});
		},
		removeOneTask(id){
			this.$emit('removeTasks', {
				selected: [id],
				status: 'DONE',
			});
		}
	},
};
</script>

<style></style>
