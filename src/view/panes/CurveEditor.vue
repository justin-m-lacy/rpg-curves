<script setup lang="ts" generic="T extends Curve">
import { Curve } from '@/model/curves';

const props = defineProps<{
	curve: T
}>();

</script>
<template>
	<div class="flex flex-col">
		<div class="text-xs">Curve Properties</div>
		<div v-for="param in curve.params">
			<div class="text-xs">{{ param.name ?? param.prop }}</div>
			<div class="text-xs">{{ curve[param.prop] }}</div>
			<input type="number" class="text-xs" v-model="curve[param.prop]"
				   :min="param.min" :max="param.max">
		</div>
	</div>
</template>