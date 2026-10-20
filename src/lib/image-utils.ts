/**
 * High-quality WebP image conversion and utility suite.
 * Converts any user-uploaded image into a high-quality WebP file in the browser
 * before storage or preview.
 */

export interface WebPConversionResult {
  file: File;
  dataUrl: string;
  blob: Blob;
  name: string;
  width: number;
  height: number;
  originalSize: number;
  webpSize: number;
  savedPercentage: number;
}

export interface ConvertOptions {
  /** Quality between 0.0 and 1.0. Default: 0.92 (High quality, visually lossless) */
  quality?: number;
  /** Maximum width constraint. Default: 2560 */
  maxWidth?: number;
  /** Maximum height constraint. Default: 2560 */
  maxHeight?: number;
}

/**
 * Converts an image File or Blob to high-quality WebP format.
 *
 * @param file The original image File or Blob
 * @param options Quality and maximum dimension configurations
 * @returns WebPConversionResult with the WebP File, dataUrl, dimensions, and compression statistics
 */
export async function convertImageToWebP(
  file: File | Blob,
  options: ConvertOptions = {},
): Promise<WebPConversionResult> {
  const { quality = 0.92, maxWidth = 2560, maxHeight = 2560 } = options;

  const originalSize = file.size;
  const originalName = file instanceof File ? file.name : "upload.jpg";
  const baseName = originalName.replace(/\.[^/.]+$/, "");
  const webpName = `${baseName}.webp`;

  return new Promise((resolve, reject) => {
    // Read the file as an image element
    const reader = new FileReader();

    reader.onerror = () => reject(new Error("Failed to read image file"));

    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Failed to decode image data"));

      img.onload = () => {
        let { width, height } = img;

        // Downscale only if image exceeds maximum limits while maintaining aspect ratio
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        // Create canvas with high-quality smoothing
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Unable to create canvas 2D rendering context"));
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas output to high-quality WebP Blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("WebP conversion failed"));
              return;
            }

            const webpFile = new File([blob], webpName, {
              type: "image/webp",
              lastModified: Date.now(),
            });

            const dataUrl = canvas.toDataURL("image/webp", quality);
            const webpSize = blob.size;
            const savedPercentage =
              originalSize > 0
                ? Math.round(
                    Math.max(0, (1 - webpSize / originalSize) * 100),
                  )
                : 0;

            resolve({
              file: webpFile,
              dataUrl,
              blob,
              name: webpName,
              width,
              height,
              originalSize,
              webpSize,
              savedPercentage,
            });
          },
          "image/webp",
          quality,
        );
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Formats bytes to human-readable string (e.g. "142 KB", "1.4 MB").
 */
export function formatBytes(bytes: number, decimals: number = 1): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
