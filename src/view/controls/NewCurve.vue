<script setup lang="ts">
import { CurveModel } from '@/model/curve-model';
import { CurveCreator } from '@/model/curves';
import { useCreators } from '@/store/creators';
import CurveSelector from '@/view/controls/CurveSelector.vue';

const props = defineProps<{}>();

const emit = defineEmits<{
	(e: 'newCurve', c: CurveModel): void;
}>();

const creator = ref<CurveCreator>();
const onCreate = () => {

	const create = creator.value;
	if (!create) return;

	const model = useCreators().create(create.type, 'new curve');
	if (model) {
		emit('newCurve', model);
	}

}

</script>
<template>
	<div class="">
		<CurveSelector v-model="creator" />
		<button type="button" @click="onCreate">Create</button>
	</div>

</template>