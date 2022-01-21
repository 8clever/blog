
import { google } from "googleapis";

export class GoogleIndex {

  auth = new google.auth.GoogleAuth({
    keyFile: process.cwd() + '/keys/google-svc.json',
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  index = google.indexing({
    version: "v3",
    auth: this.auth,
  });

  async updateUrl(url: string, type: "URL_UPDATED" | "URL_DELETED") {
    return this.index.urlNotifications.publish({
      requestBody: {
        type,
        url
      }
    })
  }
}