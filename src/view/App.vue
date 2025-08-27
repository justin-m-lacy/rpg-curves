<script setup lang="ts">
/// <reference types="@types/google.visualization" />

import { CurveModel } from '@/model/curve-model';
import { useCreators } from '@/store/creators';
import { useCurves } from '@/store/curves-store';
import NewCurve from '@/view/controls/NewCurve.vue';
import CurvesList from '@/view/panes/CurvesList.vue';
import GraphView from '@/view/panes/GraphView.vue';

const creators = useCreators();
creators.register();

const chartsLoaded = shallowRef(false);

const waitCharts = new Promise((res, rej) => {
	try {
		google.charts.setOnLoadCallback(() => {
			chartsLoaded.value = true;
		});
		google.charts.load('current', { packages: ['corechart', 'line'] });
	} catch (err) { rej(err) }
});


const chartEl = shallowRef<HTMLCanvasElement>();
const curves = useCurves();

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

function onNewCurve(model: CurveModel) {
	curves.select(model);
}

watch(chartEl, (el) => {
	if (!el) return;
});

onMounted(() => {
	waitCharts.then(buildChart);
});

</script>
<template>

	<div class="w-full h-full flex justify-end items-strech overflow-hidden">
		<div class="flex flex-col p-2 bg-white/75 min-h-full">
			<NewCurve @newCurve="onNewCurve" />
			<CurvesList />
		</div>

		<GraphView v-if="chartsLoaded" class="w-full h-full"
				   :curves="curves.selected as CurveModel[]" />

		<div class="flex flex-col justify-stretch min-h-full
				h-screen z-10 min-w-20 p-2 bg-white/75">
		</div>
	</div>

</template>