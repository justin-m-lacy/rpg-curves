/**
 * Get min, max values of array.
 * @param arr
 * @param res - result array. input is also used
 * as the current min,max values.
 */
export const getMinMax = (arr: number[],
	res: [number, number] = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]): [number, number] => {

	for (let i = arr.length - 1; i >= 0; i--) {

		if (arr[i] < res[0]) {
			res[0] = arr[i]
		}
		if (arr[i] > res[1]) {
			res[1] = arr[i];
		}
	}
	return res;

}