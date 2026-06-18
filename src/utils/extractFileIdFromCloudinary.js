export const extractFileIdFromCloudinary = url => {
  const fileId = url.split('/').slice(-2).join('/').split('.')[0];
  return fileId;
};
