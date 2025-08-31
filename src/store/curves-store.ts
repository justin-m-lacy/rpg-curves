import { CurveModel } from '@/model/curve-model';
import { useSelect } from '@/store/select-store';
import { defineStore } from 'pinia';

export const useCurves = defineStore('curves', () => {

	// map curves by curve label.
	const curves = ref(new Map<string, CurveModel>());

	const selects = useSelect();

	/**
	 * remove all curves.
	 */
	function deleteAll() {
		curves.value.clear();
		selects.clear;
	}

	function add(m: CurveModel) {
		curves.value.set(m.id, m);
	}

	function remove(c: CurveModel) {

		selects.deselect(c);
		curves.value.delete(c.id)
	}

	let nextId: number = 1;



	return {

		add,
		remove,
		curves,
		deleteAll,
		uniqueName() {
			return `Curve ${nextId++}`;
		}

	}

});
