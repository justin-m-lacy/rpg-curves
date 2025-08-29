import { CurveModel } from "@/model/curves/curve-model";

export const encodeCurves = (curves: Map<string, CurveModel>) => {

	const list: ReturnType<CurveModel['toJSON']>[] = [];
	for (const curve of curves.values()) {
		list.push(curve.toJSON());
	}

	return JSON.stringify({
		curves: list
	});

}