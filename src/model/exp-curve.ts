import { Curve } from "@/model/curves";

/**
 * Implements A*10^(Bx) + C
 */
export class ExpCurve extends Curve {

	public A: number;
	public B: number;
	public C: number;

	constructor(opts: { name: string, a: number, b: number, c: number }) {

		super(opts);

		this.A = opts.a;
		this.B = opts.b;
		this.C = opts.c;

	}

	init() {

		this.params.push(
			{
				prop: 'A',
				desc: 'A*10^(Bx) + C',
			},
			{
				prop: 'B',
				desc: 'A*10^(Bx) + C',
			},
			{
				prop: 'C',
				desc: 'A*10^(Bx) + C',
			}
		)
	}

	plot(x: number) {
		return this.A * Math.exp(Math.LN10 * this.B * x) + this.C;
	}

}

/**
 * implements Ae^(Bx) + C
 */
export class NatExpCurve extends Curve {

	public A: number;
	public B: number;
	public C: number;

	constructor(opts: { name: string, a: number, b: number, c: number }) {

		super(opts);
		this.A = opts.a;
		this.B = opts.b;
		this.C = opts.c;

	}

	init() {

		this.params.push(
			{
				prop: 'A',
				desc: 'A*e^B*x + C',
			},
			{
				prop: 'B',
				desc: 'A*e^B*x + C',
			},
			{
				prop: 'C',
				desc: 'A*e^B*x + C',
			}
		)
	}

	plot(x: number) {
		return this.A * Math.exp(this.B * x) + this.C;
	}

}