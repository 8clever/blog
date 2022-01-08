
export namespace Unsplash {
  export interface Photo {
    id: string;
    alt_description: "aerial photo of city during golden hour"
    links: {
      download: string;
      download_location: string;
      html: string;
      self: string;
    }
    urls: {
      full: string;
      raw: string;
      regular: string;
      small: string;
      thumb: string;
    }
    user: {
      name: string;
    }
  }

  export interface SearchResult {
    results: Photo[],
    total: number;
    total_pages: number;
  }
}