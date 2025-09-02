import { CurveCreator } from "@/model/curves/curves";
import { Exp10Curve, Exp2Curve, ExpNCurve, NatExpCurve } from "@/model/curves/exp-curve";

export const exp10Creator: CurveCreator<Exp10Curve> = {
	type: Exp10Curve.type,
	create() { return new Exp10Curve(); },
	params: [{
		prop: 'A',
		value: 1
	},
	{
		prop: 'B',
		value: 0.1
	},
	{
		prop: 'C',
		value: 1
	}]
}

export const exp2Creator: CurveCreator<Exp2Curve> = {
	type: Exp2Curve.type,
	create() { return new Exp2Curve(); },
	params: [{
		prop: 'A',
		value: 1
	},
	{
		prop: 'B',
		value: 0.1
	},
	{
		prop: 'C',
		value: 1
	}]
}

export const expNCreator: CurveCreator<ExpNCurve> = {
	type: ExpNCurve.type,
	create() { return new ExpNCurve(); },
	params: [{
		prop: 'A',
		value: 1
	},
	{
		prop: 'N',
		value: 3
	},
	{
		prop: 'B',
		value: 0.1
	},
	{
		prop: 'C',
		value: 1
	}]
}

export const natExpCreator: CurveCreator<NatExpCurve> = {
	type: NatExpCurve.type,
	create() { return new NatExpCurve(); },
	params: [{
		prop: 'A',
		value: 1
	},
	{
		prop: 'B',
		value: 0.1
	},
	{
		prop: 'C',
		value: 1
	}]
};