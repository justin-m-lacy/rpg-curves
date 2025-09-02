import { TCurve } from "@/model/curves/curves";

export type Variance = 'high' | 'low' | 'normal';

export type DataValue = {

	source: WeakRef<TCurve>

	/**
	 * variance from curve normal.
	 */
	variance?: Variance;

	/**
	 * type of random to produce?
	 */
	randType?: string;

}


export type DataTemplate = {

	// internal id.
	id: string;

	name: string;

	/**
	 * curve-id to data value.
	 */
	curves: Record<string, DataValue>;

}