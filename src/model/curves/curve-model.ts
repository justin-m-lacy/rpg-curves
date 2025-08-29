import { CurveParam, TCurve } from "@/model/curves/curves";

export class CurveModel {

	toJSON() {
		return {
			label: this.label,
			type: this._curve.type,
			params: this.params.map(v => ({
				prop: v.prop,
				value: v.value,
			}))
		}
	}

	label: string;

	readonly id: string;

	get type() { return this._curve.type }

	get curve() { return this._curve }
	private _curve: TCurve<object>;

	readonly params: CurveParam[] = [];

	constructor(opts: { id?: string, label?: string, curve: TCurve<object>, params?: CurveParam[] }) {

		this.id = opts.id ?? window.crypto.randomUUID();

		this._curve = opts.curve; // typescript complaint
		this.setCurve(opts.curve, opts.params);
		this.label = opts.label ?? 'new curve';

	}

	/**
	 * 
	 * @param c - new curve type.
	 * @param newParams - newParams to add for curve if any. old
	 * params are not removed, in case user switches back and forth
	 * between curve types.
	 */
	setCurve(c: TCurve<any>, newParams?: CurveParam[]) {

		this._curve = c;
		for (const cp of this.params) {
			if ((cp.prop in c) && typeof c[cp.prop] == 'number') {
				c[cp.prop] = cp.value;
			}
		}

		if (newParams) {
			for (const cp of newParams) {
				this.addParam(cp);
			}
		}

	}

	map(x: number): number { return this._curve.map(x) }

	/**
	 * Adds a clone of the curve param to this params.
	 * @param p - original param.
	 * @returns existing matching param, or cloned param
	 * added to this curve.
	 */
	addParam(p: CurveParam) {

		let cp = this.params.find(v => v.prop == p.prop);
		if (!cp) {
			cp = { ...p };
			this.params.push(cp);
		}
		// avoid typescript complaint
		const curve = this._curve as TCurve<any>
		if ((cp.prop in curve) && (typeof curve[cp.prop] === 'number')) {
			cp.value = curve[cp.prop];
		}
		return cp;

	}

	removeParam(prop: string | CurveParam) {

		if (typeof prop !== 'string') prop = prop.prop;
		const ind = this.params.findIndex(v => v.prop == prop);
		if (ind >= 0) this.params.splice(ind, 1);

	}

}