<script setup lang="ts">
import { CurveModel } from '@/model/curve-model';
import { CurveCreator } from '@/model/curves/curves';
import { useCreators } from '@/store/creators';
import CurveSelector from '@/view/controls/CurveSelector.vue';

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
	<div class="flex gap-x-2 justify-between items-center">
		<CurveSelector v-model="creator" />
		<button type="button" class="bg-cyan-600/30 text-sm
			font-semibold px-1.5 py-1 my-0 rounded-lg"
				@click="onCreate">Create</button>
	</div>

</template>