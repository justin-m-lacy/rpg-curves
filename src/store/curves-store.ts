import { CurveModel } from '@/model/curves/curve-model';
import { defineStore } from 'pinia';
export const useCurves = defineStore('curves', () => {

	// map curves by curve label.
	const curves = ref(new Map<string, CurveModel>());
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

	function clearSelected() {
		selected.value = [];
	}

	function isSelected(c: CurveModel) {
		return selected.value.some(v => v.id == c.id);
	}

	/**
	 * remove all curves.
	 */
	function deleteAll() {
		curves.value.clear();
		selected.value = [];
	}

	function add(m: CurveModel) {
		curves.value.set(m.id, m);
	}

	function remove(c: CurveModel) {

		const ind = selected.value.findIndex(v => v.id == c.id);
		if (ind) {
			selected.value.splice(ind, 1);
		}
		curves.value.delete(c.id)
	}

	let nextId: number = 1;

	return {

		select,
		deselect,
		clearSelected,
		selected,
		add,
		remove,
		curves,
		deleteAll,
		isSelected,
		uniqueName() {
			return `Curve ${nextId++}`;
		}

	}

});
