<script setup lang="ts">
/// <reference types="@types/google.visualization" />

import { CurveModel } from '@/model/curves/curve-model';
import { useCreators } from '@/store/creators';
import { useCurves } from '@/store/curves-store';
import NewCurve from '@/view/controls/NewCurve.vue';
import CurvesList from '@/view/panes/CurvesList.vue';
import GraphView from '@/view/panes/GraphView.vue';

const creators = useCreators();
creators.register();

const chartsLoaded = shallowRef(false);



google.charts.load('current', { packages: ['corechart', 'line'] });
google.charts.setOnLoadCallback(() => {
	chartsLoaded.value = true;
});



const chartEl = shallowRef<HTMLCanvasElement>();
const curves = useCurves();

function onNewCurve(model: CurveModel) {
	model.label = curves.uniqueName();
	curves.add(model);
	curves.select(model);
}

watch(chartEl, (el) => {
	if (!el) return;
});

onMounted(() => {
});

</script>
<template>

	<div class="w-full h-full flex justify-end items-strech overflow-hidden">
		<div class="flex flex-col p-2 bg-white/75 min-h-full">
			<NewCurve @newCurve="onNewCurve" />
			<CurvesList />
		</div>

		<GraphView v-if="chartsLoaded" class="w-full h-full" :curves="curves.selected" />

		<div class="flex flex-col justify-stretch min-h-full
				h-screen z-10 min-w-20 p-2 bg-white/75">
		</div>
	</div>

</template>