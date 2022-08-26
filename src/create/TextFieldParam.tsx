import { TextField } from "@mui/material";
import { useState } from "react";
import { GameParamType } from "src/create/gameParams";

type TextFieldParamProps = {
  param: GameParamType;
  helpers: boolean;
};

export const TextFieldParam: (props: TextFieldParamProps) => JSX.Element = ({
  param,
  helpers,
}) => {
  const [value, setValue] = useState<string>("");

  return (
    <TextField
      label={param.label}
      value={value}
      onChange={(event) => {
        setValue(event.target.value);
        param.update(event.target.value);
      }}
      error={!param.valid && helpers}
      helperText={!param.valid && helpers ? param.helper : null}
      size="small"
      variant="outlined"
      fullWidth
    />
  );
};
