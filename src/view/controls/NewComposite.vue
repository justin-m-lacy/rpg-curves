<script setup lang="ts">
import { CurveModel } from '@/model/curve-model';
import { CurveSumModel } from '@/model/curve-sum';

defineProps<{
	// all options for creating new sum.
	curves: CurveModel[]
}>();

const emit = defineEmits<{
	(e: 'create', sum: CurveSumModel): void
}>();

type CompositeType = 'curvesum' | 'curvediff';

const compositeType = shallowRef<CompositeType>('curvesum');

const modelA = shallowRef<CurveModel>();
const modelB = shallowRef<CurveModel>();

function tryCreate() {
	if (!modelA.value || !modelB.value) return;
	emit('create', new CurveSumModel({
		curveA: modelA.value,
		curveB: modelB.value,
		B: compositeType.value == 'curvediff' ? -1 : 1
	}))

}
</script>
<template>
	<div class="flex gap-x-2">
		<select v-model="compositeType">
			<option :value="'curvesum'">Sum</option>
			<option :value="'curvediff'">Subtract</option>
		</select>
		<select v-model="modelA">
			<option v-for="m in curves" :value="m">{{ m.label }}</option>
		</select>
		<select v-model="modelB">
			<option v-for="m in curves" :value="m">{{ m.label }}</option>
		</select>
		<button type="button" :disabled="!modelA || !modelB"
				@click="tryCreate">Create</button>
	</div>
</template>