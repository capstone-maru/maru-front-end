import axios from 'axios';

import { type GetImageURLDTO } from './image.dto';

export const getImageURL = async (fileExtension: string) =>
  await axios.get<GetImageURLDTO>(
    `/api/image/upload?extension=${fileExtension}`,
  );

export const putImage = async (url: string, imageFile: File) =>
  await axios.put(url, imageFile);
