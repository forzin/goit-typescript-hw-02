export interface Image {
  id: string;
  url: string;
  description: string;
  urls: {
    regular: string;
    small: string;
  }
}

export interface ImageResults {
  data: {
    results: [];
    total: number;
    total_pages: number;
    error: string;
  }
}



