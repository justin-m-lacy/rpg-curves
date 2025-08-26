import { CurveCreator, TCurve } from "@/model/curves";



export class CurveFactory {

	readonly creators = new Map<string, CurveCreator<any>>();

	constructor() { }

	register(creator: CurveCreator<any>) {
		this.creators.set(creator.type, creator);
	}

	create<D extends object>(type: string, name: string): undefined | TCurve<D> {

		const creator = this.creators.get(type) as undefined | CurveCreator<D>;
		if (!creator) return undefined;

		return {
			name,
			map: creator.map,
			creator: creator,
			...creator.create()
		};

	}

}