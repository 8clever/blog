import ReactDOM from "react-dom";
import { Alert, Slide, Snackbar } from '@mui/material'


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

    Api.Notif(true, json.errors[0]);

    throw new Error(json.errors[0]);
  }

  public static Notif = (visible: boolean, message: string) => {
    ReactDOM.render(
      <Snackbar 
        TransitionComponent={props => <Slide 
          {...props} 
          direction="left" />
        }
        open={visible}
        onClose={() => this.Notif(false, message)}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "top",
          horizontal: 'right'
        }}>
        <Alert severity="error">{message}</Alert>
      </Snackbar>,
      this.getSnackEl()
    )
  }

  private static getSnackEl = () => {
    const id = "notif";
    let $snack = document.getElementById(id);
    if ($snack) return $snack

    $snack = document.createElement("div");
    $snack.id = id;
    document.body.appendChild($snack);
    return $snack;
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