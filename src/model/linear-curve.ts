import { Curve } from "@/model/curves";

/**
 * implements Ax + C
 */
export class LinearCurve extends Curve {

	public A: number;
	public C: number;

	constructor(opts?: { name: string, a: number, c: number }) {

		super(opts);
		this.A = opts?.a ?? 1;
		this.C = opts?.c ?? 1;

	}

	plot(x: number) {
		return this.A * x + this.C;
	}

}