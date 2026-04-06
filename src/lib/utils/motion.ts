import type { Action } from 'svelte/action';

interface InViewOptions {
	delay?: number;
	threshold?: number;
}

/**
 * Svelte action that fades an element up when it enters the viewport.
 * One-shot: disconnects after triggering so it only plays once.
 * Respects prefers-reduced-motion automatically.
 *
 * Usage:
 *   <div use:inView>...</div>
 *   <div use:inView={{ delay: 150 }}>...</div>
 */
export const inView: Action<HTMLElement, InViewOptions | undefined> = (node, options) => {
	const delay = options?.delay ?? 0;
	const threshold = options?.threshold ?? 0.12;

	if (typeof window === 'undefined') return {};
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return {};

	node.style.opacity = '0';
	node.style.transform = 'translateY(18px)';
	node.style.transition = `opacity 0.55s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, transform 0.55s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`;

	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				node.style.opacity = '';
				node.style.transform = '';
				node.style.transition = '';
				observer.disconnect();
			}
		},
		{ threshold }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
};
