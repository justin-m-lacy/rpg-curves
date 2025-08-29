<script setup lang="ts">
import { loadJsonStr } from '@/export/files';
import { CurveModel } from '@/model/curves/curve-model';
import { useCurves } from '@/store/curves-store';
import { useFileSelect } from '@/view/composable/file-select';

const showMerge = ref(false);

const curveStore = useCurves();

function exportData() {

	const res: any = {
	}

	const curves: ReturnType<CurveModel['toJSON']>[] = [];

	for (const curve of curveStore.curves.values()) {
		curves.push(curve.toJSON());
	}

	return {
		curves
	};

}

function openMerge() {
	showMerge.value = true;
}

const fileSelect = useFileSelect(loadFile);

async function loadFile(files: FileList) {
	try {
		const fileData = await loadJsonStr(files);

	} catch (err) {
		console.error(err);
	}
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
		<button type="button" @click="exportData">Export Curves</button>
		<button type="button"
				@click.stop.prevent="fileSelect.open"
				@drop.prevent="fileDrop" @dragover="fileDrag"
				title="Import Curves">
			[Import Curves]
		</button>
	</div>
</template>