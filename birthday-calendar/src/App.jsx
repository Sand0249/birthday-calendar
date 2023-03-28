import './App.css';
import AddFavorite from './AddFavorite'

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import SearchBar from "material-ui-search-bar";
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import ClearIcon from '@mui/icons-material/Clear';



export default function App() {
  const [date, setDate] = useState(dayjs("2023-03-27"));
  const [names, setNames] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searched, setSearched] = useState("");

  const requestSearch = (searchedName) => {
    const searchedNames = names.filter((row) => {
      return row.text.toLowerCase().includes(searchedName.toLowerCase());
    });
    setNames(searchedNames);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
  };

  const addFavorites = (row) => {
    const birthday = {
      text: row.text,
      date: date.format("MM/DD")
    }
    if (!favorites.includes(birthday)) {
      setFavorites([...favorites, birthday]);
    }
    console.log('favs: ', favorites)
  }

  const removeFavourites = (row) => {
    const updatedBirthdays = favorites.filter((bday) => bday.text !== row.text);
    setFavorites(updatedBirthdays);
  };

  useEffect(() => {
    console.log(date?.$d?.toDateString());

    let url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${date.$M + 1}/${date.$D}`;

    fetch(url).then(response => response.json())
      .then(data => {
        console.log(data.births);
        setNames(data.births);
      })
      .catch(err => {
        console.log(err);
      })
  }, [date]);


  return (
    <div style={{
      padding: '5%'
    }}>
      <h1>Birthday Calendar</h1>
      <div className='app'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={date}
            onChange={(d) => setDate(d)}
          />
        </LocalizationProvider>
        <div>
          <b className='m-b'>Favourite Birthdays </b>
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
            {favorites.map((row) => (
              <TableRow
                key={row.text}
              >
                <span>{row.date}</span><span className='m-l'>{row.text}</span>
                <ClearIcon className='m-l icon' onClick={() => { removeFavourites(row) }}></ClearIcon>
              </TableRow>
            ))}
            <AddFavorite onSubmit={addFavorites}></AddFavorite>
          </Table>
        </div>
      </div>
      <p className='m-t m-b'><b>Birthdays on {date?.$d?.toDateString()}</b></p>
      <SearchBar
        value={searched}
        onChange={(searchedName) => requestSearch(searchedName)}
        onCancelSearch={() => cancelSearch()}
        className="m-b m-t"
        data-testid='searchbar'
      />
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        {names.map((row) => (
          <TableRow
            key={row.text}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            {favorites?.some(fav => fav.text === row.text) ?
              (<StarIcon className='icon' onClick={() => { removeFavourites(row) }}></StarIcon>) :
              (<StarOutlineIcon className='icon' onClick={() => { addFavorites(row) }}></StarOutlineIcon>)
            }
            <span className='m-l'>{row.text}</span>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}