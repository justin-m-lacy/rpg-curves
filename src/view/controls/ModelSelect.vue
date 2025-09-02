<script setup lang="ts">
import { CurveModel } from '@/model/curve-model';
import { useCurves } from '@/store/curves-store';

const model = defineModel<CurveModel>();
const curves = useCurves();

</script>
<template>
	<select v-model="model" class="flex text-sm py-1 my-0.5 px-3 w-auto
		outline-none outline-0 bg-green-100 border-green-800 rounded-sm">
		<option v-for="m in curves.curves" :key="m.id"
				:value="m">{{ m.label }}</option>
	</select>
</template>