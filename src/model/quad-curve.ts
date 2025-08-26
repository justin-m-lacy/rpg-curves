import { Curve } from "@/model/curves";

/**
 * implements Ax^2 + Bx + C
 */
export class QuadCurve extends Curve {

	public A: number;
	public B: number;
	public C: number;

	constructor(opts?: { name: string, a: number, b: number, c: number }) {

		super(opts);
		this.A = opts?.a ?? 1;
		this.B = opts?.b ?? 1;
		this.C = opts?.c ?? 1;

	}

	init() {

		this.params.push(
			{
				prop: 'A',
				desc: 'Ax^2 + Bx + C',
			},
			{
				prop: 'B',
				desc: 'Ax^2 + Bx + C',
			},
			{
				prop: 'C',
				desc: 'Ax^2 + Bx + C',
			}
		)
	}


	plot(x: number) {
		return x * (this.A * x + this.B) + this.C;
	}

}