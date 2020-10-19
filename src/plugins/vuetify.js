import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
	theme: {
		options: { customProperties: true },
		themes: {
			light: {
				primary: '#4285F4',
				secondary: '#424242',
				accent: '#82B1FF',
				error: '#ff4444',
				info: '#33b5e5',
				success: '#00C851',
				warning: '#ffbb33',
				background: '#edf2f6',
			},
			dark: {
				primary: '#BB86FC',
				secondary: '#03DAC6',
				error: '#CF6679',
				background: '#121212',
			},
		},
	},
});
