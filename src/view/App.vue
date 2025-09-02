<script setup lang="ts">
import { useCurves } from '@/store/curves-store';
import { useSection } from '@/store/section-store';
import Header from '@/view/Header.vue';
import CurvesPage from '@/view/pages/CurvesPage.vue';
import TemplatesPage from '@/view/pages/TemplatesPage.vue';

const curves = useCurves();
const section = useSection();

</script>
<template>

	<div class="flex flex-col h-screen w-full">
		<Header></Header>

		<CurvesPage v-if="section.section == 'curves'" />
		<TemplatesPage v-else-if="section.section == 'templates'" />
	</div>
</template>