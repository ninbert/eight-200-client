<template>
	<v-form
		class="mt-0 pt-0 ps-3 pe-3"
		ref="form"
		lazy-validation
	>
		<v-container>
			<v-row>
				<v-col cols="8">
					<v-text-field
						required
						label="What Is Your Task?"
						v-model="taskTitle"
						:rules="[rules.required]"
						@keyup.enter="createTask"
					></v-text-field>
				</v-col>
				<v-col cols="4">
					<v-menu
						ref="menu"
						v-model="menu"
						:close-on-content-click="false"
						:return-value.sync="date"
						transition="scale-transition"
						offset-y
						min-width="290px"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								:rules="[rules.required]"
								v-model="date"
								label="Choose Date"
								prepend-icon="mdi-calendar"
								readonly
								v-bind="attrs"
								v-on="on"
							></v-text-field>
						</template>
						<v-date-picker v-model="date" no-title scrollable>
							<v-btn
								text
								class="dp-btn-color-clear"
								@click="date = ''"
							>
								Clear
							</v-btn>
							<v-spacer></v-spacer>
							<v-btn
								class="dp-btn-color-cancel"
								text
								@click="
									menu = false;
									date = '';
								"
							>
								Cancel
							</v-btn>
							<v-btn
								text
								class="dp-btn-color"
								@click="$refs.menu.save(date)"
							>
								OK
							</v-btn>
						</v-date-picker>
					</v-menu>
				</v-col>
			</v-row>
		</v-container>
	</v-form>
</template>

<script>
export default {
	data() {
		return {
			taskTitle: '',
			date: '',
			menu: false,
			rules: {
				required: (value) => !!value || 'required',
			},
		};
	},
	methods: {
		createTask() {
			if (this.$refs.form.validate()) {
				let obj = {};
				obj.name = this.taskTitle;
				obj.whenToDo = this.date;
				this.$emit('createTask', obj);
			}
		},
	},
};
</script>

<style></style>
