import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartLine, faCalendar} from "@fortawesome/free-solid-svg-icons";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import styles from './index.module.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchInsightsMock, availableDatesMockOptions} from "../../../api/insightsApi.ts";
import {selectUpdateFlag, setInsights, updateDataFlag} from "../../../store/slices";
import moment from "moment";

const FusionTrendControlComponent: React.FC = () => {
  const [date, setDate] = useState<string>(availableDatesMockOptions[0]);
  const dispatch = useDispatch();
  const updateFlag = useSelector(selectUpdateFlag);

  const fetchInsights = () => {
    fetchInsightsMock(date)
      .then((data) => {
        dispatch(setInsights(data));
        dispatch(updateDataFlag(false));
      })
      .catch((e) => console.error('An error occurred while fetching insights', e));
  }

  if (updateFlag) {
    fetchInsights();
  }

  useEffect(() => {
    if (date) {
      fetchInsights();
    }
  }, [date]);


  const handleChange = (e: SelectChangeEvent) => {
    setDate(e.target.value);
  }

  const getDisplayedDate = (date: string) => {
    return moment(date).format('DD.MM.YYYY');
  }

  return (
      <div className={styles.fusionTrendControl}>
        <div className={styles.fusionTrendControlHeading}>
          <div>
            <FontAwesomeIcon size={'sm'} icon={faChartLine}/>
            <span>Fusion trend</span>
          </div>
          <div className={styles.fusionTrendControlDateWrapper}>
            <div>
              <FontAwesomeIcon size={'sm'} icon={faCalendar}/>
              <span>From</span>
            </div>
            <FormControl
                className={styles.fusionTrendControlSelect}
                variant="standard" sx={{ m: 1, minWidth: 120 }}
            >
              <InputLabel id="demo-simple-select-standard-label">Date</InputLabel>
              <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={date}
                  onChange={handleChange}
              >
                {availableDatesMockOptions.map((v, index) => {
                  return <MenuItem key={v + index} value={v}>{getDisplayedDate(v)}</MenuItem>
                })}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
  )
}

export const FusionTrendControl = React.memo(FusionTrendControlComponent);