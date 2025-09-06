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
	viewRect: Ref<DOMRect | undefined>
) => {

	// domain, range when drag began.
	const startDomain = [0, 0];

	// domain,range units per view-units
	let xScale: number = 10;

	const clickPt = { x: 0, y: 0 };

	const dragging = shallowRef(false);

	const onDown = (evt: MouseEvent) => {

		if (!viewRect.value) return;

		dragging.value = false;

		startDomain[0] = domain.value[0];
		startDomain[1] = domain.value[1];

		xScale = (startDomain[1] - startDomain[0]) / viewRect.value.width;

		clickPt.x = evt.clientX;
		clickPt.y = evt.clientY;

		window.addEventListener('mousemove', onMove);

	}

	const onMove = (evt: MouseEvent) => {

		dragging.value = true;

		const dx = (clickPt.x - evt.clientX) * xScale;

		domain.value[0] = startDomain[0] + dx;
		domain.value[1] = startDomain[1] + dx;

	}

	const onUp = (_: MouseEvent) => {

		window.removeEventListener('mousemove', onMove);

		if (!dragging.value || !el.value) return;
		dragging.value = false;

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

	return {
		dragging
	}

}