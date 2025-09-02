<script setup lang="ts">
import { CurveModel } from '@/model/curve-model';
import { useCurves } from '@/store/curves-store';
import { useSelect } from '@/store/select-store';
import LabelEditor from '@/view/controls/LabelEditor.vue';
/// Select created curves to view.

const props = defineProps();
const curves = useCurves();

const select = useSelect();
function onSelect(event: MouseEvent, curve: CurveModel) {
	select.select(curve, event.shiftKey);
}
function onDelete(c: CurveModel) {
	curves.remove(c);
}

</script>
<template>
	<div class="flex flex-col items-stretch gap-y-3 pl-1">
		<div v-for="m in curves.curves" :key="m.id"
			 class="flex items-center gap-x-2 py-0" :class="{
				'font-bold': select.isSelected(m as CurveModel)
			}"
			 @click="onSelect($event, m as CurveModel)">

			<button @click="onDelete(m as CurveModel)" class="text-[0.5rem]">❌</button>
			<LabelEditor v-model="m.label" />
		</div>
	</div>

</template>