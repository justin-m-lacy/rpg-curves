import { DataTemplate } from '@/model/data-template';
import { defineStore } from 'pinia';

export const useTemplates = defineStore('templates', () => {

	const templates = ref<Record<string, DataTemplate>>(Object.create(null));

	// data template being viewed.
	const viewed = ref<DataTemplate | null>(null);

	let nextId: number = 1;
	function uniqueName(base: string) {
		return `${base}${nextId++}`;
	}

	function create(name?: string): DataTemplate {

		return {
			name: name?.length ? name : uniqueName('template'),
			id: window.crypto.randomUUID(),
			curves: Object.create(null)
		}

	}

	function add(temp: DataTemplate) {
		templates.value[temp.id] = temp;
		viewed.value = temp;
	}

	function remove(temp: DataTemplate) {
		delete templates.value[temp.id];
	}

	return {
		viewed,
		templates,
		create,
		remove,
		add
	}


});