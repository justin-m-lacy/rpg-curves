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
	<div class="flex flex-col gap-y-3">
		<div v-for="c in curves.curves.values()"
			 class="flex items-center gap-x-2 py-0" :class="{
				'font-bold': select.isSelected(c as CurveModel)
			}"
			 @click="onSelect($event, c as CurveModel)">

			<button @click="onDelete(c as CurveModel)" class="text-[0.5rem]">❌</button>
			<LabelEditor v-model="c.label" />
		</div>
	</div>

</template>