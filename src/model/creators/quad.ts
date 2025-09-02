import { CurveCreator } from "@/model/curves/curves";
import { QuadCurve } from "@/model/curves/quad-curve";

export const quadCreator: CurveCreator<QuadCurve> = {
	type: QuadCurve.type,
	create() {
		return new QuadCurve();
	},
	params: [{
		prop: 'A',
		value: 1
	},
	{
		prop: 'B',
		value: 1
	},
	{
		prop: 'C',
		value: 1
	}]
};