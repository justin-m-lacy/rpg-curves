<script setup lang="ts">
import { CurveModel } from '@/model/curves/curve-model';
import { useCurves } from '@/store/curves-store';
import LabelEditor from '@/view/controls/LabelEditor.vue';
/// Select created curves to view.

const props = defineProps();
const curves = useCurves();

function onSelect(event: MouseEvent, curve: CurveModel) {
	curves.select(curve, event.shiftKey);
}
function onDelete(c: CurveModel) {
	curves.remove(c);
}

</script>
<template>
	<div class="flex flex-col gap-y-1.5">
		<div v-for="c in curves.curves.values()"
			 class="flex gap-x-2" :class="{
				'font-bold': curves.isSelected(c as CurveModel)
			}"
			 @click="onSelect($event, c as CurveModel)">

			<button @click="onDelete(c as CurveModel)" class="text-xs">❌</button>
			<LabelEditor v-model="c.label" />
		</div>
	</div>

</template>