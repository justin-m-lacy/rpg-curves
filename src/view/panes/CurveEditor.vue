<script setup lang="ts">
import { CurveModel } from '@/model/curves/curve-model';
import { CurveCreator } from '@/model/curves/curves';
import { useCreators } from '@/store/creators';
import CurveSelector from '@/view/controls/CurveSelector.vue';

const props = defineProps<{
	model: CurveModel
}>();

const creators = useCreators();
const curve = computed(() => props.model.curve);

function onChangeCurve(creator: CurveCreator) {

	const value = creator.create()
	value.type = creator.type;

	props.model.setCurve(value);

}


</script>
<template>
	<div class="flex flex-col items-start text-xs gap-y-2">
		<div class="text-sm font-semibold">{{ model.label }} Properties</div>

		<CurveSelector class="text-xs" :modelValue="creators.get(model.type)"
					   @update:modelValue="onChangeCurve" />
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