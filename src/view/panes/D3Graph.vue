<script setup lang="ts">
import { CurveModel } from "@/model/curve-model";
import { UniqueColor } from "@/store/colors";
import { useSelect } from "@/store/select-store";
import { useRange } from "@/view/composable/range-store";
import { useZoom } from "@/view/composable/zoom";
import { useEventListener } from "@vueuse/core";
import * as d3 from "d3";
import { getMinMax } from '../../util/array';

const props = defineProps<{
	curves: CurveModel[]
}>();

// svg drawn elements.
const svgRef = shallowRef<SVGElement>();
const xAxisRef = shallowRef<SVGGElement>();
const yAxisRef = shallowRef<SVGGElement>();

const outRect = shallowRef<DOMRect>();
// display padding around axes.
const marginLeft = 64;
const marginBottom = 24;

// domain of x-axis
const domain = defineModel<[number, number]>('range', { default: [0, 30] });
const range = useRange();

useZoom(svgRef, domain);

const selects = useSelect();

const xscale = computed(() => {
	return d3.scaleLinear().domain(domain.value).range(
		[marginLeft, -marginLeft + (outRect.value?.width ?? 0)]
	).nice();
});

/**
 * domain of curve functions.
 */
const inTicks = computed(() => {

	const vals = xscale.value.ticks(20);
	computeRange(vals);

	return vals;

});

const colors = computed(() => props.curves.map(v => v.color));

/**
 * Compute range from all input curves on input.
 */
function computeRange(xVals: number[]) {

	const yRange: [number, number] = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER];

	for (let i = props.curves.length - 1; i >= 0; i--) {
		getMinMax(props.curves[i].mapDomain(xVals), yRange);
	}

	range.value = yRange;

}

const yscale = computed(() => {
	return d3.scaleLinear().domain(range.value).range([(outRect.value?.height ?? 0) - marginBottom, marginBottom]).nice()
});

useEventListener(window, 'keydown', (evt: KeyboardEvent) => {

	if (evt.key == 'ArrowLeft' || evt.key === 'ArrowRight') {

		const [min, max] = domain.value;
		const amt = evt.key == 'ArrowLeft' ? -0.025 * (max - min) : 0.025 * (max - min);
		domain.value = [min + amt, max + amt];

	} else if (evt.key == 'ArrowUp' || evt.key === 'ArrowDown') {

		const [min, max] = range.value;
		const amt = evt.key == 'ArrowDown' ? -0.1 * (max - min) : 0.1 * (max - min);
		range.value = [min + amt, max + amt];

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

	const xTicks = inTicks.value;
	// map inX,outY to scaled view values.
	return d3.line<number>(
		(_, i) => xscale.value(xTicks[i]),
		(d, _) => yscale.value(d)).curve(d3.curveBasis)(
			model.mapDomain(xTicks)
		) ?? '';

}
</script>
<template>

	<svg ref="svgRef" class="grow w-full">
		<g ref="xAxisRef"
		   :transform="`translate(0, ${-marginBottom + (outRect?.height ?? 0)})`" />
		<g ref="yAxisRef"
		   :transform="`translate(${marginLeft}, 0)`" />
		<path v-for="(model, ind) in curves" fill="none" strokeWidth="1.5"
			  :stroke="model.color ?? UniqueColor(ind, colors)"
			  @click="selects.toggleSelect(model)"
			  :d="makeLine(model)" />
	</svg>

</template>