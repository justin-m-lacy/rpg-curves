<script setup lang="ts">
import { CurveModel } from '@/model/curve-model';
import { useCurves } from '@/store/curves-store';
/// Select created curves to view.

const props = defineProps();
const curves = useCurves();

function onSelect(event: MouseEvent, curve: CurveModel) {
	curves.select(curve, event.shiftKey);
}

</script>
<template>
	<div class="flex flex-col">
		<div v-for="c in curves.curves.values()"
			 class="flex" :class="{
				'font-bold': curves.isSelected(c as CurveModel)
			}"
			 @click="onSelect($event, c as CurveModel)">
			{{ c.label }}
		</div>
	</div>

</template>