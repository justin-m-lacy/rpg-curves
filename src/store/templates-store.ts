import { DataTemplate } from '@/model/data-template';
import { defineStore } from 'pinia';

export const useTemplates = defineStore('templates', () => {

	const templates = ref<Record<string, DataTemplate>>(Object.create(null));

	function create(id: string): DataTemplate {

		return {
			id,
			curves: Object.create(null)
		}

	}

	return {
		templates,
		create
	}


});