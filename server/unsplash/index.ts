import { rootConfig } from "rootConfig";
import qs from 'querystring';
import { Unsplash as Type} from "./types"

export class Unsplash {

  private accessToken = rootConfig.UNSPLASH_ACCESS_TOKEN

  private apiUrl = "https://api.unsplash.com"

  searchPhotos = async (term: string, options: object = {}): Promise<Type.SearchResult> => {
    const queryString = qs.stringify({
      ...options,
      query: term,
      client_id: this.accessToken
    })
    const res = await fetch(`${this.apiUrl}/search/photos?${queryString}`);
    const data = await res.json();
    return data;
  }
}