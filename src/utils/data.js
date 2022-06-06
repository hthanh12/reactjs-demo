const MEMBERS = [{
  id: 1,
  name: 'chị Hằng',
  avatar_url: 'https://lh3.googleusercontent.com/a-/AOh14GgvoISBkesuPBIUsfEFh1jwt7uYOIP59qqC3SQL=s272-p-k-rw-no'
}, {
  id: 2,
  name: 'chị Thư',
  avatar_url: 'https://lh3.googleusercontent.com/a-/AOh14Giif3FZvInso5KGgKbj2yoynkO3cKXwH8uiGvip=s272-p-k-rw-no'
}]

const TEAM_NAME = 'TEAM WRF'
const TEAM_MEMBER = [
  { id: 1, name: 'Thế Tín', avt: 'https://rocket20.lubrytics.com/avatar/phanthetin' },
  { id: 2, name: 'Minh Hoài', avt: 'https://rocket20.lubrytics.com/avatar/hoai.nguyenminh356' },
  { id: 3, name: 'Hoàng Thành', avt: 'https://rocket20.lubrytics.com/avatar/hoangthanh' }
]
const SERVERS = [
  { id: 1, name: 'DEV', link: process.env.REACT_APP_LINK_IWS_DEV, link_wms: process.env.REACT_APP_LINK_WMS_DEV, link_sync: process.env.REACT_APP_LINK_SYNC_DEV },
  // { id: 2, name: 'STAGING', link: process.env.REACT_APP_LINK_IWS_STAGING },
]


const STATUS_NEW = 1
const STATUS_CONFIRM = 2
const STATUS_CANCELLED_CONFIRM = -2; // xác nhận không hợp lệ
const STATUS_PREPARING_GOODS = 3; // Đăng soạn hàng hóa
const STATUS_READY_TO_DELIVER = 4; // Đã soạn hàng xong, chuẩn bị giao hàng
const STATUS_DELIVERIRNG = 5; // Đang giao hàng
const STATUS_CANCELLED_DELIVER = -5; // Hủy giao hàng
const STATUS_COMPLETED = 6; // Hoàn thành
const STATUSES_ORDER = [{
  id: STATUS_NEW,
  name: 'Chờ xác nhận'
}, {
  id: STATUS_CONFIRM,
  name: 'Đã xác nhận'
}, {
  id: STATUS_CANCELLED_CONFIRM,
  name: 'Hủy đơn hàng'
}, {
  id: STATUS_PREPARING_GOODS,
  name: 'Đang soạn hàng'
}, {
  id: STATUS_READY_TO_DELIVER,
  name: 'Đã soạn'
}, {
  id: STATUS_DELIVERIRNG,
  name: 'Đang giao hàng'
}, {
  id: STATUS_CANCELLED_DELIVER,
  name: 'Hủy giao hàng'
}, {
  id: STATUS_COMPLETED,
  name: 'Hoàn thành'
}]
let GET_NAME_STATUS_ORDER = (id) => {
  let findStatus = STATUSES_ORDER.find(element => element.id === id)
  return findStatus ? findStatus.name : ''
}

export {
  MEMBERS, TEAM_NAME, TEAM_MEMBER, SERVERS, STATUSES_ORDER, GET_NAME_STATUS_ORDER, STATUS_NEW, STATUS_CONFIRM,
  STATUS_CANCELLED_CONFIRM,
  STATUS_PREPARING_GOODS,
  STATUS_READY_TO_DELIVER,
  STATUS_DELIVERIRNG,
  STATUS_CANCELLED_DELIVER,
  STATUS_COMPLETED,
}