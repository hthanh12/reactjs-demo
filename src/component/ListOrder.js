import { useCallback, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Button } from '@mui/material';
import { GET_NAME_STATUS_ORDER, STATUSES_ORDER, STATUS_NEW, STATUS_CONFIRM } from '../utils/data'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import moment from 'moment'
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add'
import CheckIcon from '@mui/icons-material/Check'
import PreviewIcon from '@mui/icons-material/Preview';
let VALUE_CONFIRM = 'confirm'
let VALUE_CREATE = 'create'

let renderButton = (row, text, status_check, icon, onClickHandle,) => {
    let value = null
    if (row.status === STATUS_NEW) {
        value = VALUE_CONFIRM
    }
    if (row.status === STATUS_CONFIRM) {
        value = VALUE_CREATE
    }
    let button = (<Stack direction="row" sx={{ width: 200 }}>
        <Button variant="contained" startIcon={icon} onClick={onClickHandle} id={row.id} value={value}> {text} </Button>
    </Stack>)
    if (row.status !== status_check) {
        button = (<Stack direction="row" sx={{ minWidth: 200 }}>
            <Button variant="contained" disabled startIcon={icon}>{text} </Button>
        </Stack>)
    }
    return (
        button
    );
}

let config = {
    method: 'get',
    url: `${process.env.REACT_APP_LINK_IWS_DEV}/orders?not_parent=true&page=1&perPage=10&list_status=[1,2]`,
    headers: {
        'Authorization': null
    },
}

let configH = {
    method: 'put',
    url: `${process.env.REACT_APP_LINK_IWS_DEV}`,
    headers: {
        'Authorization': null
    },
}

export default function BasicTable() {
    const navigate = useNavigate();

    const [rows, setRow] = useState([])

    useEffect(() => {
        const iws = JSON.parse(localStorage.getItem("iws"))
        config.headers.Authorization = `Bearer ${iws.token}`
        axios(config)
            .then((response) => {
                setRow(response.data.data);
            })
            .catch(function (error) {
                alert('Nhập sai mật khẩu hoặc tài khoản rồi bạn eiiiiiiiiiiiiiiiii\n' + error.message)
                localStorage.removeItem('iws')
                setRow([])
            });
    }, []);
    const onClickHandle = useCallback((e) => {
        console.log(e.target.id)
        console.log(e.target.value)
        alert(e.target.id)

        // alert(e)
        // const iws = JSON.parse(localStorage.getItem("iws"))
        // config.headers.Authorization = `Bearer ${iws.token}`
        // axios(config)
        //     .then((response) => {
        //         setRow(response.data.data);
        //     })
        //     .catch(function (error) {
        //         alert('Nhập sai mật khẩu hoặc tài khoản rồi bạn eiiiiiiiiiiiiiiiii\n' + error.message)
        //         localStorage.removeItem('iws')
        //         setRow([])
        //     });
    }, [])
    return (
        <><TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Tên khách hàng	</TableCell>
                        <TableCell align="right">Trạng thái		</TableCell>
                        <TableCell align="right">Nhân viên Sales</TableCell>
                        <TableCell align="right">Ngày tạo	</TableCell>
                        <TableCell align="right">Kế toán quản lý</TableCell>
                        <TableCell align="right">Người tạo</TableCell>
                        <TableCell align="right">Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.length === 0 ? <TableRow>Not found data</TableRow> : rows.map((row) => (
                        <TableRow
                            key={row.key}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.customer_info.name}</TableCell>
                            <TableCell align="right">{GET_NAME_STATUS_ORDER(row.status)}</TableCell>
                            <TableCell align="right">{row.sale_info.name}</TableCell>
                            <TableCell align="right">{moment(row.created_at).format('DD-MM-YYYY')}</TableCell>
                            <TableCell align="right">{row.accountant_name}</TableCell>
                            <TableCell align="right">{row.creator_info.name}</TableCell>
                            {/* <TableCell align="right">{renderButton(row, 'Duyệt', STATUS_NEW, <CheckIcon />, onClickHandle)}{renderButton(row, 'Tạo phiếu xuất', STATUS_CONFIRM, <AddIcon />, onClickHandle)}
                            </TableCell> */}
                            <TableCell align="right">
                                <Stack >
                                    <Button variant="contained" startIcon={<PreviewIcon />} onClick={() => navigate(`/order/${row.id}`)} id={row.id}> View Detail </Button>
                                </Stack></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer></>
    );
}

