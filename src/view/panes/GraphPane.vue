<script setup lang="ts">
import { TPoints } from '@/model/curves';


const props = defineProps<{
	range: [number, number],
	curves: TCurve[]
}>();

const xAxis = shallowRef<SVGElement>();
const yAxis = shallowRef<SVGElement>();

const curves = computed(() => {

	const min = props.range[0];
	const max = props.range[1];
	const steps = 20;
	const step = (max - min) / steps;

	const res = props.curves.slice();
	for (let i = 0; i < res.length; i++) {

		const plot = res[i];
		if ('points' in plot) continue;

		const points = new Array(20).map((_, i) => {
			return { x: min + i * step, y: plot.plot(min + i * step) }
		});
		res[i] = { points };

	}

	return res as TPoints[];

});

/**
 * y-extent over all curves in domain.
 * @param c 
 */
const yExtent = computed(() => {

	const [min, max] = props.range;
	const yRange = [0, 0];

	const vals = curves.value;
	for (let i = 0; i < vals.length; i++) {

		const pts = vals[i].points;
		for (let k = 0; k < pts.length; k++) {
			if (pts[k].x >= min && pts[k].x <= max) {

				if (pts[k].y < yRange[0]) yRange[0] = pts[k].y;
				if (pts[k].y > yRange[1]) yRange[1] = pts[k].y;

			}
		}

	}
	return yRange;

})



</script>
<template>
	<SmoothChart />
</template>