export type TRange = [number, number];

export type TPlotter = {
	plot: (x: number) => number
}

export type TPoints = {
	points: Array<{ x: number, y: number }>
}

export type CurveCreator<D extends object> = {
	type: string,
	create: () => D,
	map: (this: D, x: number) => number,
	params: CurveParam<D>[]
}

export type TCurve<D extends object> = D & {

	creator: CurveCreator<D>,
	map(x: number): number,
}

export type ICurve = new (obj?: any) => Curve;
export type CurveParam<T extends object = any> = {
	prop: keyof T,
	desc: string,
	name?: string,
	min?: number,
	max?: number

}

export class Curve<T extends TCurve> {

	name: string = '';

	creator: CurveCreator<T>;

	map: (x: number) => number;

	constructor(creator: CurveCreator<T>) {
		this.creator = creator;
		this.map = creator.map;
	}


	getYValues(range: [number, number], steps: number) {
		const step = (range[1] - range[0]) / steps;

		let x = range[0], yval: number;
		return new Array(steps + 1).map((_, i) => {
			yval = this.plot(x);
			x += step;
			return yval;
		})
	}

	getPoints(range: [number, number], steps: number) {

		const step = (range[1] - range[0]) / steps;

		let x = range[0], prev: number;
		return new Array(steps + 1).map((_, i) => {
			prev = x;
			x += step;
			return [prev, this.plot(prev)];
		})

	}


}