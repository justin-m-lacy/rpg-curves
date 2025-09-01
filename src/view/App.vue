<script setup lang="ts">
import { CurveModel } from '@/model/curve-model';
import { useCreators } from '@/store/creators';
import { useCurves } from '@/store/curves-store';
import { useSelect } from '@/store/select-store';
import { useViewCurves } from '@/store/view-curves';
import NewCurve from '@/view/controls/NewCurve.vue';
import Header from '@/view/Header.vue';
import CurveEditor from '@/view/panes/CurveEditor.vue';
import CurvesList from '@/view/panes/CurvesList.vue';
import D3GraphView from '@/view/panes/D3GraphView.vue';

const creators = useCreators();
const select = useSelect();
const view = useViewCurves();

const curves = useCurves();

function onNewCurve(model: CurveModel) {
	model.label = curves.uniqueName();
	curves.add(model);
}
</script>
<template>

	<div class="flex flex-col h-screen w-full">
		<Header></Header>

		<div class="h-full flex gap-x-2 justify-stretch items-stretch">
			<div class="flex flex-col gap-y-1.5 p-2 py-4 min-w-36 w-40 bg-white/75 min-h-full">
				<NewCurve @newCurve="onNewCurve" />
				<CurvesList />
			</div>

			<div class="h-full flex flex-col gap-y-1 grow-4">
				<!--<GraphView v-if="chartsLoaded" class="basis-1/2"
						   :curves="select.selected" />-->
				<D3GraphView class="basis-1/2" :curves="view.viewing" />
				<div class="flex flex-wrap gap-y-3">
					<CurveEditor v-for="curve in select.selected" class="flex justify-stretch"
								 :model="curve" :key="curve.id" />
				</div>
			</div>

		</div>
	</div>
</template>