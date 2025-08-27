type AxisScale = (t: number) => number;

export interface IAxis {

	/**
	 * Maps range to point ticks on the axis.
	 * @param range 
	 */
	getTicks(range: [number, number]): number[];

}


/**
 * Axis with a fixed step between ticks.
 */
export class FixedStepAxis {

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

	}

}


/**
 * Axis with a fixed number of divisions.
 */
export class FixedDivisionAxis {

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
	}

	getTicks(range: [number, number]) {

	}


}