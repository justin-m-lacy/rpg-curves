import { CurveParam, TCurve } from "@/model/curves/curves";

export class CurveModel {

	toJSON() {
		return {
			label: this.label,
			type: this._curve.type,
			params: this.params
		}
	}

	readonly id: string;

	get type() { return this._curve.type }

	private _curve: TCurve<object>;

	readonly params: Record<string, CurveParam> = {};

	get label() { return this._label }
	set label(v) { this._label = v }
	protected _label: string;

	get formula() {
		return this._curve.formula
	}

	color?: string;

	constructor(opts: {
		id?: string,
		label?: string,
		color?: string,
		curve: TCurve<object>,
		params?: CurveParam[]
	}) {

		this.id = opts.id ?? window.crypto.randomUUID();

		this.color = opts.color;
		this._curve = opts.curve; // typescript complaint
		this._label = opts.label ?? 'new curve';
		this.setCurve(opts.curve, opts.params);

	}

	isValidParam(param: CurveParam) {
		return param.prop in this._curve;
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
		for (const prop in this.params) {
			if ((prop in c) && typeof c[prop] == 'number') {
				c[prop] = this.params[prop].value;
			}
		}

		if (newParams) {
			for (const cp of newParams) {
				this.addParam(cp);
			}
		}

	}

	mapDomain(xvals: number[]) {
		return xvals.map(x => this.map(x))
	}
	map(x: number): number { return this._curve.map(x) }

	getParamValue(prop: string) {

		if (prop in this._curve &&
			typeof this._curve[prop as keyof typeof this._curve] == 'number') {
			return this._curve[prop as keyof typeof this._curve] as any as number;
		}
		return undefined;

	}

	/**
	 * Set matching params from list. invalid parameters are ignored.
	 * @param arr 
	 */
	setParams(arr: { prop: string, value: number }[]) {
		arr.forEach(v => this.setParam(v.prop, v.value));
	}

	/**
	 * set parameter value.
	 * @param prop 
	 * @param value 
	 * @returns 
	 */
	setParam(prop: string, value: number) {
		const param = this.params[prop];
		if (!param) return;
		(this._curve as any)[prop] = param.value = value;
	}

	/**
	 * If param does not yet exist on model, adds a clone to this params.
	 * Sets curve's current property value to parameter value.
	 * @param p - original param.
	 * @returns this new or preexisting parameter.
	 */
	addParam(p: CurveParam) {

		const cp = this.params[p.prop] ?? { ...p };
		this.params[p.prop] = cp;

		// avoid typescript complaint
		const curve = this._curve as TCurve<any>
		if ((p.prop in curve) && (typeof curve[p.prop] === 'number')) {
			curve[p.prop] = cp.value;
		}
		return cp;

	}

	removeParam(prop: string | CurveParam) {
		if (typeof prop !== 'string') prop = prop.prop;
		delete this.params[prop];
	}

}