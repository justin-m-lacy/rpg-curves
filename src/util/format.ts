type Numeric = number | { value: number }

export const round5 = ([low, high]: [number, number], ticks: number = 10) => {

  let w = Math.abs(high - low) / ticks;

  const div = 5 * Math.pow(10, Math.round(
    Math.log10(w < 0 ? -w : w)
  ) - 1
  );
  console.log(`div: ${div}`);

  return [
    div * Math.round((low / div)), div * Math.round((high / div))
  ];

}


export const getRounding = (x: number) => {
  return Math.pow(10, Math.round(
    Math.log10(x < 0 ? -x / 10 : x / 10)
  ));
}

/**
 * Returns abbreviation of item based on first letters.
 * @param {*} it
 */
export const abbr = (it?: { name?: string }) => {

  if (!it) return '';

  const s = it.name;
  if (!s) return it;

  const ind = s.indexOf(' ');
  if (ind > 0 && ind + 1 < s.length) return s[0] + s[ind + 1];
  return s.slice(0, 2);

}

export const round = (v: number, places: number = 1) => {
  return Math.round(Math.pow(10, places) * v) / Math.pow(10, places);
}

/**
 * Returns number as integer if integer, or else precise.
 * @param v 
 */
export const smallNum = (v: Numeric) => {

  const val = typeof v === 'number' ? v : v.value;
  return (Math.floor(val) === val) ? val : precise(val);
}

/**
 * Format numeric value for display.
 * @param v - number to display.
 * @param n - maximum rounding digits to display.
 */
export const precise = (v: Numeric, n: number = 2): string => {

  if (typeof v === 'object') v = v.value;

  if (v === Math.floor(v)) return v.toFixed(n);

  const maxDivide = Math.pow(10, n);

  let abs = Math.abs(v);
  let divide = 1;

  while ((divide < maxDivide) && abs !== Math.floor(abs)) {

    abs *= 10;
    divide *= 10;

  }

  abs = Math.round(abs) / divide;
  return (v >= 0 ? abs : -abs).toFixed(2);

}
