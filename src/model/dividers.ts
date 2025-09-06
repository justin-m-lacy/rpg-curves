export const evenTicks = ([min, max]: [number, number], n: number = 20) => {

	const res: number[] = []

	const dx = (max - min) / n;
	let x = min;

	do {
		res.push(x);
		x += dx;
	} while (x < max);

	res.push(max);

	return res;


}