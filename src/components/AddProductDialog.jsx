import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useMutation } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';
import { ADD_PRODUCT } from '../graphql/mutations';

const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const onChange = (e) => {
        setValue(e.target.value);
    }
    const resetInput = () => {
        setValue('');
    }
    return {
        value,
        onChange,
        resetInput
    }
}

export const AddProductDialog = ({ openNewProductDialog, handleCloseNewProductDialog }) => {

    const title = useInput('');
    const price = useInput('');
    const description = useInput('');

    const resetInput = () => {
        title.resetInput();
        price.resetInput();
        description.resetInput();
    }
    const [addProduct] = useMutation(ADD_PRODUCT, {
        update: (cache, { data }) => {
            const getAllProducts = cache.readQuery({ query: GET_PRODUCTS });
            const newProduct = data.addProduct.product[0];
            cache.writeQuery({
                query: GET_PRODUCTS,
                data: { queryProduct: [...getAllProducts.queryProduct, newProduct] }
            });
        },
        onCompleted: resetInput
    });

    const createNewProduct = () => {
        addProduct({ variables: { title: title.value, price: price.value, description: description.value } });
        handleCloseNewProductDialog();
    }
    return (
        <div>
            <Dialog open={openNewProductDialog} onClose={handleCloseNewProductDialog} aria-labelledby="form-dialog-title">
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
                        value={title.value}
                        onChange={title.onChange}
                        fullWidth />
                    <TextField
                        required
                        margin="normal"
                        id="title"
                        label="Price"
                        type="number"
                        value={price.value}
                        onChange={price.onChange}
                        fullWidth />
                    <TextField
                        margin="normal"
                        id="title"
                        label="Short description"
                        type="text"
                        value={description.value}
                        onChange={description.onChange}
                        fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseNewProductDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={createNewProduct} color="primary" variant="contained" disabled={title.value === '' || price.value === ''}>
                        Create product
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
