// StatusPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Grid, Typography, Button } from '@mui/material';
import DataTable from './DataTable';

const StatusPage = () => {
    const { type, name } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/local/excel/${type}`);
                const filteredData = response.data.data.filter(item =>
                    type === 'preprocessing' ? item.Status === name : item.status === name
                );
                setData(filteredData);
                setLoading(false);
            } catch (err) {
                setError('Error fetching data');
                setLoading(false);
            }
        };
        fetchData();
    }, [type, name]);

    const columns = type === 'preprocessing' ? [
        'FileID', 'Filename', 'CID', 'Start Time', 'End Time', 'Status',
        'Error Details', 'Transport Type', 'File Vertical Type', 'File size', 'Preprocessing duration (In sec)'
    ] : [
        'id', 'catalogId', 'info', 'startTime', 'endTime', 'elapsedTime',
        'errorCount', 'added', 'removed', 'updated', 'unchanged', 'rejected',
        'status', 'headerOk', 'fileName', 'advertiserId', 'adId', 'link'
    ];

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Grid container spacing={2} padding={2}>
            <Grid item xs={12}>
                <Button onClick={() => navigate('/')}>Back to Home Page</Button>
                <Typography variant="h4">{`${type.charAt(0).toUpperCase() + type.slice(1)} Status: ${name}`}</Typography>
                <DataTable
                    title={type === 'preprocessing' ? "Preprocessing Data" : "Processing Data"}
                    data={data}
                    columns={columns}
                />
            </Grid>
        </Grid>
    );
};

export default StatusPage;