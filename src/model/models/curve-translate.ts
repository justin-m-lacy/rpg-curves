import { CurveModel } from "@/model/curve-model";
import { CurveParam, TCurve } from "@/model/curves/curves";


export class Translate extends CurveModel {

	get type() { return 'translate' }

	private curveA: TCurve;

	T: number = 1;

	get label(): string {
		return this._label.length > 0 ? this.label :
			(this.curveA?.label ?? this.curveA.type) +
			(`( X ` + (this.T >= 0 ? '+' : '-') + ` ${this.T} )`);
	}
	get formula() {
		return 'curve( X + {T})'
	}

	constructor(opts: {
		curveA: TCurve,
		id?: string,
		label?: string,
		color?: string,
		A?: number,
		params?: CurveParam[]
	}) {

		super({
			id: opts.id,
			label: opts.label ?? '',
			curve: opts.curveA,
			color: opts.color,
			params: opts.params
		});

		this.curveA = opts.curveA;
		this.setCurve(this);

		this.addParam({
			prop: 'A',
			value: opts.A ?? 1
		});

	}

	map(x: number) {
		return this.curveA.map(x + this.T);
	}

}