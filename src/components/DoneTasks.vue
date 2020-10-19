<template>
	<v-card>
		<v-card-title color="primary">
			Done
		</v-card-title>
		<v-data-table
			v-model="selected"
			:items="tasks"
			:headers="headers"
			single-select
			item-key="title"
			show-select
		>
		
		</v-data-table>
	</v-card>
</template>

<script>
export default {
	props:{
		tasks:{
			type:Array
		}
	},
	data(){
		return {
			selected: [],
			headers: [
				{ text: 'Task', value: 'name' },
				{ text: 'when to do it', value: 'whenToDo' },
			],
		}
	}
};
</script>

<style></style>
