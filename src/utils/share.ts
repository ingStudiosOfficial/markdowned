import mime from 'mime';

export async function shareMarkdown(code: string, filename: string) {
	if (!('share' in navigator)) return;

	const file = new File([code], filename, {
		type: mime.getType(filename) || 'text/markdown',
	});

	const shareData: ShareData = {
		title: `Share ${filename}`,
		files: [file],
	};

	try {
		if (!navigator.canShare(shareData)) {
			console.error('Cannot share data.');
			return;
		}

		await navigator.share(shareData);
	} catch (error) {
		console.error('Error while sharing:', error);
	}
}
