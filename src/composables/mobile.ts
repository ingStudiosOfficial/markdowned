import { onMounted, onUnmounted, ref } from 'vue';

const isMobile = ref<boolean>(false);
let matcher: MediaQueryList | null = null;

export function useMobile() {
	function checkScreen(e: MediaQueryListEvent) {
		isMobile.value = e.matches;
	}

	onMounted(() => {
		matcher = window.matchMedia('(max-width: 768px)');
		isMobile.value = matcher.matches;
		matcher.addEventListener('change', checkScreen);
	});

	onUnmounted(() => {
		matcher?.removeEventListener('change', checkScreen);
	});

	return { isMobile };
}
