export async function shareMarkdown(code: string, filename: string) {
	if (!('share' in navigator)) return;

	const file = new File([code], filename, {
		type: 'text/plain', // DO NOT CHANGE THIS TO MARKDOWN IT WILL HAVE A NOTALLOWEDERROR IN WEB SHARE
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
