<script setup lang="ts">
import { CurveModel } from '@/model/curve-model';
import { DataTemplate } from '@/model/data-template';
import ModelSelect from '@/view/controls/ModelSelect.vue';
import VarianceSelect from '@/view/controls/VarianceSelect.vue';

const props = defineProps<{
	data: DataTemplate
}>();

/// curve to add to template.
const model = shallowRef<CurveModel>();

function addCurveData(cm?: CurveModel) {

	if (!cm) return;

	const value = props.data.curves[cm.id] ?? {
		source: new WeakRef(cm)
	};
	props.data.curves[cm.id] = value;

}


</script>
<template>
	<div>
		<div v-for="(cd, id) in data.curves" :key="id">
			<span>{{ id }}</span>
			<VarianceSelect :model="cd.variance" />
		</div>
		<ModelSelect @model="model" />
		<button v-if="model && !data.curves[model.id]" type="button"
				:disabled="!model" @click="addCurveData(model)">
			Add Curve</button>
	</div>
</template>