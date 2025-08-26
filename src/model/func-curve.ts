import { Curve } from "@/model/curves";

/**
 * implements arbitrary function.
 */
export class FuncCurve extends Curve {

	plot: (v: number) => number;

	constructor(opts: { name: string, func: (v: number) => number }) {

		super(opts);
		this.plot = opts.func;

	}

}