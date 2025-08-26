import { Curve } from "@/model/curves";

/**
 * implements Ax + C
 */
export class LinearCurve extends Curve {

	public A: number;
	public C: number;

	constructor(opts: { name: string, a: number, c: number }) {

		super(opts);
		this.A = opts.a;
		this.C = opts.c;

	}

	init() {

		this.params.push(
			{
				prop: 'A',
				desc: 'Ax + C',
			},
			{
				prop: 'C',
				desc: 'Ax + C',
			}
		)
	}

	plot(x: number) {
		return this.A * x + this.C;
	}

}