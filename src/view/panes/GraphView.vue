<script setup lang="ts">
/// <reference types="@types/google.visualization" />
import { FixedDivisionAxis } from '@/model/axes';
import { CurveModel } from '@/model/curves/curve-model';
import { useRange } from '@/view/composable/range-store';

const props = defineProps<{
	curves: CurveModel[]
}>();

// range of x-axis
const range = useRange();

const axis = shallowRef(new FixedDivisionAxis(20));

const graphEl = shallowRef<HTMLElement>();
type DataTable = google.visualization.DataTable;
const dataTable = ref<DataTable | null>(null);

/**
 * steps on the x-axis.
 */
const xstops = computed(() => {
	return axis.value.getTicks(range.value);
});

function buildChart() {

	const data = new google.visualization.DataTable();

	if (!graphEl.value) {
		console.log(`chart not ready.`);
		return;
	}

	data.addColumn('number', 'level');
	const curves = props.curves;
	for (const curve of curves) {
		data.addColumn('number', curve.label);
	}

	const xvals = xstops.value;
	for (let i = 0; i < xvals.length; i++) {

		console.log(`xval: ${xvals[i]}`);
		data.addRow([
			xvals[i], ...curves.map(v => v.map(xvals[i]))
		]);

	}

	const newChart = new google.visualization.LineChart(graphEl.value!);
	newChart.draw(data, {
		curveType: 'function',
	});
	dataTable.value = data;

}

watch(() => props.curves, (list) => {
	buildChart();
});

</script>
<template>
	<div>
		<div ref="graphEl"></div>
	</div>
</template>