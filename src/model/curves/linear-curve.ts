import { CurveBase } from "@/model/curves/curve-base";

/**
 * implements Ax + C
 */
export class LinearCurve extends CurveBase {

	static type = 'line';

	public A: number = 1;
	public C: number = 1;

	get formula() {
		return '{A} * X + {C}'
	}

	constructor() {
		super(LinearCurve.type);
	}

	map(x: number) {
		return this.A * x + this.C;
	}

}