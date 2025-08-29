<script setup lang="ts">
/// <reference types="@types/google.visualization" />
import { FixedDivisionAxis } from '@/model/axes';
import { CurveModel } from '@/model/curves/curve-model';
import { useRange } from '@/view/composable/range-store';
import Range from '@/view/controls/Range.vue';

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

function onWheel(e: WheelEvent) {

	e.preventDefault();
	zoomChart(e.deltaY / 1000);
}

/**
 * 
 * @param pct - percent of range to zoom.
 * pct>0 zooms out. pct < 0 zooms in.
 */
function zoomChart(pct: number) {

	const [min, max] = range.value;

	if ((pct < 0 && (max - min) < 0.00000001)
		|| (pct > 0 && (max - min) > Number.MAX_SAFE_INTEGER / 1000)) {
		return;
	}

	// prevent min/max overlap.
	if (pct <= -0.4) pct = -0.4;

	const amt = pct * (max - min);

	range.value = [min - amt, max + amt];

	buildChart();

}

function buildChart() {

	if (!graphEl.value) {
		console.warn(`chart not ready.`);
		return;
	}

	const data = new google.visualization.DataTable();

	data.addColumn('number', 'level');
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

	const newChart = new google.visualization.LineChart(graphEl.value!);
	newChart.draw(data, {
		curveType: 'none',

	});
	dataTable.value = data;

}

onMounted(() => {
	if (props.curves.length) buildChart();
})

watch(range, (v) => {
	buildChart();
})
watch(() => props.curves, (list) => {
	buildChart();
});

</script>
<template>

	<div class="w-full h-full flex flex-col items-center">
		<div class="grow" ref="graphEl" @wheel="onWheel"></div>
		<Range title="x-range:" v-model="range" />
	</div>

</template>