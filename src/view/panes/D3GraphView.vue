<script setup lang="ts">
import { CurveModel } from "@/model/curve-model";
import { CurveSumModel } from "@/model/curve-sum";
import { useCurves } from "@/store/curves-store";
import { useSelect } from "@/store/select-store";
import { useRange } from "@/view/composable/range-store";
import NewComposite from "@/view/controls/NewComposite.vue";
import Range from "@/view/controls/Range.vue";
import D3Graph from "@/view/panes/D3Graph.vue";

const props = defineProps<{
	curves: CurveModel[]
}>();

const selects = useSelect();
const domain = useRange(0, 100);

function onNewComposite(m: CurveSumModel) {
	useCurves().add(m);
}

</script>
<template>
	<div class="flex flex-col w-full h-full items-center">
		<D3Graph :curves="curves" v-model:domain="domain" />
		<Range title="x-range:" v-model="domain" />
		<NewComposite :curves="curves" @create="onNewComposite" />
	</div>
</template>