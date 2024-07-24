import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button
} from '@mui/material';
import {Insight, sortInsights} from "../../../api/insightsApi.ts";
import styles from './index.module.css';
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {useSelector} from "react-redux";
import {selectInsights} from "../../../store/slices";
import {useState} from "react";
import {CreateInsightModal} from "../CreateInsightModal";

export const DiagnosticsTable: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const columns = [
    { key: 'created_at', name: 'Diagnostics date' },
    { key: 'type', name: 'Fault type' },
    { key: 'severity', name: 'Severity' },
  ];

  const mapData = (data: Insight[]) => {
    return sortInsights(data).map((v) => {
      return {
        ...v,
        'created_at': moment(v.created_at).format('DD.MM.YYYY')
      }
    })
  }

  const data = mapData(useSelector(selectInsights));

  const handleAddButtonClick = () => {
    setShowAddModal(true);
  }

  return (
      <>
        <div className={styles.diagnosticsHeading}>
          <h6>Diagnostics</h6>
          <Button
              className='primaryButton'
              startIcon={<FontAwesomeIcon size={'sm'} icon={faPlus}/>}
              variant="contained"
              onClick={handleAddButtonClick}
          >
            Add new
          </Button>
        </div>
        <div className={styles.diagnosticsTable}>
          <TableContainer>
            <Table sx={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {columns.map((v) => {
                    return <TableCell key={v.key}>{v.name}</TableCell>
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row) => (
                    <TableRow
                        key={row.id}
                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                    >
                      {columns.map((v) => {
                        return (
                            <TableCell
                                key={v.key + row[v.key]}
                            >
                              <div className={styles.diagnosticsTableCell}>{row[v.key]}</div>
                            </TableCell>
                        )
                      })}
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <CreateInsightModal
            showModal={showAddModal}
            onHide={() => setShowAddModal(false)}
        />
      </>
  );
}