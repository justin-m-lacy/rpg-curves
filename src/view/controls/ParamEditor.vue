<script setup lang="ts">
import { CurveModel } from '@/model/curve-model';
import { CurveParam } from '@/model/curves/curves';

const props = defineProps<{
	curve: CurveModel,
}>();

const parts = ref<Array<string | CurveParam>>([]);
watch(() => props.curve.formula, (formula) => {

	const RE = /(\{\w+\})/i;
	const split = formula.split(RE);

	const res: Array<string | CurveParam> = [];

	for (let i = 0; i < split.length; i++) {

		if (!split[i].length) continue;
		if (split[i][0] != '{' || !split[i].endsWith('}')) res.push(split[i]);

		// slice without {} braces
		const param = props.curve.params[split[i].slice(1, -1)];
		if (param) res.push(param);

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
		<template v-for="v in parts">
			<div v-if="typeof v == 'string'"
				 class="select-none pointer-events-none">
				{{ v }}</div>
			<input v-else type="number" class="text-sm shrink" :title="v.prop"

				   @change="onChange(v, ($event.target as HTMLInputElement).value)"
				   :value="v.value" :placeholder="v.prop">
		</template>
	</div>
</template>