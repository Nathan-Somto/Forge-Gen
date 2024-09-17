import { Client, Users } from 'node-appwrite';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { transform } from 'typescript';

interface UrlGenBody {
  objectToRecolor: string;
  color: string;
  prompt: string;
  ar: '1:1' | '4:3' | '16:9';
  width: number;
  height: number;
  publicId: string;
}
type UrlGenType =
  | 'restore'
  | 'fill'
  | 'remove'
  | 'recolor'
  | 'removeBackground';
export default async ({ req, res, log, error }: any) => {
 
  try {
    cloudinary.config({
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      shorten: true,
    });
    if (req.path === '/upload' && req.method === 'POST') {
      const { base64Image } = req.body;
      const result = await cloudinary.uploader.upload(base64Image);
      return res.json({
        image: result,
        message: 'successfully uploaded image',
      });
    }
    const path = req.path;
    // route like so /transformation_url_gen/:type
    if (
      path.split('/')[1] !== 'transformation_url_gen' &&
      req.method !== 'POST'
    ) {
      return error('Invalid route');
    }
    const type: UrlGenType = path.split('/').pop();
    let urlGenBody: UrlGenBody = req.body;
    let response = {
      transformedUrl: '',
      publicId: urlGenBody?.publicId,
      message: 'successfully generated url',
    };
    switch (type) {
      case 'restore':
        response.transformedUrl = cloudinary.image(urlGenBody.publicId, {
          width: urlGenBody.width,
          height: urlGenBody.height,
          effect: 'gen_restore',
        });
        break;
      case 'recolor':
        response.transformedUrl = cloudinary.image(urlGenBody.publicId, {
          effect: `gen_recolor:prompt_(${urlGenBody.objectToRecolor});to-color_${urlGenBody.color}`,
        });
        break;
      case 'remove':
        response.transformedUrl = cloudinary.image(urlGenBody.publicId, {
          effect: `gen_remove:prompt_${urlGenBody.prompt}`,
        });
      case 'removeBackground':
        response.transformedUrl = cloudinary.image(urlGenBody.publicId, {
          effect: 'bgremoval',
        });
      case 'fill':
        response.transformedUrl = cloudinary.image(urlGenBody.publicId, {
          background: 'gen_fill',
          width: urlGenBody.width,
          height: urlGenBody.height,
          aspect_ratio: urlGenBody.ar,
          crop: 'pad',
        });
        break;
      default:
        error('Invalid transformation type');
        return;
    }
    return res.json(response);
  } catch (err) {
    if (err instanceof Error) {
      error('Internal Server Error: ' + err.message);
    }
  }
};
