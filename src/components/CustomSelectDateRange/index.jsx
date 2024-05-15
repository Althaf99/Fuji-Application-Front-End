import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  datePickerBox: {
    height: "40px",
    fontFamily: "Nunito",
    fontWeight: "normal",
    padding: "0 12px",
    fontSize: "14px",
    width: "100%",
    fontStyle: "bold",
    color: "Black",
  },
  calender: {
    width: "max-content",
    fontSize: "16px",
  },
  wrapper: {
    width: "100%",
  },
  popper: {
    position: "relative",
    zIndex: "99999",
  },
}));

const CustomSelectDateRange = ({ onChange, startDate, endDate }) => {
  const classes = useStyles();

  return (
    <div>
      <DatePicker
        placeholderText="Select Date Range"
        showIcon
        dateFormat="dd/MM/yyyy"
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange={true}
        isClearable={true}
        calendarClassName={classes.calender}
        wrapperClassName={classes.wrapper}
        popperClassName={classes.popper}
        className={classes.datePickerBox}
        monthsShown={1}
        popperPlacement="bottom-end"
        popperModifiers={{
          offset: { enabled: true, offset: "5px, 10px" },
          preventOverflow: {
            enabled: true,
            escapeWithReference: false,
            boundariesElement: "viewport",
          },
        }}
      />
    </div>
  );
};

export default CustomSelectDateRange;
