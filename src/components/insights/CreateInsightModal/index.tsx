import React, {useState} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";
import {addInsightMock, availableDatesMockOptions, severityOptions, typeOptions} from "../../../api/insightsApi.ts";
import moment from "moment/moment";
import {useDispatch} from "react-redux";
import {updateDataFlag} from "../../../store/slices";

export interface InsightModalProps {
  showModal: boolean;
  onHide: () => void;
}
const CreateInsightModalComponent: React.FC<InsightModalProps> = (props: InsightModalProps) => {
  const [diagnosticDate, setDiagnosticDate] = useState('');
  const [faultType, setFaultType] = useState('');
  const [severity, setSeverity] = useState('');
  const dispatch = useDispatch();

  const isSaveAvailable = diagnosticDate && faultType && severity;

  const handleSave = () => {
    if (isSaveAvailable) {
      addInsightMock(diagnosticDate, faultType, severity)
        .then(() => {
          dispatch(updateDataFlag(true));
          handleClose();
        })
        .catch((e) => {
          console.error('An error occurred while adding insight', e)
        })
    }
  }

  const getDisplayedDate = (date: string) => {
    return moment(date).format('DD.MM.YYYY');
  }

  const handleClose = () => {
    setDiagnosticDate('');
    setSeverity('');
    setFaultType('');
    props.onHide();
  }

  return (
      <Dialog open={props.showModal} onClose={handleClose}>
        <DialogTitle>Add new diagnostic</DialogTitle>
        <DialogContent style={{ width: '400px'}}>
          <FormControl required={true} variant="standard" fullWidth margin="normal">
            <InputLabel>Diagnostic date</InputLabel>
            <Select
                data-testid={'diagnostic-date'}
                value={diagnosticDate}
                onChange={(e) => setDiagnosticDate(e.target.value as string)}
            >
              {availableDatesMockOptions.map((v, i) => {
                return <MenuItem key={v+i} value={v}>{getDisplayedDate(v)}</MenuItem>
              })}
            </Select>
          </FormControl>
          <FormControl required={true} variant="standard" fullWidth margin="normal">
            <InputLabel>Fault type</InputLabel>
            <Select
                data-testid={'fault-type'}
                value={faultType}
                onChange={(e) => setFaultType(e.target.value as string)}
            >
              {typeOptions.map((v, i) => {
                return <MenuItem key={v+i} value={v}>{v}</MenuItem>
              })}
            </Select>
          </FormControl>
          <FormControl required={true} variant="standard" fullWidth margin="normal">
            <InputLabel>Severity</InputLabel>
            <Select
                data-testid={'severity'}
                value={severity}
                onChange={(e) => setSeverity(e.target.value as string)}
            >
              {severityOptions.map((v, i) => {
                return <MenuItem key={v+i} value={v}>{v}</MenuItem>
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button className='secondaryButton' onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            className='primaryButton'
            disabled={!isSaveAvailable}
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export const CreateInsightModal = React.memo(CreateInsightModalComponent);