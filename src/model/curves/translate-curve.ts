import { CurveBase } from "@/model/curves/curve-base";
import { TCurve } from "@/model/curves/curves";

export class TranslateCurve extends CurveBase {

	static type = 'translate';

	public T: number = 1;

	public curve: TCurve;

	get formula() {
		return this.curve.formula.replaceAll('X', 'X + {T}');
	}

	constructor(curve: TCurve) {
		super(TranslateCurve.type);
		this.curve = curve;
	}

	map(x: number) {
		return this.curve.map(x + this.T);
	}

}