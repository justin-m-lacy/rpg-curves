<script setup lang="ts">
import { CurveModel } from '@/model/curve-model';
import { DataTemplate } from '@/model/data-template';
import { useCurves } from '@/store/curves-store';
import { cssAlpha } from '@/util/css';
import ModelSelect from '@/view/controls/ModelSelect.vue';
import VarianceSelect from '@/view/controls/VarianceSelect.vue';

const props = defineProps<{
	data: DataTemplate,
}>();

/// curve to add to template.
const model = shallowRef<CurveModel>();

const curves = useCurves();

function addCurveData(cm?: CurveModel) {

	if (!cm) return;

	const value = props.data.curves[cm.id] ?? {
		source: new WeakRef(cm)
	};
	props.data.curves[cm.id] = value;

}


</script>
<template>
	<div class="flex flex-col gap-y-1">
		<div class="flex gap-x-2">
			<ModelSelect @model="model" />
			<button v-if="model && !data.curves[model.id]" type="button"
					:disabled="!model" @click="addCurveData(model)">
				Add Curve</button>
		</div>

		<div v-for="(cd, id) in data.curves" :key="id">
			<div
				 :style="{
					'backgroundColor': curves.curves[id].color ? cssAlpha(curves.curves[id].color) : undefined
				}">
				{{ curves.curves[id]?.label ?? id }}
			</div>
			<VarianceSelect :model="cd.variance" />
		</div>

	</div>
</template>