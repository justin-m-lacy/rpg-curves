import { CurveBase } from "@/model/curves/curve-base";

export class LogNCurve extends CurveBase {

	static type = 'logN';

	public A: number = 1;
	public B: number = 1;
	public C: number = 1;
	public N: number = 3;

	get formula() {
		return '{A} * log{N}({B}*X) + C'
	}

	constructor() {
		super(LogNCurve.type);
	}

	map(x: number) {
		return this.A * Math.log(this.B * x) / Math.log(this.N) + this.C;
	}

}

export class Log2Curve extends CurveBase {

	static type = 'log2';

	public A: number = 1;
	public B: number = 1;
	public C: number = 1;

	get formula() {
		return '{A} * log2({B}*X) + C'
	}

	constructor() {
		super(Log2Curve.type);
	}

	map(x: number) {
		return this.A * Math.log2(this.B * x) + this.C;
	}

}

export class Log10Curve extends CurveBase {

	static type = 'log10';

	public A: number = 1;
	public B: number = 1;
	public C: number = 1;

	get formula() {
		return '{A} * log10({B}*X) + C'
	}

	constructor() {
		super(Log10Curve.type);
	}

	map(x: number) {
		return this.A * Math.log10(this.B * x) + this.C;
	}

}

export class LnCurve extends CurveBase {

	static type = 'ln';

	public A: number = 1;
	public B: number = 1;
	public C: number = 1;

	get formula() {
		return '{A} * ln({B}*X) + C'
	}

	constructor() {
		super(LnCurve.type);
	}

	map(x: number) {
		return this.A * Math.log(this.B * x) + this.C;
	}

}