import { CurveModel } from "@/model/curve-model";

export const encodeCurves = (curves: Record<string, CurveModel>) => {

	const list: ReturnType<CurveModel['toJSON']>[] = [];
	for (const k in curves) {
		list.push(curves[k].toJSON());
	}

	return JSON.stringify({
		curves: list
	});

}