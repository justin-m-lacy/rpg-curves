import { CurveBase } from "@/model/curves/curve-base";

/**
 * implements arbitrary function.
 */
export class FuncCurve extends CurveBase {

	map: (v: number) => number;

	get formula() {
		return 'function(x)'
	}

	constructor(opts: { name: string, func: (v: number) => number }) {

		super();
		this.map = opts.func;

	}

}