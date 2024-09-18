import { v2 as cloudinary } from 'cloudinary';

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
  cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  });

  let response: Record<string, any> = {
    message: '',
  };

  try {
    log("Request path:", req.path);
    log("Request method:", req.method);

    if (req.path === '/upload' && req.method === 'POST') {
      const { base64Image } = JSON.parse(req.body);

      if (!base64Image) {
        response.message = 'Missing base64 image in the request';
        return res.json(response);
      }

      try {
        const result = await cloudinary.uploader.upload(base64Image, {
          folder: 'transformations',
          resource_type: 'auto',
        });
        log('Upload result:', result);
        response.message = 'Image uploaded successfully';
        response.image = result;
        return res.json(response);
      } catch (uploadError) {
        log('Upload failed: ' + (uploadError as Error).message);
        response.message = 'Image upload failed';
        return res.json(response);
      }
    }

    // Handle transformation requests
    const path = req.path;
    if (
      path.split('/')[1] === 'transformation_url_gen' &&
      req.method === 'POST'
    ) {
      const type: UrlGenType = path.split('/')[2];
      const urlGenBody: UrlGenBody = JSON.parse(req.body);

      if (!urlGenBody.publicId) {
        response.message = 'Missing publicId in the request';
        return res.json(response);
      }

      response.transformedUrl = '';
      response.message = 'Image transformed successfully';
      response.publicId = urlGenBody.publicId;

      switch (type) {
        case 'restore':
          response.transformedUrl = cloudinary.url(urlGenBody.publicId, {
            width: urlGenBody.width,
            height: urlGenBody.height,
            effect: 'gen_restore',
          });
          break;
        case 'recolor':
          response.transformedUrl = cloudinary.url(urlGenBody.publicId, {
            effect: `gen_recolor:prompt_(${urlGenBody.objectToRecolor});to-color_${urlGenBody.color}`,
          });
          break;
        case 'remove':
          response.transformedUrl = cloudinary.url(urlGenBody.publicId, {
            effect: `gen_remove:prompt_${urlGenBody.prompt}`,
          });
          break;
        case 'removeBackground':
          response.transformedUrl = cloudinary.url(urlGenBody.publicId, {
            effect: 'bgremoval',
          });
          break;
        case 'fill':
          response.transformedUrl = cloudinary.url(urlGenBody.publicId, {
            background: 'gen_fill',
            width: urlGenBody.width,
            height: urlGenBody.height,
            aspect_ratio: urlGenBody.ar,
            crop: 'pad',
          });
          break;
        default:
          error('Invalid transformation type');
          response.message = 'Invalid transformation type';
          return res.json(response);
      }

      log('Transformation result:', response.transformedUrl);
      return res.json(response);
    } else {
      log('Invalid request');
      response.message = 'Invalid Route';
      return res.json(response);
    }
  } catch (err) {
    log('Internal Server Error: ' + (err as Error).message);
    return res.json({ message: 'Internal Server Error' });
  }
};
