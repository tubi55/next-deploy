import { createUploadthing } from 'uploadthing/next';
const f = createUploadthing();
const auth = req => ({ id: 'dcodelab' }); // 인증 함수

//file업로드 관련 route함수
export const ourFileRouter = {
	//이미지는 파일당 최대 4mb까지 등록 가능
	imageUploader: f({ image: { maxFileSize: '4MB' } })
		.middleware(async ({ req }) => {
			const user = await auth(req);
			if (!user) throw new Error('Unauthorized');
			return { userId: user.id };
		})
		//파일업로드가 성공적으로 완료되었을때 실행될 complete함수
		.onUploadComplete(async ({ metadata, file }) => {
			console.log('Upload complete for userId:', metadata.userId);
			console.log('file url', file.url);
			return { uploadedBy: metadata.userId };
		})
};
