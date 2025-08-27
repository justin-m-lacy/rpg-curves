export type TRange = [number, number];

export type TPoints = {
	points: Array<{ x: number, y: number }>
}

export type CurveCreator<D extends object = any> = {
	type: string,
	create: () => TCurve<D>,
	params: CurveParam<D>[]
}

export type TCurve<D extends object> = D & {

	name?: string;
	type: string;
	map(x: number): number;
}

export type ICurve = new (obj?: any) => TCurve<any>;
export type CurveParam<T extends object = any> = {
	prop: string & keyof T,
	desc: string,
	value: number;
	name?: string,
	min?: number,
	max?: number

}
