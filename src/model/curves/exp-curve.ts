import { CurveBase } from "@/model/curves/curve-base";

/**
 * Implements A*10^(Bx) + C
 */
export class ExpCurve extends CurveBase {

	public A: number = 1;
	public B: number = 0.1;
	public C: number = 1;

	get formula() {
		return '{A}10^({B}x) + {C}'
	}

	constructor() {
		super('exp');
	}

	map(x: number) {
		return this.A * Math.exp(Math.LN10 * this.B * x) + this.C;
	}

}

/**
 * implements Ae^(Bx) + C
 */
export class NatExpCurve extends CurveBase {

	public A: number = 1;
	public B: number = 0.1;
	public C: number = 1;

	get formula() {
		return '{A}e^({B}x) + {C}'
	}

	constructor() {

		super('natexp');

	}

	map(x: number) {
		return this.A * Math.exp(this.B * x) + this.C;
	}

}