import { CurveBase } from "@/model/curves/curve-base";

export class Exp10Curve extends CurveBase {

	static type = 'exp10';

	public A: number = 1;
	public B: number = 0.1;
	public C: number = 1;

	get formula() {
		return '{A}*10^({B}X) + {C}'
	}

	constructor() {
		super(Exp10Curve.type);
	}

	map(x: number) {
		return this.A * Math.pow(10, this.B * x) + this.C;
	}

}

export class Exp2Curve extends CurveBase {

	static type = 'exp2';

	public A: number = 1;
	public B: number = 0.1;
	public C: number = 1;

	get formula() {
		return '{A}*2^({B}X) + {C}'
	}

	constructor() {
		super(Exp2Curve.type);
	}

	map(x: number) {
		return this.A * Math.pow(2, this.B * x) + this.C;
	}

}

export class ExpNCurve extends CurveBase {

	static type = 'expN';

	public A: number = 1;
	public B: number = 0.1;
	public C: number = 1;
	public N: number = 3;

	get formula() {
		return '{A}*{N}^({B}X) + {C}'
	}

	constructor() {
		super(ExpNCurve.type);
	}

	map(x: number) {
		return this.A * Math.pow(this.N, this.B * x) + this.C;
	}

}

export class NatExpCurve extends CurveBase {

	static type = 'natexp';

	public A: number = 1;
	public B: number = 0.1;
	public C: number = 1;

	get formula() {
		return '{A}*e^({B}X) + {C}'
	}

	constructor() {

		super(NatExpCurve.type);

	}

	map(x: number) {
		return this.A * Math.exp(this.B * x) + this.C;
	}

}