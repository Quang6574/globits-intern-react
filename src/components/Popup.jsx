import React from 'react';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

export default function Popup(props) {

    const {title, children, openPopup, setOpenPopup} = props;
    return (
        <Dialog open={openPopup}>
            <DialogTitle>
                <div>{title}</div>
            </DialogTitle>

            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )



}
  