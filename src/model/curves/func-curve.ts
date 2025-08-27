import { CurveBase } from "@/model/curve-base";

/**
 * implements arbitrary function.
 */
export class FuncCurve extends CurveBase {

	map: (v: number) => number;

	constructor(opts: { name: string, func: (v: number) => number }) {

		super();
		this.map = opts.func;

	}

}