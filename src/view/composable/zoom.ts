import { useEventListener } from '@vueuse/core';


export const useZoom = (elm: Ref<HTMLElement | SVGElement | undefined>, domain: Ref<[number, number]>) => {

	useEventListener(elm, 'wheel', (e: WheelEvent) => {
		e.preventDefault();
		zoomChart(e.deltaY / 1000);
	});


	/**
	* 
	* @param pct - percent of range to zoom.
	* pct>0 zooms out. pct < 0 zooms in.
	*/
	function zoomChart(pct: number) {

		const [min, max] = domain.value;

		if ((pct < 0 && (max - min) < 0.00000001)
			|| (pct > 0 && (max - min) > Number.MAX_SAFE_INTEGER / 1000)) {
			return;
		}

		// prevent min/max overlap.
		if (pct <= -0.4) pct = -0.4;

		pct *= (max - min);
		domain.value = [min - pct, max + pct];

	}


}