<script setup lang="ts">
/// <reference types="@types/google.visualization" />
import { CurveModel } from '@/model/curve-model';
import { useRange } from '@/view/composable/range-store';

const props = defineProps<{
	curves: CurveModel[]
}>();

// number of divisions on x-axis.
const numSteps = shallowRef(20);
const range = useRange();

const graphEl = shallowRef<HTMLElement>();
type DataTable = google.visualization.DataTable;
const chart = ref<DataTable | null>(null);

/**
 * steps on the x-axis.
 */
const xstops = computed(() => {

	const min = range.value[0];
	const max = range.value[1];
	const steps = numSteps.value;
	const step = (max - min) / steps;

	let x = min, prev: number;
	return new Array(steps + 1).map((_) => {
		prev = x;
		x += step;
		return prev;
	});

});

function buildChart() {

	const data = new google.visualization.DataTable();

	if (!graphEl.value) {
		console.log(`chart not ready.`);
		return;
	}

	const curves = props.curves;
	for (const curve of curves) {
		data.addColumn('number', curve.label);
	}

	const xvals = xstops.value;
	for (let i = 0; i < xvals.length; i++) {

		data.addRow([
			xvals[i], ...curves.map(v => v.map(xvals[i]))
		]);


	}

	const chart = new google.visualization.LineChart(graphEl.value!);
	chart.draw(data, {
		title: 'lame',
		curveType: 'function',

	});

}

</script>
<template>
	<div>
		<div ref="graphEl"></div>
	</div>
</template>