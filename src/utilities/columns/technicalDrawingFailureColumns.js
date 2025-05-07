import { Popconfirm, Tooltip } from 'antd';
import { BiEdit } from 'react-icons/bi';
import { BsClock } from 'react-icons/bs';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { MdOutlineEngineering, MdOutlineErrorOutline } from 'react-icons/md';
import { PiClockUser } from 'react-icons/pi';
import { TbTrash } from 'react-icons/tb';

export const columns = ({ t, navigation, setSelectedItem, modal, deleteData, setModal }) => [
    {
        title: "",
        key: "empty",
        width: 50,
        render: (a) => {
            return (
                <div className='h40 w40 round border d-flex justify-content-center align-items-center'>
                    <span className='color4'>{a?.id}</span>
                </div>
            )
        }
    },
    {
        title: t('operator'),
        key: t('operator'),
        sorter: (a, b) => a?.operator ? a?.operator?.firstName.localeCompare(b?.operator?.firstName) : a?.user?.firstName.localeCompare(b?.user?.firstName),
        render: (a) => {
            return (
                <div>
                    <div><span>{a?.operator ? a?.operator?.firstName : a?.user?.firstName} {a?.operator ? a?.operator?.lastName : a?.user?.lastName}</span></div>
                    <div><small className='color4'>{new Date(a.date).toLocaleDateString("tr-TR")}</small></div>
                </div>
            )
        }
    },
    {
        title: t('status'),
        key: t('status'),
        render: (a) => {
            return (
                <div>
                    {a?.status ? <IoMdCheckmarkCircleOutline size={20} className='text-success' /> : <MdOutlineErrorOutline size={20} className='text-danger' />}
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
        title: t("make_user"),
        key: 'make_user',
        sorter: (a, b) => a?.user.firstName - b?.user.firstName,
        render: (a) => {
            return (
                <div className='d-flex justify-content-start align-items-center'>
                    <div><PiClockUser size={25} className='color4' /></div>
                    <div className='ml-2'>
                        <div><span>{a?.user?.firstName + " " + a?.user?.lastName.toUpperCase()}</span></div>
                        <div><small className='color4'>{a?.user?.email}</small></div>
                    </div>
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
                        onClick={() => navigation(`/technical-drawing/quality/${a?.id}`)}
                        className='text-warning rounded border ml-2 p-2 cp'
                    >
                        <Tooltip title={t("quality_notes")}>
                            <MdOutlineEngineering size={22} />
                        </Tooltip>
                    </div>
                    <div
                        onClick={() => { setSelectedItem(a?.id); setModal(!modal) }}
                        className='text-primary border ml-2 p-2 cp'
                    >
                        <Tooltip title={t("edit")}>
                            <BiEdit size={22} />
                        </Tooltip>
                    </div>
                    <div className='text-danger border ml-2 rounded p-2 cp'>
                        <Tooltip title={t("delete")}>
                            <Popconfirm
                                title={t("content_delete_desc")}
                                onConfirm={() => deleteData(a?.id)}
                                okText={t("yes")}
                                cancelText={t("no")}
                            >
                                <TbTrash size={22} />
                            </Popconfirm>
                        </Tooltip>
                    </div>
                </div >
            )
        }
    }
];