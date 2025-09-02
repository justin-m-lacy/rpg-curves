import { CurveBase } from "@/model/curves/curve-base";

/**
 * implements Ax^2 + Bx + C
 */
export class QuadCurve extends CurveBase {

	static type = 'quad';

	public A: number = 1;
	public B: number = 1;
	public C: number = 1;

	get formula() {
		return '{A}x^2 + {B}x + {C}'
	}


	constructor() {
		super(QuadCurve.type);
	}

	map(x: number) {
		return x * (this.A * x + this.B) + this.C;
	}

}