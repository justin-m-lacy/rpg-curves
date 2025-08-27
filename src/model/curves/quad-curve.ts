import { CurveBase } from "@/model/curve-base";

/**
 * implements Ax^2 + Bx + C
 */
export class QuadCurve extends CurveBase {

	public A: number = 1;
	public B: number = 1;
	public C: number = 1;

	constructor() {
		super();
	}

	map(x: number) {
		return x * (this.A * x + this.B) + this.C;
	}

}