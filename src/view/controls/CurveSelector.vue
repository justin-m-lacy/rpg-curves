<script setup lang="ts">
import { CurveCreator } from '@/model/curves/curves';
import { useCreators } from '@/store/creators';

const model = defineModel<CurveCreator>();
const creatorStore = useCreators();

if (!model.value) model.value = creatorStore.get('linear');

</script>
<template>
	<select v-model="model">
		<option v-for="create in creatorStore.creators" :value="create">{{ create.type }}</option>
	</select>
</template>