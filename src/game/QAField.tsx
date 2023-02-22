import { Autocomplete, TextField, Typography } from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import * as React from "react";
import { ScoredLabelType } from "./Game";

type QAFieldProps = {
  label: string;
  value: ScoredLabelType | null;
  setValue: React.Dispatch<React.SetStateAction<ScoredLabelType | null>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  options: ScoredLabelType[] | null;
  formatter: (option: ScoredLabelType) => string;
  getOptionDisabled: (option: ScoredLabelType) => boolean;
  loading: boolean;
  disabled?: boolean;
};

export const QAField: (props: QAFieldProps) => JSX.Element = ({
  label,
  value,
  setValue,
  inputValue,
  setInputValue,
  options,
  formatter,
  getOptionDisabled,
  loading,
  disabled,
}) => (
  <Autocomplete
    options={options ?? []}
    value={value}
    inputValue={inputValue}
    isOptionEqualToValue={(option, value) => option.label === value.label}
    onChange={(event, newValue) => setValue(newValue)}
    onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
    renderInput={(params) => (
      <TextField
        {...params}
        InputProps={{
          ...params.InputProps,
          style: { fontFamily: "monospace" },
        }}
        InputLabelProps={{ style: { fontFamily: "monospace" } }}
        label={label}
        size="small"
        variant="outlined"
        fullWidth
      />
    )}
    renderOption={(props, option) => (
      <Typography {...props} component="li" fontFamily="monospace">
        {formatter(option)}
      </Typography>
    )}
    filterOptions={
      loading ? undefined : createFilterOptions({ matchFrom: "start" })
    }
    getOptionDisabled={getOptionDisabled}
    loading={loading}
    disabled={disabled}
  />
);
