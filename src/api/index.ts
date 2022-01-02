
export class Api {

  constructor (
    private url: string = ""
  ) {}

  async post<T> (body: T) {
    const res = await fetch(this.url, {
      method: "POST",
      credentials: "same-origin",
      body: JSON.stringify(body)
    });

    const json = await res.json() as ResponseSuccess<T> | ResponseError;
    if (json.message === "SUCCESS") {
      return json;
    }

    throw new Error(json.errors[0]);
  }
}


export type ResponseSuccess<T> = {
  message: "SUCCESS",
  data: T
}

export type ResponseError = {
  message: "ERROR",
  errors: string[]
}