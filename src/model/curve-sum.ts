import { CurveModel } from "@/model/curve-model";
import { CurveParam, TCurve } from "@/model/curves/curves";

/**
 * Implements sum of two curves, A*C1 + B*C2
 */
export class CurveSumModel extends CurveModel {

	get type() { return 'curvesum' }

	private curveA: TCurve<object>;
	private curveB: TCurve<object>;

	A: number = 1;
	B: number = 1;

	constructor(opts: {
		id?: string,
		label?: string,
		color?: string,
		A: number,
		B: number,
		curveA: CurveModel,
		curveB: CurveModel,
		params?: CurveParam[]
	}) {

		super({
			id: opts.id,
			label: opts.label,
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