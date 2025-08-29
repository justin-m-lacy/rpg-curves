import { CurveModel } from '@/model/curves/curve-model';
import { defineStore } from 'pinia';

export const useSelect = defineStore('select', () => {

	const selected = ref<CurveModel[]>([]);

	/**
	 * @param model 
	 * @param multi - whether to add to multiple selection.
	 */
	function select(model: CurveModel, multi: boolean = false) {
		if (!multi) {
			selected.value = [model];
		} else {
			selected.value.push(model);
		}
	}

	function deselect(model: CurveModel) {
		const ind = selected.value.findIndex(v => v.id == model.id);
		if (ind >= 0) {
			selected.value.splice(ind, 1);
		}
	}

	function clear() {
		selected.value = [];
	}

	function isSelected(c: CurveModel) {
		return selected.value.some(v => v.id == c.id);
	}

	return {

		select,
		selected,
		deselect,
		clear,
		isSelected,


	}
});