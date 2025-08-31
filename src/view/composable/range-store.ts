
/**
 * define a range for a graph view.
 */
export const useRange = (min: number = 0, max: number = 100) => {
	return ref<[number, number]>([min, max]);
}