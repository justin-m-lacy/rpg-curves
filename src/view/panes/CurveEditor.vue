<script setup lang="ts">
import { CurveModel } from '@/model/curves/curve-model';
import { CurveCreator } from '@/model/curves/curves';
import { useCreators } from '@/store/creators';
import CurveSelector from '@/view/controls/CurveSelector.vue';
import LabelEditor from '@/view/controls/LabelEditor.vue';

const props = defineProps<{
	model: CurveModel
}>();

const creators = useCreators();
const curve = computed(() => props.model.curve);

function onChangeCurve(creator?: CurveCreator) {

	if (!creator) return;
	const value = creator.create()
	value.type = creator.type;

	props.model.setCurve(value);

}


</script>
<template>
	<div class="flex flex-col items-start text-xs gap-y-2">
		<div class="text-sm font-semibold">
			<LabelEditor v-model="props.model.label" class="text-sm py-0.5 px-1 w-20" />
			<span>Properties</span>
		</div>

		<div class="flex gap-x-2 items-center text-xs">
			<label class="font-semibold">curve type</label>
			<CurveSelector class="text-xs" :modelValue="creators.get(model.type)"
						   @update:modelValue="onChangeCurve" />

		</div>
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