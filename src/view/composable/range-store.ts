import { getRounding } from "@/util/format";

export const useRoundRange = (min: number = 0, max: number = 100) => {

	let arr = ref<[number, number]>([min, max]);

	return computed({

		get: () => arr.value,
		set: (v: [number, number]) => {

			const round = getRounding((v[1] - v[0]) / 2);

			// bump to round numbers.
			if ((v[1] % round) != 0) {
				v[1] = (round * Math.floor(v[1] / round) + round);
			}
			if ((v[0] % round) != 0) {
				v[0] = (round * Math.ceil(v[0] / round) - round);
			}
			arr.value = v;

		}
	});

}

/**
 * define a range for a graph view.
 */
export const useRange = (min: number = 0, max: number = 100) => {
	return ref<[number, number]>([min, max]);
}