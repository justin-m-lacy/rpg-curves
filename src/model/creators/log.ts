import { CurveCreator } from "@/model/curves/curves";
import { LnCurve, Log10Curve, Log2Curve, LogNCurve } from "@/model/curves/log-curve";

export const log10Creator: CurveCreator<Log10Curve> = {
	type: Log10Curve.type,
	create() { return new Log10Curve(); },
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
}

export const log2Creator: CurveCreator<Log2Curve> = {
	type: Log2Curve.type,
	create() { return new Log2Curve(); },
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
}

export const lnCurveCreator: CurveCreator<LnCurve> = {
	type: LnCurve.type,
	create() { return new LnCurve(); },
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

export const logNCreator: CurveCreator<LogNCurve> = {
	type: LogNCurve.type,
	create() { return new LogNCurve(); },
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
		value: 1
	},
	{
		prop: 'C',
		value: 1
	}]
}