import React, { useEffect, useState } from "react";

import { makeStyles } from "@mui/styles";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";

const useStyles = makeStyles((theme) => ({
  tags: {
    paddingLeft: "8px",
    border: "1px solid #B5BDE9",
    borderRadius: "5px",
    "&:hover": {
      border: "1px solid black",
    },
  },
  chip: {
    borderRadius: "18px",
    fontWeight: "600",
    fontStyle: "normal",
    fontSize: "14px",
    lineHeight: "19px",
    marginBottom: "1px",
    background: "#B5BDE9",
    color: "#FFFFFF",
    "&:hover": {
      background: "#B5BDE9",
      color: "#FFFFFF",
    },
  },
}));

const Tags = ({ id, addValues, values, onChange, isEmpty }) => {
  const classes = useStyles();

  const [tags, setTags] = useState(values ? [...values] : []);
  const [inputValue, setInputValue] = useState("");

  // Add Chips
  const handleAddChip = (chip) => {
    isEmpty(false);
    setTags([...tags, chip]);
  };
  // Delete Chips
  const handleDeleteChip = (chip) => {
    isEmpty(false);
    setTags(tags.filter((tag, index) => tag !== chip));
  };

  useEffect(() => {
    addValues(tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  // Add on Enter or blur, matching the previous ChipInput "add" behavior
  const commitInputValue = () => {
    const chip = inputValue.trim();
    if (chip) {
      handleAddChip(chip);
    }
    setInputValue("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      commitInputValue();
    }
  };

  return (
    <div className={classes.tags}>
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          onDelete={() => handleDeleteChip(tag)}
          className={classes.chip}
        />
      ))}
      <TextField
        id={id}
        placeholder="Add new tag"
        value={inputValue}
        onChange={(event) => {
          setInputValue(event.target.value);
          onChange?.(event.target.value);
        }}
        onKeyDown={handleKeyDown}
        onBlur={commitInputValue}
        variant="standard"
        InputProps={{ disableUnderline: true }}
      />
    </div>
  );
};

export default Tags;
