import { exp10Creator, exp2Creator, expNCreator, natExpCreator } from '@/model/creators/exp';
import { linearCreator } from '@/model/creators/linear';
import { quadCreator } from '@/model/creators/quad';
import { CurveModel } from '@/model/curve-model';
import { CurveCreator } from '@/model/curves/curves';
import { defineStore } from 'pinia';
import { lnCurveCreator, log10Creator, log2Creator, logNCreator } from '../model/creators/log';
import { GetColor } from './colors';

export const useCreators = defineStore('curve', () => {

	const creators = new Map<string, CurveCreator<any>>();

	let colorIndex: number = 0;
	function register(...params: CurveCreator<any>[]) {
		for (const c of params) {
			creators.set(c.type, c);
		}
	}

	function create(type: string, label: string) {
		const creator = creators.get(type);
		if (!creator) return undefined;

		const curve = creator.create();

		return new CurveModel({
			label, curve, params: creator.params,
			color: GetColor(colorIndex++)
		});

	}

	register(linearCreator,
		exp2Creator,
		exp10Creator,
		natExpCreator,
		expNCreator,
		lnCurveCreator,
		log2Creator,
		log10Creator,
		logNCreator,
		quadCreator);

	return {
		create,
		register,
		get(key: string) { return creators.get(key) },
		get creators() { return Array.from(creators.values()) },
		get types() { return Array.from(creators.keys()) }
	}

});