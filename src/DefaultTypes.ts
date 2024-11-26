export interface Image {
  id: string;
  url: string;
  description: string;
  urls: {
    regular: string;
    small: string;
  }
}

interface Subject {
  id: string;
  urls: {
    regular: string;
    small: string;
  }
}

export interface ImageResults {
  results: Subject[];
  total: number;
  total_pages: number;
  error: string;
}



