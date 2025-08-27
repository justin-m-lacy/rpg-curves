import { CurveBase } from "@/model/curves/curve-base";

/**
 * implements Ax + C
 */
export class LinearCurve extends CurveBase {

	public A: number = 1;
	public C: number = 1;

	constructor() {
		super();
	}

	map(x: number) {
		return this.A * x + this.C;
	}

}