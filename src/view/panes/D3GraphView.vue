<script setup lang="ts">
import { CurveModel } from "@/model/curve-model";
import { CurveSumModel } from "@/model/curve-sum";
import { useCurves } from "@/store/curves-store";
import { useSelect } from "@/store/select-store";
import { useRange } from "@/view/composable/range-store";
import Legend from "@/view/controls/Legend.vue";
import NewComposite from "@/view/controls/NewComposite.vue";
import Range from "@/view/controls/Range.vue";
import D3Graph from "@/view/panes/D3Graph.vue";

defineProps<{
	curves: CurveModel[]
}>();

const elRef = shallowRef<HTMLElement>();

const selects = useSelect();
const domain = useRange(0, 100);
const range = useRange(0, 100);

function onNewComposite(m: CurveSumModel) {
	useCurves().add(m);
}

</script>
<template>
	<div ref="elRef" class="flex flex-col w-full items-center gap-y-1">
		<D3Graph :curves="curves" class="min-h-120 shrink-0"
				 v-model:domain="domain" v-model:range="range" />
		<div class="flex gap-x-6">
			<Range title="domain:" v-model="domain"
				   class="bg-blue-300 rounded-lg py-1 px-2" />
			<Range title="range:" v-model="range"
				   class="bg-orange-200 rounded-lg py-1 px-2" />
		</div>
		<Legend :curves="curves" class="my-3" />
		<NewComposite :curves="curves" @create="onNewComposite" />
	</div>
</template>