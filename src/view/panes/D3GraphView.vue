<script setup lang="ts">
import { CurveModel } from "@/model/curves/curve-model";
import { useDomain } from "@/view/composable/range-store";
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

/**
 * domain for function computation.
 */
const inTicks = computed(() => {
	return xscale.value.ticks(20)
});

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
		(d, _) => d)(model.mapDomain(inTicks.value).map(v => yscale.value(v))) ?? '';

}
</script>
<template>
	<svg ref="svgRef" class="h-full w-full">
		<g ref="xAxisRef" :transform="`translate(0, ${-marginBottom + (outRect?.height ?? 0)})`" />
		<g ref="yAxisRef" :transform="`translate(${marginLeft}, 0)`" />
		<path v-for="model in curves" fill="none" strokeWidth="1.5" stroke="black"
			  :d="makeLine(model)" />
	</svg>
</template>