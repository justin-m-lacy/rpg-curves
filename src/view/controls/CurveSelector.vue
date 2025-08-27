<script setup lang="ts">
import { CurveCreator } from '@/model/curves';
import { useCreators } from '@/store/creators';

const model = defineModel<CurveCreator>();
const creatorStore = useCreators();

</script>
<template>
	<select v-model="model">
		<option v-for="create in creatorStore.creators">{{ create.type }}</option>
	</select>
</template>