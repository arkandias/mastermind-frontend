import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";

type SnackErrorProps = {
  error: Error;
};

export const SnackError = ({ error }: SnackErrorProps): JSX.Element => {
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openTooltip, setOpenTooltip] = useState<boolean>(false);

  useEffect(() => {
    if (error) setOpenSnack(true);
  }, [error]);

  const details: string[] = [];

  if (axios.isAxiosError(error)) {
    if (error?.response) {
      details.push(
        `status code: ${error.response.status} (${error.response.statusText})`
      );
      details.push(
        "headers: " + JSON.stringify(error.response.headers, null, 2)
      );
      details.push("data: " + JSON.stringify(error.response.data, null, 2));
    } else {
      details.push("config: " + JSON.stringify(error.config, null, 2));
    }
  }

  const action = (
    <>
      <Button
        onClick={() => {
          setOpenSnack(false);
          setOpenDialog(true);
        }}
        color="inherit"
        size="small"
        disabled={!details.length}
      >
        Details
      </Button>
      <IconButton
        onClick={() => setOpenSnack(false)}
        color="inherit"
        size="small"
      >
        <CloseIcon fontSize="inherit" />
      </IconButton>
    </>
  );

  const copy = async () => {
    await navigator.clipboard.writeText(details.join("\n"));
    setOpenTooltip(true);
    setTimeout(() => setOpenTooltip(false), 1000);
  };

  return (
    <>
      <Snackbar open={openSnack}>
        <Alert severity="error" variant="filled" elevation={6} action={action}>
          {error?.toString() ?? "Error"}
        </Alert>
      </Snackbar>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        scroll={"paper"}
      >
        <DialogTitle>Error Details</DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText style={{ whiteSpace: "pre-wrap" }}>
            {details.join("\n")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Tooltip
            title="Copied"
            open={openTooltip}
            disableFocusListener
            disableHoverListener
            disableTouchListener
          >
            <Button onClick={copy}>Copy</Button>
          </Tooltip>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
