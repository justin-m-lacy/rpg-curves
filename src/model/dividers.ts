export const evenTicks = ([min, max]: [number, number], n: number = 20) => {

	const res: number[] = [min]

	const dx = (max - min) / n;
	let x = min + dx;

	while (x < max) {
		x += dx;
		res.push(x);
	}

	res.push(max);

	return res;


}