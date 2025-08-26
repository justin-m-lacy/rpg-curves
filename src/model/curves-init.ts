import { LinearCurve } from "@/model/linear-curve";
import { useCurveCreator } from "@/store/curve-creator";

const store = useCurveCreator();

store.register(
	{
		type: 'linear',
		create() {
			const c = new LinearCurve();
			c.creator = this;

			return c;
		},
		params: [{
			prop: 'A',
			desc: 'Ax + C',
		},
		{
			prop: 'C',
			desc: 'Ax + C',
		}]
	},
	{

	},
	{

	}
)