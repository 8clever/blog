import { NoSsr } from "@mui/material"

interface Props {
  date?: Date | number | string;
}

export const DateTime = (props: Props) => {
  const date = new Date(props.date || new Date());

  return (
    <NoSsr defer fallback={<>&nbsp;</>}>
      {date.toLocaleDateString()} {date.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "numeric"
      })}
    </NoSsr>
  )
}