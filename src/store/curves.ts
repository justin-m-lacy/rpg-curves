import { CurveModel } from '@/model/curve-model';
import { defineStore } from 'pinia';
export const useCurves = defineStore('curves', () => {

	// map curves by curve label.
	const curves = ref(new Map<string, CurveModel>());


	return {

		curves,


	}

});
