// src/components/Dashboard.js
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import FileStatusMonitor from '../components/FileStatusMonitorChart';
import {Pie} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement
} from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    Title,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement
);

const Dashboard = () => {
    const [records, setRecords] = useState([]);
    const [successfulFiles, setSuccessfulFiles] = useState(0);
    const [errorFiles, setErrorFiles] = useState(0);
    const [chartData, setChartData] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        // Fetch data from the API when the component mounts
        // axios.get('/api/local/api/data') // Replace with your API endpoint
        //     .then((response) => {
        // const files = response.data;
        const files = [
            {
                ON_PREM_MODIFIED_DATE: '2025-03-03 06:00:25.0',
                ON_PREM_IMPORT_FILE_ID: '58272982',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-05 22:03:47',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '18',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/5314779/hs_oakley_commissionjunction_de.xml.gzip_ts2025_03_02_15_02_27_198.json',
                FILENAME: '5314779/hs_oakley_commissionjunction_de.xml.gzip_ts2025_03_02_15_02_27_198',
                ON_PREM_END_TIME: '2025-03-03 06:00:35.0',
                CURRENT_DT_STATE: 'PROCESSING',
                CID: 5314779,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-05 22:04:05',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '10'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            },
            {
                ON_PREM_MODIFIED_DATE: '2025-03-01 07:50:23.0',
                ON_PREM_IMPORT_FILE_ID: '58255607',
                CLOUD_FILE_COPIED_TIMESTAMP: '2025-03-04 03:14:06',
                'CLOUD_PREPROCESSING_TIME (IN SECONDS)': '12',
                FILE_TYPE: 'Product Catalog',
                ENVIRONMENT: 'CLOUD',
                ON_PREM_CURRENT_STATUS: 'PROCESSING',
                FILE_JSON_PATH: 's3://dtm-dev-sqs-audit-bucket/productCatalog/4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875.json',
                FILENAME: '4189863/mytheresa_FR_France-fr-EUR_CSS_new_GSF.csv_ts2025_03_01_07_50_23_875',
                ON_PREM_END_TIME: '2025-03-01 07:54:14.0',
                CURRENT_DT_STATE: 'PREPROCESSING_ERRORED',
                CID: 4189863,
                CLOUD_SQS_MESSAGE_TIMESTAMP: '2025-03-04 03:14:18',
                'ON_PREM_PREPROCESSING_TIME (IN SECONDS)': '231'
            }
        ]
        setRecords(files);

        // Calculate successful and error files
        const success = files.filter(file => file.CURRENT_DT_STATE === 'PROCESSING').length;
        const errors = files.filter(file => file.CURRENT_DT_STATE === 'PREPROCESSING_ERRORED').length;

        setSuccessfulFiles(success);
        setErrorFiles(errors);
        updateChartData(files);
    }, [])
    // .catch((error) => {
    //     console.error('Error fetching data:', error);
    // });
    // }, []);

    const totalFiles = records.length;

    const updateChartData = (data) => {
        console.log('Updating chart data with:', data); // Log data passed to updateChartData
        const stateCounts = data.reduce((acc, record) => {
            const state = record.CURRENT_DT_STATE;
            acc[state] = (acc[state] || 0) + 1;
            return acc;
        }, {});

        setChartData({
            labels: Object.keys(stateCounts),
            datasets: [
                {
                    data: Object.values(stateCounts),
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
                },
            ],
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div style={{ padding: '20px' }}>
            <FileStatusMonitor
                totalFiles={totalFiles}
                successfulFiles={successfulFiles}
                errorFiles={errorFiles}
            />

            <div style={{ width: '30%', margin: 'auto', paddingTop: '20px' }}>
                {Object.keys(chartData).length > 0 && <Pie data={chartData} options={{
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'bottom',
                        },
                        title: {
                            display: true,
                            font: {
                                size: 18
                            },
                            padding: {
                                top: 10,
                                bottom: 30
                            }
                        }
                    },
                }} width={400} height={400} />}
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>FILENAME</TableCell>
                            <TableCell>CID</TableCell>
                            <TableCell>PRE-PROCESSING START TIME</TableCell>
                            <TableCell>PREPROCESSING TIME (IN SECONDS)</TableCell>
                            <TableCell>PRE-PROCESSING END TIME</TableCell>
                            <TableCell>STATUS</TableCell>
                            <TableCell>FILE TYPE</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(records) && records.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record, index) => (
                            <TableRow key={index}>
                                <TableCell>{record.FILENAME}</TableCell>
                                <TableCell>{record.CID}</TableCell>
                                <TableCell>{record.CLOUD_FILE_COPIED_TIMESTAMP}</TableCell>
                                <TableCell>{record['CLOUD_PREPROCESSING_TIME (IN SECONDS)']}</TableCell>
                                <TableCell>{record.CLOUD_SQS_MESSAGE_TIMESTAMP}</TableCell>
                                <TableCell>{record.CURRENT_DT_STATE}</TableCell>
                                <TableCell>{record.FILE_TYPE}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={records.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
};

export default Dashboard;