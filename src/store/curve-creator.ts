import { CurveCreator } from '@/model/curve-factory';
import { Curve } from '@/model/curves';
import { defineStore } from 'pinia';

export const useCurveCreator = defineStore('curve', () => {

	const creators = new Map<string, CurveCreator<any>>();

	function register(...params: CurveCreator<any>[]) {
		for (const c of params) {
			creators.set(c.type, c);
		}
	}

	function create<T extends Curve>(type: string) {
		return creators.get(type)?.create() as T;
	}

	return {
		create,
		register
	}

});