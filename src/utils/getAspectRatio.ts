import { ImageDimensions, ImageCrop } from 'lib/cms/types';

export default (imageDimensions?: ImageDimensions, imageCrop?: ImageCrop): number => {
  if (!imageDimensions || !imageCrop) return 0;

  const width: number = imageDimensions?.width || 0;
  const height: number = imageDimensions?.height || 0;
  const top: number = imageCrop?.top || 0;
  const bottom: number = imageCrop?.bottom || 0;
  const left: number = imageCrop?.left || 0;
  const right: number = imageCrop?.right || 0;

  return ((height * (1 - bottom - top)) / (width * (1 - left - right))) * 100;
};
