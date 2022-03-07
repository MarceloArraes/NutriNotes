import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React,{useState} from 'react';


export default function  DropdownFi() {
  const [age, setAge] = useState('');
  const [level, setLevel] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleChangeLevel = (event) => {
    setLevel(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        > 
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={level}
          label="Age"
          onChange={handleChangeLevel}
        >
          <MenuItem value={10}>Leve</MenuItem>
          <MenuItem value={20}>Grave</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}