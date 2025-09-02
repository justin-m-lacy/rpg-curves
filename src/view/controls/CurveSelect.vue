<script setup lang="ts">
import { CurveCreator } from '@/model/curves/curves';
import { useCreators } from '@/store/creators';

const model = defineModel<CurveCreator>();
const creatorStore = useCreators();

if (model.value == null) {
	model.value = creatorStore.get('linear');
}

</script>
<template>
	<select v-model="model" class="flex text-sm py-1 my-0.5 px-3 w-auto
		outline-none outline-0 bg-green-100 border-green-800 rounded-sm">
		<option v-for="create in creatorStore.creators" :key="create.type"
				:value="create">{{ create.type }}</option>
	</select>
</template>