import { v2 as cloudinary } from "cloudinary";

function resolveCloudName() {
  if (process.env.CLOUDINARY_CLOUD_NAME) {
    return process.env.CLOUDINARY_CLOUD_NAME;
  }

  const url = process.env.CLOUDINARY_URL;

  if (!url) {
    return undefined;
  }

  try {
    return new URL(url).hostname;
  } catch {
    return undefined;
  }
}

cloudinary.config({
  cloud_name: resolveCloudName(),
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const AVATAR_FOLDER = "gigclip/avatars";

export function uploadAvatar(buffer: Buffer) {
  return new Promise<{ url: string; publicId: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: AVATAR_FOLDER,
        resource_type: "image",
        transformation: [
          { width: 480, height: 480, crop: "fill", gravity: "face" },
        ],
      },
      (error, result) => {
        if (error || !result) {
          reject(new Error(error?.message ?? "Cloudinary upload failed."));
          return;
        }

        resolve({ url: result.secure_url, publicId: result.public_id });
      },
    );

    stream.end(buffer);
  });
}

export async function deleteAvatar(publicId: string | null) {
  if (!publicId) {
    return;
  }

  try {
    await cloudinary.uploader.destroy(publicId, { invalidate: true });
  } catch {
    return;
  }
}
