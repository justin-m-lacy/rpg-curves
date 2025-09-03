/**
 * Get min, max values of array.
 * @param a
 * @param res - result array. input is also used
 * as the current min,max values.
 */
export const getMinMax = (a: [number, number][],
	res: [number, number] = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]): [number, number] => {

	for (let i = a.length - 1; i >= 0; i--) {
		if (a[i][1] < res[0]) {
			res[0] = a[i][1];
		}
		if (a[i][1] > res[1]) {
			res[1] = a[i][1];
		}
	}
	return res;

}