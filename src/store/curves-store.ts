import { CurveModel } from '@/model/curve-model';
import { defineStore } from 'pinia';
export const useCurves = defineStore('curves', () => {

	// map curves by curve label.
	const curves = ref(new Map<string, CurveModel>());

	const selected = ref(new Set<CurveModel>());

	/**
	 * @param model 
	 * @param multi - whether to add to multiple selection.
	 */
	function select(model: CurveModel, multi: boolean = false) {
		if (!multi) {
			selected.value.clear();
		}
		selected.value.add(model);
	}

	function deselect(model: CurveModel) {
		selected.value.delete(model);
	}

	function clearSelected() {
		selected.value.clear();
	}

	function isSelected(c: CurveModel) {
		return selected.value.has(c);
	}
	/**
	 * remove all curves.
	 */
	function deleteAll() {
		curves.value.clear();
		selected.value.clear();
	}

	return {

		select,
		deselect,
		clearSelected,
		get selected(): CurveModel[] {
			return Array.from(selected.value.values()) as CurveModel[];
		},
		curves,
		deleteAll,
		isSelected

	}

});
