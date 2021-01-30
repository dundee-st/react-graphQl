import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { useMutation } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';
import { ADD_PRODUCT } from '../graphql/mutations';

export const useInputs = (initialState) => {
    const [inputs, setInputs] = useState(initialState);

    return [
        inputs,
        function (e) {
            setInputs({
                ...inputs,
                [e.target.id]: e.target.value
            });
        },
        function () {
            const resetInputs = {};
            Object.keys(inputs).forEach((item) => {
                resetInputs[item] = '';
            })
            setInputs(
                resetInputs
            );
        }
    ];
}

export const AddProductDialog = ({ openNewProductDialog, handleCloseNewProductDialog }) => {

    const [inputs, handleInputChange, resetInputs] = useInputs({
        title: '',
        price: '',
        description: ''
    });

    const [addProduct, { loading, error }] = useMutation(ADD_PRODUCT, {
        update: (cache, { data }) => {
            const getAllProducts = cache.readQuery({ query: GET_PRODUCTS });
            const newProduct = data.addProduct.product[0];
            cache.writeQuery({
                query: GET_PRODUCTS,
                data: { queryProduct: [...getAllProducts.queryProduct, newProduct] }
            });
        },
        onCompleted: () => {
            handleCloseNewProductDialog();
            resetInputs();
        },
        onError: (err) => {
            console.log(err)
        }
    });

    const createNewProduct = () => {
        const validatePrice = (price) => /\D/.test(price);
        if (inputs.title.length > 0 && inputs.price.length > 0 && !validatePrice(inputs.price)) {
            addProduct({ variables: { title: inputs.title, price: inputs.price, description: inputs.description } });
        }
    }

    const closeAddProductsDialog = () => {
        handleCloseNewProductDialog();
        resetInputs();
    }

    return (
        <div>
            <Dialog open={openNewProductDialog} onClose={closeAddProductsDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add a new product</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill the fields to create a product.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="normal"
                        id="title"
                        label="Title"
                        type="text"
                        value={inputs.title}
                        onChange={handleInputChange}
                        fullWidth />
                    <TextField
                        required
                        margin="normal"
                        id="price"
                        label="Price"
                        type="number"
                        value={inputs.price}
                        onChange={handleInputChange}
                        fullWidth />
                    <TextField
                        margin="normal"
                        id="description"
                        label="Short description"
                        type="text"
                        value={inputs.description}
                        onChange={handleInputChange}
                        fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeAddProductsDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={createNewProduct} color="primary" variant="contained" disabled={inputs.title === '' || inputs.price === ''}>
                        Create product
                    </Button>
                </DialogActions>
                <Grid className='addDialogError'
                    container
                    direction="row"
                    justify="flex-end">
                    {error && <p style={{ paddingRight: 15 }}>Error :( Please try again </p>}
                </Grid>
            </Dialog>
        </div>
    );
}
