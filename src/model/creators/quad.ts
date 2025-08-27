import { CurveCreator } from "@/model/curves/curves";
import { QuadCurve } from "@/model/curves/quad-curve";

export const quadCreator: CurveCreator<QuadCurve> = {
	type: 'quad',
	create() {
		return new QuadCurve();
	},
	params: [{
		prop: 'A',
		desc: 'Ax^2 + Bx + C',
	},
	{
		prop: 'B',
		desc: 'Ax^2 + Bx + C',
	},
	{
		prop: 'C',
		desc: 'Ax^2 + Bx + C',
	}]
};