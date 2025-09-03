import { useEventListener } from "@vueuse/core";
import { onUnmounted, Ref, shallowRef } from 'vue';

/**
 * Continuously change range of numbers as mouse is dragged.
 * @param el
 * @param domain
 * @param range 
 */
export const useFuncDrag = (el: Ref<HTMLElement | SVGElement | undefined>,
	domain: Ref<[number, number]>,
	range: Ref<[number, number]>,
	viewRect: Ref<DOMRect | undefined>
) => {

	// domain, range when drag began.
	const startDomain = [0, 0];
	const startRange = [0, 0];

	// domain,range units per view-units
	let xScale: number = 10;
	let yScale: number = 10;

	const clickPt = { x: 0, y: 0 };

	const active = shallowRef(false);

	const onDown = (evt: MouseEvent) => {

		if (!viewRect.value) return;

		active.value = false;

		startDomain[0] = domain.value[0];
		startDomain[1] = domain.value[1];
		startRange[0] = range.value[0];
		startRange[1] = range.value[1];

		xScale = (startDomain[1] - startDomain[0]) / viewRect.value.width;
		yScale = (startRange[1] - startRange[0]) / viewRect.value.height;

		clickPt.x = evt.clientX;
		clickPt.y = evt.clientY;

		window.addEventListener('mousemove', onMove);

	}

	const onMove = (evt: MouseEvent) => {

		active.value = true;

		const dx = (clickPt.x - evt.clientX) * xScale;
		const dy = (clickPt.y - evt.clientY) * yScale;

		domain.value[0] = startDomain[0] + dx;
		domain.value[1] = startDomain[1] + dx;

	}

	const onUp = (_: MouseEvent) => {

		window.removeEventListener('mousemove', onMove);

		if (!active.value || !el.value) return;
		active.value = false;

		// swallow any click events.
		window.addEventListener('click', (e) => {

			e.preventDefault();
			e.stopPropagation();

		}, { capture: true, once: true });

	}

	onUnmounted(() => {
		window.removeEventListener('mousemove', onMove);
	});

	useEventListener(el, 'mousedown', onDown);
	useEventListener('mouseup', onUp);

}