<script setup lang="ts">
import { Curve } from '@/model/curves';
import { ExpCurve, NatExpCurve } from '@/model/exp-curve';
import { LinearCurve } from '@/model/linear-curve';
import { QuadCurve } from '@/model/quad-curve';

const props = defineProps<{
	cls: typeof Curve
}>();

const emit = defineEmits<{
	(e: 'newCurve', c: Curve): void;
}>();

const curve = ref<Curve>();

const classes = [
	LinearCurve,
	QuadCurve,
	ExpCurve,
	NatExpCurve,
]

const onCreate = () => {

	emit('newCurve', _);

}

</script>
<template>
	<div>
		<select v-model="curve">
			<option v-for="cls in classes">{{ cls.name }}</option>
		</select>
		<button type="button" @click="onCreate">Create</button>
	</div>

</template>