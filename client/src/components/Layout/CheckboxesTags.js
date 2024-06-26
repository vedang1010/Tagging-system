import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function CheckboxesTags({tags,setResults,placeholder}) {

  return (
    <Autocomplete sx={{margin:"15px 0px"}}
      multiple
      id="checkboxes-tags-demo"
      options={tags}
      disableCloseOnSelect
      getOptionLabel={(option) => option}
      onChange={(event, value)=>{
        setResults(value);
      }}
      renderOption={(props, option, { selected }) => (
        <li {...props} style={{width:'100%'}} >
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8}}
            checked={selected}
            
          />
          {option}
        </li>
      )}
      style={{ width: "85%" }}
      renderInput={(params) => (
        <TextField {...params} label={placeholder} placeholder={placeholder} />
      )}
    />
  );
}
