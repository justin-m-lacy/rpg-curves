/** get color of tailwind css color-mix function **/
export const cssAlpha = (color: string, alpha: number = 50) =>
	`color-mix(in oklab, ${color} ${alpha}%, transparent)`