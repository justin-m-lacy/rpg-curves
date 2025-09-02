/**
 * Get min, max values of array.
 * @param arr
 * @param res - result array. input is also used
 * as the current min,max values.
 */
export const getMinMax = (arr: [number, number][],
	res: [number, number] = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]): [number, number] => {

	for (let i = arr.length - 1; i >= 0; i--) {

		const y = arr[i][1];

		if (Number.isNaN(y)) continue;

		if (y < res[0]) {
			res[0] = y;
		}
		if (y > res[1]) {
			res[1] = y;
		}
	}
	return res;

}