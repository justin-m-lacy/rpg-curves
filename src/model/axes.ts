type AxisScale = (t: number) => number;

/**
 * Divides an axis into an array of separate ticks points.
 */
export type IDivider = (range: [number, number]) => number[];


/**
 * Axis with a fixed step between ticks.
 */
export class FixedStepDivider {

	private _step: number = 1;
	get step() { return this._step }
	set step(v) {
		if (v <= 0) throw new Error('Invalid step amount');
		this._step = v;
	}

	/**
	 * 
	 * @param step - interval between axis ticks.
	 */
	constructor(step: number) {
		if (step <= 0) throw new Error('Invalid step amount');
		this._step = step;
	}

	getTicks(range: [number, number]) {

		let x = range[0];
		const res: number[] = [x];

		while (x < range[1]) {
			x += this._step;
			res.push(x);
		}
		res.push(range[1]);

		return res;

	}

}

export const useTickCount = (domain: Ref<[number, number]>) => {

}

/**
 * Axis with a fixed number of divisions.
 */
export class FixedCountDivider {

	private _divides: number = 1;
	get divisions() { return this._divides }
	set divisions(v) {
		if (v <= 0) throw new Error('Invalid step amount');
		this._divides = v;
	}


	/**
	 * @param divisions Number of divisions in interval.
	 */
	constructor(divisions: number) {
		if (divisions <= 0) throw new Error('Invalid step amount');
		this._divides = divisions;
	}

	getTicks([min, max]: [number, number]) {

		const steps = this._divides;
		const step = (max - min) / steps;

		let x = min;
		const res = <number[]>[x];
		while (x < max) {

			x += step;
			res.push(x);

		}
		if (x < max) res.push(max);

		return res;
	}


}