import { marked } from 'marked';
import DOMPurify from 'dompurify';

export async function printOutput(markdown: string) {
	const html = DOMPurify.sanitize(await marked.parse(markdown));

	console.log('Printing:', html);

	const iframe = document.createElement('iframe');
	iframe.style.position = 'fixed';
	iframe.style.bottom = '0';
	iframe.style.right = '0';
	iframe.style.width = '0';
	iframe.style.height = '0';
	iframe.style.border = '0';

	document.body.appendChild(iframe);

	iframe.srcdoc = html;

	iframe.onload = () => {
		iframe.contentWindow?.focus();
		iframe.contentWindow?.print();

		setTimeout(() => {
			iframe.remove();
		}, 1000);
	};
}
