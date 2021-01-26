import React from 'react';
import { Grid } from '@material-ui/core';
import ProductsTable from '../components/ProductsTable';
import TopPanel from '../components/TopPanel';

const Products = () => {
    return (
        <Grid container className='products'>
            <h1>Products</h1>
            <TopPanel />
            <ProductsTable />
        </Grid>
    );
}

export default Products;