import { defineStore } from 'pinia';

/**
 * select app page to view.
 * pseudo-router
 */
export const useSection = defineStore('section', () => {

	// section being viewed.
	const section = ref<'curves' | 'templates'>('curves');

	function view(page: 'curves' | 'templates') {
		section.value = page;
	}

	return {

		section,
		view,

	}

});