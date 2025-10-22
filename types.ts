
export interface ImageState {
  file: File;
  url: string;
}

export interface EditedImage {
  imageUrl: string | null;
  text: string | null;
}

export interface GenerativePart {
    inlineData: {
        data: string;
        mimeType: string;
    };
}
