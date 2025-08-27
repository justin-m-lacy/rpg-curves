import { CurveCreator } from "@/model/curves";
import { LinearCurve } from "@/model/linear-curve";

export const linear: CurveCreator<LinearCurve> = {
	type: 'linear',
	create() {
		return new LinearCurve();
	},
	params: [{
		prop: 'A',
		desc: 'Ax + C',
	},
	{
		prop: 'C',
		desc: 'Ax + C',
	}]
};