import { CurveModel } from '@/model/curve-model';
import { CurveCreator } from '@/model/curves';
import { defineStore } from 'pinia';

export const useCreators = defineStore('curve', () => {

	const creators = new Map<string, CurveCreator<any>>();

	function register(...params: CurveCreator<any>[]) {
		for (const c of params) {
			creators.set(c.type, c);
		}
	}

	function create(type: string, label: string) {
		const creator = creators.get(type);
		if (!creator) return undefined;

		const curve = creator.create();
		curve.type = type;

		return new CurveModel({ label, curve, params: creator.params, });

	}

	return {
		create,
		register,
		get creators() { return Array.from(creators.values()) },
		get types() { return Array.from(creators.keys()) }
	}

});