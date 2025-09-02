<script setup lang="ts">
import { CurveModel } from '@/model/curve-model';
import { CurveCreator } from '@/model/curves/curves';
import { useCreators } from '@/store/creators';
import CurveSelector from '@/view/controls/CurveSelect.vue';
import LabelEditor from '@/view/controls/LabelEditor.vue';
import ParamEditor from '@/view/controls/ParamEditor.vue';

const props = defineProps<{
	model: CurveModel
}>();

const creators = useCreators();

function onChangeCurve(creator?: CurveCreator) {

	if (!creator) return;
	const value = creator.create()
	value.type = creator.type;

	props.model.setCurve(value);

}


</script>
<template>
	<div class="flex flex-col items-start text-xs gap-y-1">
		<div class="flex text-sm justify-start">
			<LabelEditor v-model="props.model.label" class="font-semibold text-sm py-0.5 px-1 w-20" />
			<CurveSelector class="text-xs" :color="model.color"
						   :modelValue="creators.get(model.type)"
						   @update:modelValue="onChangeCurve" />

		</div>

		<div class="flex gap-x-2 items-center text-xs">

		</div>
		<ParamEditor :curve="model" />
	</div>
</template>