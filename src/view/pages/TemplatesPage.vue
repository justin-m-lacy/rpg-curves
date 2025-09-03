<script setup lang="ts">
import { useTemplates } from '@/store/templates-store';
import TemplateEditor from '@/view/panes/TemplateEditor.vue';
import TemplatesList from '@/view/panes/TemplatesList.vue';

const templates = useTemplates();

function onClickNew() {
	templates.create('template');
}

</script>
<template>
	<div class="h-full flex gap-x-2 justify-stretch items-start">
		<div class="flex flex-col gap-y-1.5 p-2 py-4 min-w-36 w-40 bg-white/75 min-h-full">
			<button type="button" @click="onClickNew"
					class="rounded-md btn">New Template</button>
			<TemplatesList />
		</div>

		<div class="h-full flex flex-col gap-y-1 grow-4">
			<TemplateEditor v-if="templates.viewed" :data="templates.viewed" />
		</div>

	</div>
</template>