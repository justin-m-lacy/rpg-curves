import { CurveCreator } from "@/model/curves/curves";
import { LinearCurve } from "@/model/curves/linear-curve";

export const linearCreator: CurveCreator<LinearCurve> = {
	type: 'linear',
	create() {
		return new LinearCurve();
	},
	params: [{
		prop: 'A',
		value: 1
	},
	{
		prop: 'C',
		value: 1
	}]
};