// src/components/ComponentStore/SearchBar.js
import React, { useEffect, useState , forwardRef, useImperativeHandle} from 'react';
import axios from 'axios';
import { TextField, IconButton, List, ListItem, ListItemText, CircularProgress, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import ComponentItem from './ComponentItem';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;


const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: theme.spacing(2),
  // [theme.breakpoints.down('sm')]: {
  //   flexDirection: 'column',
  // },
}));

const SearchBar = forwardRef(({ setShowSearchResults,tags,dept },ref) => {
  useImperativeHandle(ref,()=>({
    handleSearch
  }));
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (query.trim() === '') return;

    setLoading(true);
    try {
      const response = await axios.post(`${SERVER_URL}api/ComponentStore/SearchComponents`,{query,tags,dept});
      setResults(response.data);
      setShowSearchResults(true); // Show search results
    } catch (error) {
      console.error('Error fetching search results', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchContainer>
        <TextField
          variant="outlined"
          placeholder="Search components..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
          sx={{margin:"5px"}}
        />
        <IconButton onClick={handleSearch} color="primary">
          <SearchIcon />
        </IconButton>
      </SearchContainer>
      {loading ? (
        <CircularProgress />
      ) : (
        <Container sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection:'row',
          justifyContent: 'left',
         
        }}>
          {results.map((result) => (
            <div style={{width:'21rem'}}>
              <ComponentItem component={result} />
            </div>
            
          ))}
        </Container>
      )}
    </div>
  );
});

export default SearchBar;
