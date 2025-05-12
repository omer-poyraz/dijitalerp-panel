import { Popconfirm, Tooltip } from 'antd';
import { BiEdit } from 'react-icons/bi';
import { BsClock, BsEye } from 'react-icons/bs';
import { FaFile } from 'react-icons/fa';
import { PiClockUser } from 'react-icons/pi';
import { TbTrash } from 'react-icons/tb';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineErrorOutline, MdOutlineSpeakerNotes } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";

export const columns = ({ t, setSelectedItem, modal, deleteData, setModal, setViewModal, navigation }) => [
    {
        title: "",
        key: "empty",
        width: 50,
        render: (a) => {
            return (
                <div className='h40 w40 round border d-flex justify-content-center align-items-center'>
                    {
                        a?.files.length > 0 && a?.files[0]
                            ? <FaFile size={20} className='color4' />
                            : <span className='color4'>{a?.id}</span>
                    }
                </div>
            )
        }
    },
    {
        title: t('project_name'),
        key: t('project_name'),
        sorter: (a, b) => a?.projectName.localeCompare(b.projectName),
        render: (a) => {
            return (
                <div>
                    <div><span>{a?.projectName}</span></div>
                    <div><small className='color4'>{a.partCode}</small></div>
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
                        onClick={() => { setSelectedItem(a?.id); setModal(!modal) }}
                        className='text-primary rounded border ml-2 p-2 cp'
                    >
                        <Tooltip title={t("edit")}>
                            <BiEdit size={22} />
                        </Tooltip>
                    </div>
                    <div
                        onClick={() => navigation(`/cmm-success/${a?.id}`)}
                        className='text-success rounded border ml-2 p-2 cp'
                    >
                        <Tooltip title={t("appropriate")}>
                            <IoMdCheckmarkCircleOutline size={22} />
                        </Tooltip>
                    </div>
                    <div
                        onClick={() => navigation(`/cmm-failure/${a?.id}`)}
                        className='text-danger rounded border ml-2 p-2 cp'
                    >
                        <Tooltip title={t("inappropriateness")}>
                            <MdOutlineErrorOutline size={22} />
                        </Tooltip>
                    </div>
                    <div
                        onClick={() => navigation(`/cmm-note/${a?.id}`)}
                        className='text-info rounded border ml-2 p-2 cp'
                    >
                        <Tooltip title={t("notes")}>
                            <MdOutlineSpeakerNotes size={22} />
                        </Tooltip>
                    </div>
                    <div
                        onClick={() => { setSelectedItem(a?.id); setViewModal(true) }}
                        className='text-info rounded border ml-2 p-2 cp'
                    >
                        <Tooltip title={t("view")}>
                            <BsEye size={22} />
                        </Tooltip>
                    </div>
                    <div className='text-danger rounded border ml-2 rounded p-2 cp'>
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