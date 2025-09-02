import { defineStore } from 'pinia';

/**
 * select app page to view.
 * pseudo-router
 */
export const useSection = defineStore('section', () => {

	// section being viewed.
	const section = ref<string>();

	function view(page: string) {
		section.value = page;
	}

	return {

		section,
		view,

	}

});