<script setup lang="ts">
import { CurveModel } from "@/model/curve-model";
import { evenTicks } from "@/model/dividers";
import { UniqueColor } from "@/store/colors";
import { useSelect } from "@/store/select-store";
import { getRounding } from "@/util/format";
import { useFuncDrag } from "@/view/composable/func-drag";
import { useZoom } from "@/view/composable/zoom";
import { useEventListener } from "@vueuse/core";
import * as d3 from "d3";
import { getMinMax } from '../../util/array';

const props = defineProps<{
	curves: CurveModel[],
}>();

// svg drawn elements.
const svgRef = shallowRef<SVGElement>();
const xAxisRef = shallowRef<SVGGElement>();
const yAxisRef = shallowRef<SVGGElement>();

const outRect = shallowRef<DOMRect>();
// display padding around axes.
const marginLeft = 36;
const marginBottom = 24;

/**
 * prevent range automatically updating.
 */
const lockRange = shallowRef(false);

// domain of x-axis
const domain = defineModel<[number, number]>('domain', { default: [0, 30] });
const range = defineModel<[number, number]>('range', { default: [0, 100] });

useZoom(svgRef, domain);
useFuncDrag(svgRef, domain, outRect);

const selects = useSelect();

///rounding amount on rollover display.
const roundTo = shallowRef<number>(10);
const mouseIn = shallowRef(false);

/**
 * mouse x,y relative to svg and the input domains.
 */
const svgPt = reactive({ x: 0, y: 0, domX: 0, domY: 0 });


function mouseToGraph(x: number, y: number) {
	return [x - outRect.value!.left, y - outRect.value!.top];
}

function onMouseMove(event: MouseEvent) {

	[svgPt.x, svgPt.y] = mouseToGraph(event.clientX, event.clientY);
	svgPt.domX = roundTo.value * Math.round(xscale.value.invert(svgPt.x) / roundTo.value);
	svgPt.domY = yscale.value.invert(svgPt.y);

	const nearest = nearestCurve(svgPt.domX, svgPt.domY);
	if (nearest) {
		svgPt.domY = nearest?.map(svgPt.domX)
	}

	svgPt.domY = Math.round(10 * svgPt.domY) / 10;
	svgPt.x = xscale.value(svgPt.domX) - 10;
	svgPt.y = yscale.value(svgPt.domY) - 10;
}

/**
 * Get  curve with closest output y point of all selected curves,
 * or of all curves if none selected.
 * @param domX 
 * @param domY 
 */
function nearestCurve(domX: number, domY: number) {

	const list = (selects.selected.length ? selects.selected : props.curves) as CurveModel[];
	if (!list.length) return undefined;

	let best: CurveModel = list[0];
	let bestY = Math.abs(best.map(domX) - domY);

	for (let i = list.length - 1; i > 0; i--) {

		const del = Math.abs(list[i].map(domX) - domY)
		if (del < bestY) {
			best = list[i];
			bestY = del;
		}

	}

	return best;

}

const xscale = computed(() => {
	return d3.scaleLinear().domain(domain.value).range(
		[marginLeft, -marginLeft + (outRect.value?.width ?? 0)]
	).nice()
});

/**
 * domain of curve functions.
 */
const inTicks = computed(() => {

	const ticks = evenTicks(domain.value);
	roundTo.value = getRounding((domain.value[1] - domain.value[0]) / 20);

	computeRange(ticks);

	return ticks;

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

const lineFunc = d3.line<[number, number]>(
	(d, _) => xscale.value(d[0]),
	(d, _) => yscale.value(d[1])
).curve(d3.curveBasis);

function makeLine(model: CurveModel) {

	// map inX,outY to scaled view values.
	return lineFunc(model.mapDomain(inTicks.value)) ?? '';

}
</script>
<template>

	<svg ref="svgRef" class="w-full h-auto overflow-visible"
		 @pointermove="onMouseMove"
		 @mouseenter="mouseIn = true"
		 @mouseleave="mouseIn = false">
		<g ref="xAxisRef" class="select-none pointer-events-none" stroke-width="1.4"
		   :transform="`translate(0, ${-marginBottom + (outRect?.height ?? 0)})`" />
		<g ref="yAxisRef" class="select-none  pointer-events-none" stroke-width="1.5"
		   :transform="`translate(${marginLeft}, 0)`" />
		<text v-if="mouseIn" class="select-none pointer-events-none"
			  :x="svgPt.x" :y="svgPt.y" font-size="10" fill="black">
			{{ svgPt.domX }}, {{ svgPt.domY }}
		</text>
		<text v-for="m in curves" class="select-none pointer-events-none" :key="m.id"
			  :x="xscale(inTicks[inTicks.length - 2]) - 20"
			  :y="yscale(m.map(inTicks[inTicks.length - 2])) - 10" font-size="12"
			  font-weight="600"
			  :fill="m.color ?? 'black'">
			{{ m.label }}
		</text>
		<path v-for="m in curves" fill="none" stroke-width="12" :key="m.id"
			  stroke="transparent"
			  @click="selects.toggleSelect(m, $event.shiftKey)"
			  :d="makeLine(m)" />
		<path v-for="(model, ind) in curves" fill="none" :key="model.id"
			  class="pointer-events-none"
			  :stroke-width="selects.isSelected(model) ? 2.5 : 1.5"
			  :stroke="model.color ?? UniqueColor(ind, colors)"
			  :d="makeLine(model)" />
	</svg>

</template>