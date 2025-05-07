import { Popconfirm, Tooltip } from 'antd';
import { BiEdit } from 'react-icons/bi';
import { BsClock } from 'react-icons/bs';
import { TbTrash } from 'react-icons/tb';

export const columns = ({ t, setSelectedItem, modal, deleteData, setModal }) => [
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
        title: t('name'),
        key: t('name'),
        sorter: (a, b) => a?.name.localeCompare(b.name),
        render: (a) => {
            return (
                <div>
                    <div><span>{a?.name}</span></div>
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
        title: t('process'),
        render: (a) => {
            return (
                <div className='d-flex justify-content-start'>
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