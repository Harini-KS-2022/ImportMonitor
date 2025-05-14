import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
} from "@mui/material";

const IntegrateDashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    // Fetch the data from your backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/local/excel/preprocessing');
                setData(response.data.data); // Fix: Extract 'data' array
                setFilteredData(response.data.data); // Fix: Use response data instead of existing state
                setLoading(false);
            } catch (err) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Update filtered data based on search term
    useEffect(() => {
        const results = data.filter(record =>
            Object.values(record).some(val =>
                typeof val === "object"
                    ? Object.values(val).some(nestedVal =>
                        nestedVal?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    : val?.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        setFilteredData(results);
        setPage(0); // Reset to first page on new search
    }, [searchTerm, data]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Integration</h1>
            <TextField
                label="Search"
                variant="outlined"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                style={{ marginBottom: '20px' }}
            />
            {filteredData.length === 0 ? (
                <p>No data available</p>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>FILENAME</TableCell>
                                <TableCell>CID</TableCell>
                                <TableCell>PRE-PROCESSING START TIME</TableCell>
                                <TableCell>PREPROCESSING TIME (IN SECONDS)</TableCell>
                                <TableCell>PRE-PROCESSING END TIME</TableCell>
                                <TableCell>PRE-PROCESSING STATUS</TableCell>
                                <TableCell>PROCESSING START TIME</TableCell>
                                <TableCell>PROCESSING TIME (IN SECONDS)</TableCell>
                                <TableCell>PROCESSING END TIME</TableCell>
                                <TableCell>ERROR COUNT</TableCell>
                                <TableCell>PROCESSING STATUS</TableCell>
                                <TableCell>AD ID</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(filteredData) && filteredData
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((record, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{record.FILENAME}</TableCell>
                                        <TableCell>{record.CID}</TableCell>
                                        <TableCell>{record["PRE-PROCESSING START TIME"]}</TableCell>
                                        <TableCell>{record["PREPROCESSING TIME (IN SECONDS)"]}</TableCell>
                                        <TableCell>{record["PRE-PROCESSING END TIME"]}</TableCell>
                                        <TableCell>{record["PRE-PROCESSING STATUS"]}</TableCell>
                                        <TableCell>{record["PROCESSING START TIME"]}</TableCell>
                                        <TableCell>{record["PROCESSING TIME (IN SECONDS)"]}</TableCell>
                                        <TableCell>{record["PROCESSING END TIME"]}</TableCell>
                                        <TableCell>{record["ERROR COUNT"]}</TableCell>
                                        <TableCell>{record["PROCESSING STATUS"]}</TableCell>
                                        <TableCell>{record["AD ID"]}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            )}
        </div>
    );
};

export default IntegrateDashboard;
