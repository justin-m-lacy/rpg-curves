<script setup lang="ts">
import { CurveModel } from '@/model/curve-model';

const props = defineProps<{
	model: CurveModel
}>();

const curve = computed(() => props.model.curve);

</script>
<template>
	<div class="flex flex-col text-xs">
		<div class="text-xs">Curve Properties</div>
		<div v-for="param in model.params">
			<template v-if="param.prop in curve">
				<div class="text-xs">{{ param.name ?? param.prop }}</div>
				<div class="text-xs">{{ curve[param.prop as keyof typeof curve] }}</div>
				<input type="number" class="text-xs"
					   v-model="curve[param.prop as keyof typeof curve]"
					   :min="param.min"
					   :max="param.max">
			</template>
			<template v-else>
			</template>
		</div>
	</div>
</template>