<script setup lang="ts">
/// <reference types="@types/google.visualization" />

import { LinearCurve } from '@/model/linear-curve';

type DataTable = google.visualization.DataTable;

const waitCharts = new Promise((res, rej) => {
	try {
		google.charts.setOnLoadCallback(res);
		google.charts.load('current', { packages: ['corechart', 'line'] });
	} catch (err) { rej(err) }
});

const chartEl = shallowRef<HTMLCanvasElement>();
const chart = ref<DataTable | null>(null);

const line = new LinearCurve({ name: 'line', a: 10, c: 5 });
const p = line.params[0];

function buildChart() {

	const data = new google.visualization.DataTable();

	if (!chartEl.value) {
		console.log(`chart not ready.`);
		return;
	}
	data.addColumn('number', 'level');
	data.addColumn('number', 'hp');
	data.addRows([
		[0, 0],
		[1, 1],
		[2, 4],

		[3, 9],
		[4, 16],
		[5, 25],
		[6, 36],
		[7, 49],
		[8, 64],
		[9, 81],
		[10, 100]
	]);

	const chart = new google.visualization.LineChart(chartEl.value!);
	chart.draw(data, {
		title: 'lame',
		curveType: 'function',

	});

}

watch(chartEl, (el) => {
	if (!el) return;
});

onMounted(() => {
	waitCharts.then(buildChart);
});

</script>
<template>

	<div class="w-full h-full flex justify-end overflow-hidden">
		<div ref="chartEl" class="w-full h-full"></div>
		<div class="flex flex-col justify-stretch min-h-full h-screen z-10 min-w-20 p-2 bg-white/75">
		</div>
	</div>

</template>