export type TRange = [number, number];

export type TPlotter = {
	plot: (x: number) => number
}

export type TPoints = {
	points: Array<{ x: number, y: number }>
}


export type CurveParam<T extends object,> = {
	prop: keyof T,
	desc: string,
	name?: string,
	min?: number,
	max?: number
}

export abstract class Curve {

	name: string;

	readonly params: CurveParam<typeof this>[] = [];

	constructor(opts: { name: string }) {

		this.name = opts.name;

		this.init();
	}

	init() {
	}

	abstract plot(x: number): number;

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