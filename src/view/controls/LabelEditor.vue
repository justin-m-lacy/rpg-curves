<script setup lang="ts">
const model = defineModel<string>();

const inputRef = shallowRef<HTMLInputElement>();
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
			inputRef.value?.select();
		} else {
			window.removeEventListener('pointerdown', onClick);
		}
	})

}
</script>
<template>
	<input v-if="editing" ref="inputRef" type="text"
		   class="bg-white px-0 py-0 my-0 w-full" size="16" v-model="model"
		   @blur="setEditing(false)"
		   @onchanged="setEditing(false)">
	<div v-else class="py-0 my-0" @click="setEditing(true)">
		{{ model }}
	</div>
</template>