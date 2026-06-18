import { access, mkdir } from 'node:fs/promises';

export const createDirIfNotExist = async url => {
  try {
    await access(url);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await mkdir(url);
    }
  }
};
