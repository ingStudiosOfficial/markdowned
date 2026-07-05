import type { korModal } from '@kor-ui/kor';
import { ref } from 'vue';

const apiDialog = ref<korModal | null>(null);
const nameDialog = ref<korModal | null>(null);

export function useDialog() {
	return { apiDialog, nameDialog };
}
