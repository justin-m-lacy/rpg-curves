import { CurveModel } from '@/model/curve-model';
import { TCurve } from '@/model/curves/curves';
import { CurveSumModel } from '@/model/models/curve-sum';
import { useEventBus } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useCurves = defineStore('curves', () => {

	// map curves by internal curve id.
	const curves = ref<Record<string, CurveModel>>(Object.create(null));

	const newEvent = useEventBus<'newcurve', CurveModel>('newcurve');
	const deleteEvent = useEventBus<'deletecurve', CurveModel>('deletecurve');

	let nextId: number = 1;

	/**
	 * remove all curves.
	 */
	function deleteAll() {
		for (const k in curves.value) {
			deleteEvent.emit('deletecurve', curves.value[k] as any as CurveModel);
		}
		curves.value = Object.create(null);
	}

	function add(m: CurveModel) {
		curves.value[m.id] = m;
		newEvent.emit('newcurve', m);
		return m;
	}

	function remove(m: CurveModel) {
		delete curves.value[m.id];
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

	function find(label: string) {

		const all = curves.value;
		for (const k in all) {
			if (all[k].label == label) {
				return all[k];
			}
		}
		return undefined;

	}

	return {

		add,
		remove,
		curves,
		deleteAll,
		createSum,
		createDiff,
		find,
		uniqueName() {
			return `Curve ${nextId++}`;
		}

	}

});
