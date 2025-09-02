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

	id: string,

	/**
	 * curve-id to data value.
	 */
	curves: Record<string, DataValue>

}