import { CurveCreator } from "@/model/curves/curves";
import { LinearCurve } from "@/model/curves/linear-curve";

export const linearCreator: CurveCreator<LinearCurve> = {
	type: 'linear',
	create() {
		return new LinearCurve();
	},
	params: [{
		prop: 'A',
		desc: 'Ax + C',
		value: 1
	},
	{
		prop: 'C',
		desc: 'Ax + C',
		value: 1
	}]
};