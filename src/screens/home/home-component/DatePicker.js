import "date-fns";
import React, { Fragment } from 'react';
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";



function DatePicker({
  name,
  label,
  selectedDate,
  handleDateChange,
  minDate = null,
}) {
  minDate = minDate === null ? new Date(null) : minDate;
  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id={label}
          name={name}
          label={label}
          format="dd/MM/yyyy"
          value={selectedDate}
          minDate={minDate}
          emptyLabel={"dd/mm/yyyy"}
          onChange={(date, value) => handleDateChange(date, value, name)}
        />
      </MuiPickersUtilsProvider>
    </Fragment>
  )
}

export default DatePicker