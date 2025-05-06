import { Popconfirm } from 'antd';
import { BiEdit } from 'react-icons/bi';
import { BsClock } from 'react-icons/bs';
import { PiClockUser } from 'react-icons/pi';
import { TbTrash } from 'react-icons/tb';
import { URL } from '../../api';

export const columns = ({ t, setSelectedItem, modal, deleteData, setModal }) => [
    {
        title: "",
        key: "empty",
        width: 50,
        render: (a) => {
            return (
                <div className='h40 w40 round border d-flex justify-content-center align-items-center'>
                    {
                        a?.file ? <img src={`${a?.file.search("http") === -1 ? URL : ""}${a?.file}`} className='h30 w30 round' alt='' />
                            : <span className='color4'>{a?.id}</span>
                    }
                </div>
            )
        }
    },
    {
        title: t('name'),
        key: t('name'),
        sorter: (a, b) => a?.firstName.localeCompare(b.firstName),
        render: (a) => {
            return (
                <div>
                    <div><span>{a?.firstName} {a?.lastName}</span></div>
                    <div><small className='color4'>{a?.email}</small></div>
                </div>
            )
        }
    },
    {
        title: t('phone'),
        key: t('phone'),
        render: (a) => {
            return (
                <div>
                    <div><span>{a?.phoneNumber}</span></div>
                    <div><small className='color4'>{new Date(a?.startDate).toLocaleDateString("tr-TR")}</small></div>
                </div>
            )
        }
    },
    {
        title: t('changed_at'),
        key: 'changed_at',
        sorter: (a, b) => new Date(a?.updatedAt ? a?.updatedAt : a?.createdAt) - new Date(b?.updatedAt ? b?.updatedAt : b?.createdAt),
        render: (a) => {
            return (
                <div className='d-flex justify-content-start align-items-center'>
                    <div><BsClock size={20} className='color4' /></div>
                    <div className='ml-2'>
                        <div><span>{new Date(a?.updatedAt ? a?.updatedAt : a?.createdAt).toLocaleDateString("tr-TR")}</span></div>
                        <div><small className='color4'>{new Date(a?.updatedAt ? a?.updatedAt : a?.createdAt).toLocaleTimeString("tr-TR")}</small></div>
                    </div>
                </div>
            )
        }
    },
    {
        title: t('role'),
        key: t('role'),
        render: (a) => {
            return (
                <div>
                    <div><span>{a?.roles[0]?.name}</span></div>
                </div>
            )
        }
    },
    {
        title: t('process'),
        render: (a) => {
            return (
                <div className='d-flex justify-content-start'>
                    <div
                        onClick={() => { setSelectedItem(a?.userId); setModal(!modal) }}
                        className='text-primary border ml-2 p-2 cp'
                    >
                        <BiEdit size={22} />
                    </div>
                    <div className='text-danger border ml-2 rounded p-2 cp'>
                        <Popconfirm
                            title={t("content_delete_desc")}
                            onConfirm={() => deleteData(a?.userId)}
                            okText={t("yes")}
                            cancelText={t("no")}
                        >
                            <TbTrash size={22} />
                        </Popconfirm>
                    </div>
                </div >
            )
        }
    }
];