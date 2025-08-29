import { CurveModel } from "@/model/curves/curve-model";
import { useCreators } from "@/store/creators";

export function decodeCurves(json: string) {

	const data = JSON.parse(json);

	if (!('curves' in data)) {
		return;
	}

	const curvesData = data.curves;
	if (!Array.isArray(curvesData)) {
		throw new Error('Invalid Curves data.')
	}

	const creators = useCreators();
	const results: CurveModel[] = [];

	for (let i = 0; i < curvesData.length; i++) {

		const item = curvesData[i];
		if (!('type' in item)) {
			console.warn(`curve missing type: ${item}`);
			continue;
		}

		const model = creators.create(item.type, item.label);
		if (!model) continue;

		results.push(model);
		if (!('params' in item)) {
			continue;
		}
		parseParams(model, item.params);

	}

	return results;
}

function parseParams(model: CurveModel, data: any) {

	if (!Array.isArray(data)) return;

	data.forEach(v => {
		if (!('prop' in v) || !('value' in v)
			|| typeof v.prop != 'string'
			|| typeof v.value !== 'number') {
			console.warn(`invalid param: ${v}`);
			return undefined;
		}
		model.setParam(v.prop, v.value);
	})


}