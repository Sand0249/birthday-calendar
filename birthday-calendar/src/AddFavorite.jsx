import { useState } from 'react';
import { Button } from '@mui/material';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import './App.css';

export default function AddFavorite(props) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState('');
    const [text, setText] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        const row = {
            text: text,
            date: date
        }
        props.onSubmit(row);
        handleClose();
    }

    return (
        <div className='modal'>
            <div className='m-t'>
            <Button data-testid='add-fav-btn' variant="outlined" onClick={handleOpen}>Wanna add friends? Click here</Button>
            </div>
            <Dialog open={open} onClose={handleClose} data-testid='fav-dialog'>
                <DialogTitle>Add birthdays for your friend and family</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select Month, Day, Name and Relation
                    </DialogContentText>
                    <div className='app'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker value={date}
                                onChange={(d) => setDate(d)} label={'"month" and "day"'} views={['month', 'day']} />
                        </LocalizationProvider>
                        <div>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Enter Name"
                                fullWidth
                                variant="standard"
                                value={text}
                                onChange={(event) => { setText(event.target.value) }}
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
