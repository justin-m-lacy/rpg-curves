import { CurveModel } from "@/model/curve-model";
import { CurveParam, TCurve } from "@/model/curves/curves";

/**
 * Implements linear combination of two curves, A*C1 + B*C2
 */
export class CurveSumModel extends CurveModel {

	get type() { return 'curvesum' }

	private curveA: TCurve;
	private curveB: TCurve;

	A: number = 1;
	B: number = 1;

	get label(): string {
		return this._label.length > 0 ? this.label :
			(this.curveA?.label ?? this.curveA.type) +
			(this.A < 0 || this.B < 0 ? ' - ' : ' + ') + (this.curveB?.label ?? this.curveB.type)
	}
	get formula() {
		return '{A}*curveA + {B}*curveB'
	}

	constructor(opts: {
		curveA: TCurve,
		curveB: TCurve,
		id?: string,
		label?: string,
		color?: string,
		A?: number,
		B?: number,
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
		this.curveB = opts.curveB;
		this.setCurve(this);


		this.addParam({
			prop: 'A',
			value: opts.A ?? 1
		});
		this.addParam({
			prop: 'B',
			value: opts.B ?? 1
		})

	}

	map(x: number) {
		return this.A * this.curveA.map(x) + this.B * this.curveB.map(x);
	}

}