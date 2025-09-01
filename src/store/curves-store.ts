import { CurveModel } from '@/model/curve-model';
import { CurveSumModel } from '@/model/curve-sum';
import { TCurve } from '@/model/curves/curves';
import { useEventBus } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useCurves = defineStore('curves', () => {

	// map curves by curve label.
	const curves = ref(new Map<string, CurveModel>());

	const newEvent = useEventBus<'newcurve', CurveModel>('newcurve');
	const deleteEvent = useEventBus<'deletecurve', CurveModel>('deletecurve');

	let nextId: number = 1;

	/**
	 * remove all curves.
	 */
	function deleteAll() {
		for (const m of curves.value.entries()) {
			deleteEvent.emit('deletecurve', m as any as CurveModel);
		}
		curves.value.clear();
	}

	function add(m: CurveModel) {
		curves.value.set(m.id, m);
		newEvent.emit('newcurve', m);
		return m;
	}

	function remove(m: CurveModel) {
		curves.value.delete(m.id);
		deleteEvent.emit('deletecurve', m);
	}

	function createSum(c1: TCurve, c2: TCurve) {
		return add(new CurveSumModel({
			curveA: c1, curveB: c2
		}));
	}

	function createDiff(c1: TCurve, c2: TCurve) {
		return add(new CurveSumModel({
			curveA: c1, curveB: c2, B: -1
		}));
	}


	return {

		add,
		remove,
		curves,
		deleteAll,
		createSum,
		createDiff,
		uniqueName() {
			return `Curve ${nextId++}`;
		}

	}

});
