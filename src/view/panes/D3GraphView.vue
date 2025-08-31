<script setup lang="ts">
import { CurveModel } from "@/model/curves/curve-model";
import { UniqueColor } from "@/store/colors";
import { useDomain } from "@/view/composable/range-store";
import { useZoom } from "@/view/composable/zoom";
import { useEventListener } from "@vueuse/core";
import * as d3 from "d3";

const props = defineProps<{
	curves: CurveModel[]
}>();

const svgRef = shallowRef<SVGElement>();
const xAxisRef = shallowRef<SVGGElement>();
const yAxisRef = shallowRef<SVGGElement>();

const outRect = shallowRef<DOMRect>();
// padding for display.
const marginLeft = 34;
const marginBottom = 20;

// range of x-axis
const domain = useDomain(0, 30);

useZoom(svgRef, domain);

/**
 * domain for function computation.
 */
const inTicks = computed(() => {
	return xscale.value.ticks(20)
});

const colors = computed(() => props.curves.map(v => v.color));

/**
 * domain of visual output.
 */
const outDomain = computed(() => {
	return inTicks.value.map(v => xscale.value(v));
})

const xscale = computed(() => {
	return d3.scaleLinear().domain(domain.value).range(
		[marginLeft, -marginLeft + (outRect.value?.width ?? 0)]
	);
});

const yscale = computed(() => {
	return d3.scaleLinear().domain([0, 50]).range([(outRect.value?.height ?? 0) - marginBottom, marginBottom]).nice()
});

useEventListener(window, 'keydown', (evt: KeyboardEvent) => {

	if (evt.key == 'ArrowLeft' || evt.key === 'ArrowRight') {

		const [min, max] = domain.value;
		const amt = evt.key == 'ArrowLeft' ? -0.025 * (max - min) : 0.05 * (max - min);
		domain.value = [min + amt, max + amt];

	}

});



watchEffect(() => {
	if (!xAxisRef.value) return;
	d3.select(xAxisRef.value).call(d3.axisBottom(xscale.value))
});

watchEffect(() => {
	if (!yAxisRef.value) return;
	d3.select(yAxisRef.value).call(d3.axisLeft(yscale.value))
});

onMounted(() => {
	outRect.value = svgRef.value?.getBoundingClientRect();
})

function makeLine(model: CurveModel) {

	const xpts = outDomain.value;
	return d3.line<number>(
		(_, i) => xpts[i],
		(d, _) => d).curve(d3.curveBasis)(model.mapDomain(inTicks.value).map(v => yscale.value(v))) ?? '';

}
</script>
<template>
	<svg ref="svgRef" class="h-full w-full">
		<g ref="xAxisRef" :transform="`translate(0, ${-marginBottom + (outRect?.height ?? 0)})`" />
		<g ref="yAxisRef" :transform="`translate(${marginLeft}, 0)`" />
		<path v-for="(model, ind) in curves" fill="none" strokeWidth="1.5"
			  :stroke="model.color ?? UniqueColor(ind, colors)"
			  :d="makeLine(model)" />
	</svg>
</template>