import { CurveBase } from "@/model/curves/curve-base";

/**
 * implements arbitrary function.
 */
export class FuncCurve extends CurveBase {

	static type = 'func';

	map: (v: number) => number;

	get formula() {
		return 'function(x)'
	}

	constructor(opts: { name: string, func: (v: number) => number }) {

		super(FuncCurve.type);
		this.map = opts.func;

	}

}