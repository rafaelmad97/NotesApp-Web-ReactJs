import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface InformationDialogProps {}

const InformationDialogComponent: React.FC<InformationDialogProps> = (
  props
) => {
  return (
    <Dialog open={true}>
      <DialogTitle></DialogTitle>
      <DialogContent>
        <DialogContentText></DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button> ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InformationDialogComponent;
