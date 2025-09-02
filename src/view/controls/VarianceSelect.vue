<script setup lang="ts">
import { Variance } from '@/model/data-template';

const model = defineModel<Variance>({ default: 'normal' });
</script>
<template>
	<select v-model="model">
		<option value="high">high</option>
		<option value="normal">normal</option>
		<option value="low">low</option>
	</select>
</template>