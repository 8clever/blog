import { AlertColor, Snackbar, Slide, Alert } from "@mui/material";
import ReactDOM from 'react-dom';

export class Notif {

  private static get $el () {
    const id = "notif";
    let $snack = document.getElementById(id);
    if ($snack) return $snack

    $snack = document.createElement("div");
    $snack.id = id;
    document.body.prepend($snack);
    return $snack;
  }

  private static Render (visible: boolean, options: Notif.Options) {
    ReactDOM.render(
      <Snackbar 
        TransitionComponent={props => <Slide 
          {...props} 
          direction="left" />
        }
        open={visible}
        onClose={() => this.Render(false, options)}
        autoHideDuration={6000}
        anchorOrigin={{
          vertical: "top",
          horizontal: 'right'
        }}>
        <Alert severity={options.type || "error"}>{options.message}</Alert>
      </Snackbar>,
      this.$el,
      () => {
        if (visible) return;
        this.$el.remove();
      }
    )
  }

  public static Show (options: Notif.Options) {
    this.Render(true, options)
  }
}

export namespace Notif {
  export interface Options {
    type?: AlertColor;
    message: string;
  }
}

export default Notif;