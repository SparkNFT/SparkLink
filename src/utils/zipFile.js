import JSZip from 'jszip';
//import { saveAs } from 'file-saver';

export const generateZipFile = (
	zipName, files,
	options = { type: 'blob', compression: 'DEFLATE' }
) => {
	// eslint-disable-next-line no-unused-vars
	return new Promise((resolve, reject) => {
		const zip = new JSZip();
		for (let i = 0; i < files.length; i++) {
			zip.file(files[i].name, files[i]);
		}
		zip.generateAsync(options).then(function (blob) {
			zipName = zipName || Date.now() + '.zip';
			const zipFile = new File([blob], zipName, {
				type: 'application/zip',
			});
			//saveAs(zipFile, 'example.zip');
			resolve(zipFile);
		});
	});
}
