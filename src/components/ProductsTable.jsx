import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button'
import { useQuery, useMutation } from '@apollo/client';
import { GET_PRODUCTS } from '../graphql/queries';
import { DELETE_PRODUCT } from '../graphql/mutations';

const ProductsTable = () => {
    const { loading, error, data } = useQuery(GET_PRODUCTS);

    const [deleteProduct] = useMutation(DELETE_PRODUCT);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const handleDeleteProduct = (id) => {
        deleteProduct({
            variables: { id },
            update: (cache) => {
                const getAllProducts = cache.readQuery({ query: GET_PRODUCTS });
                const filteredProducts = getAllProducts.queryProduct.filter(item => (item.id !== id));
                cache.writeQuery({
                    query: GET_PRODUCTS,
                    data: { queryProduct: filteredProducts }
                });
            },
            onError: (err) => {
                console.log(err)
            }
        });
    }
    return (
        <React.Fragment>
            <TableContainer component={Paper} className='table-products'>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="center">Short Description</TableCell>
                            <TableCell align="center">Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.queryProduct.map((item, index) => (
                            <TableRow key={item.id}>
                                <TableCell align="left">{item.title}</TableCell>
                                <TableCell align="left">{item.price}</TableCell>
                                <TableCell align="center">{item.description}</TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" color="secondary" onClick={() => handleDeleteProduct(item.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment >
    );
}

export default ProductsTable;