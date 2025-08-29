<script setup lang="ts">
const model = defineModel<string>();

const inputRef = shallowRef<HTMLElement>();
const editing = shallowRef(false);

function onClick(evt: MouseEvent) {
	if (editing.value && (evt.target !== inputRef.value)) setEditing(false);
}
function setEditing(edit: boolean) {

	if (editing.value == edit) return;

	editing.value = edit;
	nextTick(() => {
		if (edit) {
			window.addEventListener('pointerdown', onClick, { passive: true });
		} else {
			window.removeEventListener('pointerdown', onClick);
		}
	})

}
</script>
<template>
	<input ref="inputRef" v-if="editing" type="text" class="bg-white" v-model="model"
		   @blur="setEditing(false)"
		   @onchanged="setEditing(false)">
	<div v-else @click="setEditing(true)">
		{{ model }}
	</div>
</template>