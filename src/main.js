import App from './App'
import Store from './store'
// #ifdef VUE3
import { createSSRApp } from 'vue'

export function createApp() {
	const app = createSSRApp(App)
	app.use(Store)
	return {
		app
	}
}
// #endif
