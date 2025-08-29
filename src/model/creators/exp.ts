import { CurveCreator } from "@/model/curves/curves";
import { ExpCurve, NatExpCurve } from "@/model/curves/exp-curve";

export const expCreator: CurveCreator<ExpCurve> = {
	type: 'exp',
	create() { return new ExpCurve(); },
	params: [{
		prop: 'A',
		desc: 'A*10^(Bx) + C',
		value: 1
	},
	{
		prop: 'B',
		desc: 'A*10^(Bx) + C',
		value: 0.1
	},
	{
		prop: 'C',
		desc: 'A*10^(Bx) + C',
		value: 1
	}]
}

export const natExpCreator: CurveCreator<NatExpCurve> = {
	type: 'natexp',
	create() { return new NatExpCurve(); },
	params: [{
		prop: 'A',
		desc: 'A*e^Bx + C',
		value: 1
	},
	{
		prop: 'B',
		desc: 'A*e^Bx + C',
		value: 0.1
	},
	{
		prop: 'C',
		desc: 'A*e^Bx + C',
		value: 1
	}]
};