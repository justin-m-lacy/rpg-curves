<script setup lang="ts">
import { CurveModel } from '@/model/curve-model';
import { CurveParam } from '@/model/curves/curves';
import { cssAlpha } from '@/util/css';

const props = defineProps<{
	curve: CurveModel,
}>();

const parts = ref<Array<string | CurveParam>>([]);
watch(() => props.curve.formula, (formula) => {

	const RE = /\{\w+\}/ig;
	const matches = formula.matchAll(RE);

	const res: Array<string | CurveParam> = [];

	let lastInd = 0;
	for (const m of matches) {

		if (m.index > lastInd) {
			res.push(formula.slice(lastInd, m.index))
		}

		// slice without {} braces
		const param = props.curve.params[m[0].slice(1, -1)];
		if (param) res.push(param);
		lastInd = m.index + m[0].length;

	}

	if (lastInd <= formula.length) {
		res.push(formula.slice(lastInd));
	}

	parts.value = res;

}, { immediate: true });

function onChange(param: CurveParam, value: string) {

	const num = Number(value);
	if (Number.isNaN(num)) return;
	props.curve.setParam(param.prop, num);

}

</script>
<template>
	<div class="flex gap-x-1 items-center text-sm">
		<span class="font-semibold pointer-events-none select-none">f( X ) = </span>
		<template v-for="v in parts">
			<div v-if="typeof v == 'string'"
				 class="select-none pointer-events-none font-semibold">
				{{ v }}</div>
			<input v-else type="number" class="text-sm shrink py-0.5 min-w-4 w-12 text-right
				 rounded-md"
				   :style="{
					'background-color': curve.color ? cssAlpha(curve.color) : undefined
				}"
				   :title="v.prop"

				   @change="onChange(v, ($event.target as HTMLInputElement).value)"
				   :value="v.value" :placeholder="v.prop">

		</template>
	</div>
</template>