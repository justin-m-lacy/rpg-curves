<script setup lang="ts">
import { CurveModel } from '@/model/curve-model';

const props = defineProps<{
	curves: CurveModel[]
}>();

const emit = defineEmits<{
	(e: 'select', m: CurveModel, multi?: boolean): void;
}>();

</script>
<template>
	<div class="flex flex-wrap gap-x-8 items-center">
		<div v-for="m in curves" class="flex items-center gap-x-2" :key="m.id"
			 @click="emit('select', m, $event.shiftKey)">
			<div :style="{ backgroundColor: m.color }" class="w-5 h-5 select-none rounded-md">&nbsp;</div>
			<span class="">{{ m.label }}</span>
		</div>
	</div>
</template>