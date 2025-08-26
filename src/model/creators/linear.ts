import { CurveCreator } from "@/model/curves";

export const linear: CurveCreator<{ A: number, C: number }> = {
	type: 'linear',
	map(x: number) {
		return this.A * x + this.C;
	},
	create() {
		return {
			A: 0,
			C: 0,
		}
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