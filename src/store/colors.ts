/**
 * colors to assign to curves
 */
export const colors = [

	'#479FF8',
	'#EC4141',
	'mediumpurple',
	'green',
	"darkorange",
	'blue',
	'red',
	"purple",
	"olive",
	"orange",
	"indigo",
	"teal",
	"orangered",
	"yellowgreen",
	"navy",
	"mediumseagreen",
	"darkcyan",
	"aquamarine"
]

export const GetColor = (ind: number) => {
	return colors[ind % colors.length];
}

export const UniqueColor = (ind: number, exclude: (string | undefined)[]) => {

	ind = ind % colors.length;
	let start = ind;

	do {
		if (!exclude.includes(colors[ind])) return colors[ind];
		ind = (ind + 1) % colors.length;
	} while (ind != start);

	return colors[ind];

}