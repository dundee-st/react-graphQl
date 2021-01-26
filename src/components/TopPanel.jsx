import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import { AddProductDialog } from './AddProductDialog';



const TopPanel = () => {

    const [openNewProductDialog, setOpen] = useState(false);

    const handleOpenNewProductDialog = () => {
        setOpen(true);
    };

    const handleCloseNewProductDialog = () => {
        setOpen(false);
    };

    return (
        <>
            <Grid container className='top-panel_wrapper' >
                <Grid className='top-panel'
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center" >
                    <Button variant="contained" color="primary" onClick={handleOpenNewProductDialog}>Add product</Button>
                </Grid >
            </Grid >
            <AddProductDialog openNewProductDialog={openNewProductDialog}
                handleCloseNewProductDialog={handleCloseNewProductDialog} />
        </>
    );
};

export default TopPanel;