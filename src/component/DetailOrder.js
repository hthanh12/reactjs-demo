import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import moment from 'moment'
import { STATUSES_ORDER } from '../utils/data'
import {
    useParams
} from "react-router-dom"
function createData(name, field) {
    return { name, field };
}

let rows = []

let createRows = (detail) => {
    console.log("🚀 ~ file: DetailOrder.js ~ line 349 ~ createRows ~ detail.status", detail)
    let findStatus = STATUSES_ORDER.find((o) => o.id * 1 === detail.status * 1)
    console.log("🚀 ~ file: DetailOrder.js ~ line 349 ~ createRows ~ findStatus", findStatus)
    let fields = [
        { name: 'Mã đơn hàng', value: detail?.brv_order },
        { name: 'Khách hàng', value: detail?.customer_info?.name || '' },
        { name: 'Địa chỉ', value: detail?.customer_info?.brv_info?.Address || '' },
        { name: 'Nhân viên Sales', value: detail?.sale_info?.name || '' },
        { name: 'Kế toán quản lý', value: detail?.accountant_info?.name || '' },
        { name: 'Kho', value: detail?.warehouse_info?.name || '' },
        { name: 'Mức độ ưu tiên', value: detail.priority * 1 === 1 ? 'Thường' : 'Cao' },
        { name: 'Ngày chứng từ', value: moment(detail.created_at).format('DD-MM-YYYY') },
        { name: 'Tiền tạm tính', value: detail?.price_info?.total_temp_price || '' },
        { name: 'Tổng tiền', value: detail?.price_info?.total_price || '' },
        { name: 'Trạng thái', value: findStatus?.name || '' },
        { name: 'Thao tác', value: 2 || '' },

    ]
    for (let item of fields) {
        console.log('first')
        rows.push(createData(item.name, item.value))
    }
    return rows
}
var axios = require('axios');

var config = {
    method: 'get',
    url: `${process.env.REACT_APP_LINK_IWS_DEV}/orders/1218`,
    headers: {
        'Authorization': null
    }
};

export default function CustomPaginationActionsTable() {
    let { id } = useParams();
    console.log("🚀 ~ file: DetailOrder.js ~ line 55 ~ CustomPaginationActionsTable ~ id", id)
    const [detail, setDetail] = useState({});
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);

    useEffect(() => {
        const iws = JSON.parse(localStorage.getItem("iws"))
        config.headers.Authorization = `Bearer ${iws.token}`
        axios(config)
            .then(function (response) {
                console.log('9999999999')
                console.log(response.data)
                createRows(response.data)
                setDetail(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log("🚀 ~ file: DetailOrder.js ~ line 82 ~ useEffect ~ detail", detail)
    }, [])



    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <div style={{ width: '100%' }}>
            <Table sx={{ width: 500, margin: 'auto' }} >
                <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell style={{ width: 300 }} align="right">
                                {row.field}
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={12} />
                        </TableRow>
                    )}
                </TableBody>

            </Table>
        </div>
    );
}
