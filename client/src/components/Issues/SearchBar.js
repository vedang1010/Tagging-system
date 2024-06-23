// src/components/ComponentStore/SearchBar.js
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, IconButton, CircularProgress, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';
import IssueCard from './IssueCard';

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

const SearchBar = ({ setShowSearchResults }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (query.trim() === '') return;

    setLoading(true);
    try {
      const response = await axios.get(`${SERVER_URL}api/issues/searchIssues?name=${query}`);
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
          placeholder="Search Issues..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          fullWidth
          
          sx={{ padding:'7px' }}
          // md={{ width: '300px' }}
          // lg={{ width: '1200px' }}
        />
        <IconButton onClick={handleSearch} color="primary">
          <SearchIcon />
        </IconButton>
      </SearchContainer>
      {loading ? (
        <CircularProgress />
      ) : (<Container maxWidth="md">
        
          {results.map((issue,index) => (
            
              <IssueCard key={index} issue={issue} />
            
          ))}
        </Container>
      )}
    </div>
  );
};

export default SearchBar;
