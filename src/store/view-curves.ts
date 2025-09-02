import { CurveModel } from '@/model/curve-model';
import { useCurves } from '@/store/curves-store';
import { useEventBus } from '@vueuse/core';
import { defineStore } from 'pinia';

/**
 * select curves to view.
 */
export const useViewCurves = defineStore('viewcurves', () => {

	const viewing = ref<CurveModel[]>([]);

	useEventBus<'newcurve', CurveModel>('newcurve').on((_, m) => {
		if (m) view(m);
	});
	useEventBus<'deletecurve', CurveModel>('deletecurve').on((_, m) => {
		if (m) unview(m);
	});


	watch(() => useCurves().curves, (curves) => {

		// check for removed views.
		for (const model of viewing.value) {
			if (!curves[model.id]) {
				unview(model as CurveModel);
			}
		}
	});

	/**
	 * @param model 
	 * @param multi - whether to add to multiple selection.
	 */
	function view(model: CurveModel) {
		viewing.value.push(model);
	}

	function unview(model: CurveModel) {
		const ind = viewing.value.findIndex(v => v.id == model.id);
		if (ind >= 0) {
			viewing.value.splice(ind, 1);
		}
	}

	function clear() {
		viewing.value = [];
	}

	function isViewed(c: CurveModel) {
		return viewing.value.some(v => v.id == c.id);
	}

	return {

		view,
		viewing,
		unview,
		clear,
		isViewed,


	}
});