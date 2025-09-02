<script setup lang="ts">
import { DataTemplate } from '@/model/data-template';
import { useTemplates } from '@/store/templates-store';
import LabelEditor from '@/view/controls/LabelEditor.vue';

defineProps();
const templates = useTemplates();

function onSelect(event: MouseEvent, temp: DataTemplate) {
	templates.viewed = temp;
}

function onDelete(temp: DataTemplate) {
	templates.remove(temp);
}

</script>
<template>
	<div class="flex flex-col gap-y-3">
		<div v-for="temp in templates.templates" :key="temp.id"
			 class="flex items-center gap-x-2 py-0" :class="{
				'font-semibold': temp.name == templates.viewed?.name
			}"
			 @click="onSelect($event, temp)">

			<button @click="onDelete(temp)" class="text-[0.5rem]">❌</button>
			<LabelEditor v-model="temp.name" />
		</div>
	</div>

</template>