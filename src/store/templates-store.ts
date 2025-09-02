import { DataTemplate } from '@/model/data-template';
import { defineStore } from 'pinia';

export const useTemplates = defineStore('templates', () => {

	const templates = ref<Record<string, DataTemplate>>(Object.create(null));

	// data template being viewed.
	const viewed = ref<DataTemplate | null>(null);


	function create(name: string): DataTemplate {

		return {
			name,
			id: window.crypto.randomUUID(),
			curves: Object.create(null)
		}

	}

	function remove(temp: DataTemplate) {

		delete templates.value[temp.id];

	}

	return {
		viewed,
		templates,
		create,
		remove
	}


});