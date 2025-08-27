import { CurveCreator } from "@/model/curves/curves";
import { ExpCurve, NatExpCurve } from "@/model/curves/exp-curve";

export const expCreator: CurveCreator<ExpCurve> = {
	type: 'exp',
	create() { return new ExpCurve(); },
	params: [{
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
	}]
}

export const natExpCreator: CurveCreator<NatExpCurve> = {
	type: 'natexp',
	create() { return new NatExpCurve(); },
	params: [{
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
	}]
};