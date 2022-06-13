import { useEffect, useState } from 'react';
import { Button, CircularProgress, Table, TableBody, TableCell, TableRow, } from '@mui/material';
import moment from 'moment'
import { STATUSES_ORDER, GET_NAME_TYPE_ORDER } from '../utils/data'
import {
    useParams
} from "react-router-dom"
import { Box } from '@mui/system';
import { LoadingButton } from '@mui/lab';
function createData(name, value, button, disabled, name_button) {
    return { name, value, button, disabled, name_button };
}


let formatCurrency = (x) => {
    return x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}
let actionButton = (status) => {
    let dataReturn = {
        disabled: true,
        button: true,
        name: 'No action'
    }
    if ([1, 2].includes(status)) {
        if (status * 1 === 1) {
            dataReturn.name = 'Duyệt'
            console.log(1)
        }
        if (status * 1 === 2) {
            dataReturn.name = 'Tạo đơn xuất'
            console.log(2)

        }
        dataReturn.disabled = false
    }
    return dataReturn
}
let getIdChild = (meta) => {
    let arr = []
    if (meta.arr_output_bill) {
        arr = meta.arr_output_bill.map(x => x.output_bill_id).toString()
    }
    return arr
}
let createRows = (detail) => {
    let rows = []
    let findStatus = STATUSES_ORDER.find((o) => o.id * 1 === detail.status * 1)
    console.log(detail.status, detail.id)

    let getActionButton = actionButton(detail.status)
    let id_child = []
    id_child = getIdChild(detail.meta)
    console.log(getActionButton.name)
    let fields = [
        { name: 'Mã đơn hàng', value: detail?.brv_order },
        { name: 'Khách hàng', value: detail?.customer_info?.name || '' },
        { name: 'Địa chỉ', value: detail?.customer_info?.brv_info?.Address || '' },
        { name: 'Nhân viên Sales', value: detail?.sale_info?.name || '' },
        { name: 'Kế toán quản lý', value: detail?.accountant_info?.name || '' },
        { name: 'Kho', value: detail?.warehouse_info?.name || '' },
        { name: 'Mức độ ưu tiên', value: detail.priority * 1 === 1 ? 'Thường' : 'Cao' },
        { name: 'Ngày chứng từ', value: moment(detail.created_at).format('DD-MM-YYYY HH:mm:ss') },
        { name: 'Tiền tạm tính', value: formatCurrency(detail?.price_info?.total_temp_price) || '' },
        { name: 'Tổng tiền', value: formatCurrency(detail?.price_info?.total_price) || '' },
        { name: 'Trạng thái', value: findStatus?.name || '' },
        { name: 'Loại đơn', value: GET_NAME_TYPE_ORDER(detail.type) || '' },
        { name: 'Thao tác', value: detail?.status, button: getActionButton.button, disabled: getActionButton.disabled, name_button: getActionButton.name },
        { name: 'Id các đơn hàng con', value: id_child },
    ]
    for (let item of fields) {
        rows.push(createData(item.name, item.value, item.button, item.disabled, item.name_button))
    }
    return rows
}
var axios = require('axios');

let config = {
    method: 'get',
    url: `${process.env.REACT_APP_LINK_IWS_DEV}/orders/`,
    headers: {
        'Authorization': null
    }
};
export default function CustomPaginationActionsTable() {
    let { id } = useParams();
    const [rows, setRows] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(14);
    const [detail, setDetail] = useState({});
    const [loading, setLoading] = useState(false)
    const [loadingButton, setLoadingButton] = useState(false)
    useEffect(() => {
        console.log(`before - loading: ${loading} - detail: ${detail.id || null}`)
        fetchData()
        console.log(`after - loading: ${loading} - detail: ${detail.id || null}`)
    }, [])

    const fetchData = () => {
        setLoading(true);
        const iws = JSON.parse(localStorage.getItem("iws"))
        config.url = `${process.env.REACT_APP_LINK_IWS_DEV}/orders/${id}`
        config.headers.Authorization = `Bearer ${iws.token}`
        axios(config)
            .then(function (response) {
                console.log('data', response.data.status, response.data.id)
                setRows(createRows(response.data))
                setDetail(response.data)
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setRows({})
                setDetail({})
                setLoading(false);
            });
    };
    let tokenWms = null
    let dataSync = null
    const fetchDataSync = async () => {
        var configSync = {
            method: 'get',
            url: `${process.env.REACT_APP_LINK_WMS_DEV}/output-bills-sync/${id}`,
            headers: {
                'Authorization': `Bearer ${tokenWms}`
            },
            data: ''
        };
        let response = null
        try {
            response = await axios(configSync)
            response = response.data
        } catch (error) {
            console.log('sync-login', error)
        }
        return response || null
    };

    const LoginWMS = async () => {
        let dataLoginWMS = JSON.stringify({
            "email": process.env.REACT_APP_USER_WMS,
            "password": process.env.REACT_APP_PWD_WMS
        })
        var configLoginWMS = {
            method: 'post',
            url: `${process.env.REACT_APP_LINK_WMS_DEV}/login`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: dataLoginWMS
        };
        let response = null
        try {
            response = await axios(configLoginWMS)
            console.log("🚀 ~ file: DetailOrder.js ~ line 145 ~ LoginWMS ~ response", response)
            tokenWms = response.data.token
        } catch (error) {
            console.log('wms-login', error)
        }
        return tokenWms || null

    }

    const createSyncOutput = async (tokenSync, dataCreateOutput) => {
        var configCreateSync = {
            method: 'post',
            url: `${process.env.REACT_APP_LINK_SYNC_DEV}/output-bills`,
            headers: {
                'Authorization': `Bearer ${tokenSync}`,
                'Content-Type': 'application/json'
            },
            data: dataCreateOutput
        };
        let response = null
        try {
            response = await axios(configCreateSync)
            console.log("🚀 ~ file: DetailOrder.js ~ line 166 ~ createSyncOutput ~ response", response)
        } catch (error) {
            console.log('sync-login', error)
            response = error.response
        }
        return response || null

    }

    const loginSync = async () => {
        var dataLoginSync = JSON.stringify({
            "user_name": process.env.REACT_APP_USER_SYNC,
            "password": process.env.REACT_APP_PWD_SYNC
        });

        var configLoginSync = {
            method: 'post',
            url: `${process.env.REACT_APP_LINK_SYNC_DEV}/login`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: dataLoginSync
        };

        let tokenSync = null
        let response = null
        try {
            response = await axios(configLoginSync)
            tokenSync = response.data.token
        } catch (error) {
            console.log('wms-login', error)
        }
        return tokenSync || null

    }
    const ACTION_CONFIRM = 1
    const ACTION_CREATE_OUTPUT_BILL = 2
    const onClickHandle = async (e) => {
        setLoadingButton(true)
        console.log('value', e.target.value)
        let getToken = await LoginWMS()
        console.log('2222', getToken)

        if (tokenWms) {
            let getDataSync = await fetchDataSync()
            console.log('getDataSync', getDataSync)
            if (e.target.value * 1 === ACTION_CONFIRM) {
                alert('Đã xác nhận lệnh thành công')
            }

            if (e.target.value * 1 === ACTION_CREATE_OUTPUT_BILL) {
                let tokenSync = await loginSync()
                let createOutput = await createSyncOutput(tokenSync, getDataSync)
                if (createOutput.status * 1 === 409) {
                    alert('Đã có phiếu xuất cho đơn hàng này ở kho !!!!!!!!!!!!!!!!')
                } else {
                    alert('Đã tạo phiếu xuất thành công !!!!!!!!!!!!!!!!')
                }
            }
            fetchData()
            setLoadingButton(false)

        }
    }


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <div style={{ width: '100%' }}>
            {loading ? (<Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
            ) : (<Table sx={{ width: 500, margin: 'auto' }} >
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
                                {row.button && row.button === true ? (<LoadingButton variant="contained" key={detail.id} id={detail.id} onClick={onClickHandle} value={row.value} name={row.value} color="success" disabled={row.disabled} loading={loadingButton} loadingPosition='start'>  {row.name_button} </LoadingButton>) : row.value}
                            </TableCell>
                        </TableRow>
                    ))}

                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={12} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>)}
        </div>
    );
}
