import { DataTemplate } from '@/model/data-template';
import { useCurves } from '@/store/curves-store';
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

	/**
	 * 
	 * @param temp - template to generate.
	 * @param input - input to template curves.
	 */
	function generate(temp: DataTemplate, input: number) {

		const curveStore = useCurves();
		const item = Object.create(null);
		for (const k in temp.curves) {

			const curve = curveStore.curves[k];
			if (!curve) continue;

			const data = temp.curves[k];
			item[curve.label] = curve.map(input);

		}

		return item;

	}

	return {
		viewed,
		templates,
		create,
		remove,
		add,
		generate
	}


});