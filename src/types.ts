export interface SearchResult {
  title: string;
  link: string;
  snippet: string;
  image?: string;
  price?: string;
}

export interface SearchResponse {
  items: SearchResult[];
  searchInformation: {
    totalResults: string;
    searchTime: number;
  };
}