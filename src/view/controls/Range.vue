<script setup lang="ts">
import { TRange } from '@/model/curves/curves';

defineProps<{
	title?: string
}>();

const model = defineModel<TRange>();

function onChangeMin(val: string) {

	const min = Number(val);
	if (Number.isNaN(min)) return;

	if (model.value === null || model.value === undefined) {
		model.value = [min, min + 100];
		return;
	}

	if (min > model.value[1]) {
		model.value = [model.value[1], min];
	} else {
		model.value = [min, model.value[1]]
	}

}

function onChangeMax(val: string) {

	const max = Number(val);
	if (Number.isNaN(max)) return;
	if (model.value === null || model.value === undefined) {
		model.value = [max - 100, max];
		return;
	}

	if (max < model.value[0]) {
		model.value = [max, model.value[0]];
	} else {
		model.value = [model.value[0], max];
	}

}

</script>
<template>
	<div class="flex gap-x-1 items-center text-sm  select-none">
		<div v-if="title" class="font-semibold w-16 pointer-events-none">{{ title }}</div>
		<label class="text-sm font-semibold pointer-events-none">min</label>
		<input title="min" type="number" class="text-sm w-20 py-1" :value="model?.[0] ?? 0"
			   @change="onChangeMin(($event.target as HTMLInputElement).value)">
		<label class="text-sm font-semibold pointer-events-none">max</label>
		<input title="max" type="number" class="text-sm w-20  py-1" :value="model?.[1] ?? 100"
			   @change="onChangeMax(($event.target as HTMLInputElement).value)">
	</div>
</template>