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

    const Notif = (await import("./Notif")).default;

    Notif.Show({
      message: json.errors[0]
    })

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