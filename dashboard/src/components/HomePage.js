import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography, Paper, Box, Card, CardContent } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [preprocessingData, setPreprocessingData] = useState([]);
    const [processingData, setProcessingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [preprocessingResponse, processingResponse] = await Promise.all([
                    axios.get('/api/local/excel/preprocessing'),
                    axios.get('/api/local/excel/processing')
                ]);

                setPreprocessingData(preprocessingResponse.data.data);
                setProcessingData(processingResponse.data.data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography color="error">{error}</Typography>;

    const calculateOverallStatus = () => {
        const filenames = new Set(preprocessingData.map(item => item['Filename']));
        const totalFiles = filenames.size;

        const failedInPreprocessing = new Set(
            preprocessingData.filter(item => item.Status === 'PREPROCESSING_ERRORED').map(item => item['Filename'])
        ).size;

        const failedInProcessing = new Set(
            processingData.filter(item => item.status === 'ABORTED').map(item => item['fileName'])
        ).size;

        const overallFailures = failedInPreprocessing + failedInProcessing;
        const overallFailureRate = totalFiles > 0 ? ((overallFailures / totalFiles) * 100).toFixed(2) : 0;

        return {
            totalFiles,
            failedInPreprocessing,
            failedInProcessing,
            overallFailureRate,
        };
    };

    const { totalFiles, failedInPreprocessing, failedInProcessing, overallFailureRate } = calculateOverallStatus();

    const categorizeData = () => {
        const categories = {
            Small: { totalDuration: 0, count: 0 },
            Medium: { totalDuration: 0, count: 0 },
            Large: { totalDuration: 0, count: 0 },
        };

        preprocessingData.forEach(item => {
            const size = item['File size'];
            const duration = item['Preprocessing duration (In sec)'];

            if (size < 5) {
                categories.Small.totalDuration += duration;
                categories.Small.count += 1;
            } else if (size <= 20) {
                categories.Medium.totalDuration += duration;
                categories.Medium.count += 1;
            } else {
                categories.Large.totalDuration += duration;
                categories.Large.count += 1;
            }
        });

        return Object.keys(categories).map(key => ({
            name: key,
            avgDuration: categories[key].count > 0 ? (categories[key].totalDuration / categories[key].count).toFixed(2) : 0,
        }));
    };

    const avgDurationData = categorizeData();

    const preparePieData = (data, key) => Object.keys(data.reduce((acc, item) => {
        const status = item[key];
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {})).map(k => ({ name: k, value: data.reduce((acc, item) => acc + (item[key] === k ? 1 : 0), 0) }));

    const preprocessingPieData = preparePieData(preprocessingData, 'Status');
    const processingPieData = preparePieData(processingData, 'status');

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const handlePieClick = (data, index, type) => {
        navigate(`/status/${type}/${data.name}`);
    };

    return (
        <Box padding={4}>
            <Grid container spacing={2} marginBottom={4}>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" align="center">
                                Total Files Entered
                            </Typography>
                            <Typography variant="h4" align="center">{totalFiles}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" align="center">
                                Failed in Pre-processing
                            </Typography>
                            <Typography variant="h4" align="center">{failedInPreprocessing}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" align="center">
                                Failed in Processing
                            </Typography>
                            <Typography variant="h4" align="center">{failedInProcessing}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" align="center">
                                Overall Failure Rate
                            </Typography>
                            <Typography variant="h4" align="center">{overallFailureRate}%</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" align="center" gutterBottom>
                                Preprocessing Status Distribution
                            </Typography>
                            <Box display="flex" justifyContent="center">
                                <PieChart width={400} height={250}>
                                    <Pie
                                        data={preprocessingPieData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        onClick={(_, index) => handlePieClick(preprocessingPieData[index], index, 'preprocessing')}
                                    >
                                        {preprocessingPieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" align="center" gutterBottom>
                                Average Processing Duration by File Size
                            </Typography>
                            <Box display="flex" justifyContent="center">
                                <BarChart
                                    width={400}
                                    height={250}
                                    data={avgDurationData}
                                    margin={{
                                        top: 5, right: 30, left: 20, bottom: 5,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis label={{ value: 'Avg Duration (sec)', angle: -90, position: 'insideLeft' }} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="avgDuration" fill="#8884d8" />
                                </BarChart>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" align="center" gutterBottom>
                                Processing Status Distribution
                            </Typography>
                            <Box display="flex" justifyContent="center">
                                <PieChart width={400} height={250}>
                                    <Pie
                                        data={processingPieData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                        onClick={(_, index) => handlePieClick(processingPieData[index], index, 'processing')}
                                    >
                                        {processingPieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HomePage;