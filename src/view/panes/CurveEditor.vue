<script setup lang="ts">
import { CurveModel } from '@/model/curves/curve-model';
import CurveSelector from '@/view/controls/CurveSelector.vue';

const props = defineProps<{
	model: CurveModel
}>();

const curve = computed(() => props.model.curve);

</script>
<template>
	<div class="flex flex-col items-start text-xs gap-y-2">
		<div class="text-sm font-semibold">{{ model.label }} Properties</div>

		<CurveSelector class="text-xs" />
		<div v-for="param in model.params" class="flex gap-x-2 gap-y-2 items-center">
			<template v-if="param.prop in curve">
				<div class="text-xs font-semibold">Param {{ param.name ?? param.prop }}</div>
				<label class="text-xs">value: </label>
				<input type="number" class="text-xs flex items-center py-2"
					   v-model="curve[param.prop as keyof typeof curve]"
					   :min="param.min"
					   :max="param.max">
			</template>
			<template v-else>
			</template>
		</div>

	</div>
</template>