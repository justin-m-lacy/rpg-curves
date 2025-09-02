<script setup lang="ts">
import { decodeCurves } from '@/export/decode-curve';
import { encodeCurves } from '@/export/encode-curve';
import { loadJsonStr, useFileLink } from '@/export/files';
import { CurveModel } from '@/model/curve-model';
import { useCurves } from '@/store/curves-store';
import { useFileSelect } from '@/view/composable/file-select';

const showMerge = ref(false);

const curveStore = useCurves();

function exportData() {

	const json = encodeCurves(curveStore.curves as Record<string, CurveModel>);
	useFileLink(json, 'curves');

}

const fileSelect = useFileSelect(loadFile);

async function loadFile(files: FileList) {
	try {

		const fileData = await loadJsonStr(files)!;
		const curves = decodeCurves(fileData);

		if (!curves?.length) return;

		curveStore.deleteAll();
		for (const model of curves) {
			curveStore.add(model);
		}

	} catch (err) {
		console.error(err);
	}
}

function editCurves() {
}

function editTemplates() {

}

const fileDrop = (e: DragEvent) => {

	const files = e.dataTransfer?.files;
	if (files && files.length > 0) {
		loadFile(files);
	}

}
const fileDrag = (e: DragEvent) => {
	e.preventDefault();
	e.dataTransfer!.dropEffect = 'copy';
}

</script>
<template>
	<!--<MergePopup v-if="showMerge" @close="showMerge = false" />-->
	<div class="h-min w-full px-4 bg-slate-900 text-slate-100
		flex gap-x-6 py-0.5"
		 v-bind="$attrs">
		<button type="button" @click="editCurves">Curves</button>
		<button type="button" @click="editTemplates">Templates</button>
		<button type="button" @click="exportData">Export Curves</button>
		<button type="button"
				@click.stop.prevent="fileSelect.open"
				@drop.prevent="fileDrop" @dragover="fileDrag"
				title="Import Curves">
			[Import Curves]
		</button>
	</div>
</template>