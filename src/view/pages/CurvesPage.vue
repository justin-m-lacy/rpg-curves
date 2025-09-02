<script setup lang="ts">
import { CurveModel } from '@/model/curve-model';
import { useCurves } from '@/store/curves-store';
import { useSelect } from '@/store/select-store';
import { useViewCurves } from '@/store/view-curves';
import NewCurve from '@/view/controls/NewCurve.vue';
import CurveEditor from '@/view/panes/CurveEditor.vue';
import CurvesList from '@/view/panes/CurvesList.vue';
import D3GraphView from '@/view/panes/D3GraphView.vue';

const select = useSelect();
const viewCurves = useViewCurves();
const curves = useCurves();

function onNewCurve(model: CurveModel) {
	model.label = curves.uniqueName();
	curves.add(model);
}

</script>
<template>
	<div class="h-full flex gap-x-2 justify-stretch items-start">
		<div class="flex flex-col gap-y-1.5 p-2 py-4 min-w-36 w-40 bg-white/75 min-h-full">
			<NewCurve @newCurve="onNewCurve" />
			<CurvesList />
		</div>

		<div class="h-full flex flex-col gap-y-1 grow-4">
			<D3GraphView :curves="(viewCurves.viewing as CurveModel[])" />
			<div class="flex flex-wrap gap-y-3">
				<CurveEditor v-for="model in select.selected" class="flex"
							 :key="model.id" :model="(model as CurveModel)" />
			</div>
		</div>

	</div>
</template>