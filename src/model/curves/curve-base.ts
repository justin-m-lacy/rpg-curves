
export abstract class CurveBase {

	type: string;

	constructor(type?: string) {
		this.type = type ?? 'unknown';
	}

	abstract map(x: number): number;

	abstract get formula(): string;

	getYValues(range: [number, number], steps: number) {
		const step = (range[1] - range[0]) / steps;

		let x = range[0], yval: number;
		return new Array(steps + 1).map((_) => {
			yval = this.map(x);
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
			return [prev, this.map(prev)];
		})

	}


}