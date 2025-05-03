import React, { useEffect, useState } from 'react'
import ERP from '../../../components/general/ERP'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAssemblyVisualNoteGetAllByDrawing } from '../../../redux/slices/assemblyVisualNoteGetAllByDrawingSlice'
import Banner from '../../../components/page/Banner'
import { useTranslation } from 'react-i18next'
import { Card, Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { URL } from '../../../api'
import { Button, Spin } from 'antd'
import { BiTrash } from 'react-icons/bi'
import { fetchAssemblyVisualNoteDelete } from '../../../redux/slices/assemblyVisualNoteDeleteSlice'

const AssemblyVisualNotePage = () => {
    const { id } = useParams()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [selected, setSelected] = useState(null)
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const assemblyVisualNote = useSelector((state) => state.assemblyVisualNoteGetAllByDrawing.data)
    const assemblyVisualNoteStatus = useSelector((state) => state.assemblyVisualNoteGetAllByDrawing.status)

    const getData = async () => { await dispatch(fetchAssemblyVisualNoteGetAllByDrawing({ id: id })) }

    const deleteData = async (id) => {
        await dispatch(fetchAssemblyVisualNoteDelete({ id: id }))
        await getData()
    }

    useEffect(() => {
        if (assemblyVisualNoteStatus === "idle" || assemblyVisualNoteStatus === "loading") setLoading(true)
        else setLoading(false)
    }, [assemblyVisualNoteStatus, dispatch, loading])

    useEffect(() => { getData() }, [dispatch])

    return (
        <ERP>
            <Banner
                title={t("visual_notes")}
                description={t("visual_notes_description")}
                isBtn
            />
            <Spin spinning={loading} size="large">
                <Row>
                    {
                        assemblyVisualNote?.map((item, index) => {
                            return (
                                <Col xs={6} sm={6} md={4} xl={3} xxl={3} key={index} className='mb-4'>
                                    <Card className='erpshadow cp'>
                                        <div onClick={() => { setSelected(item); setModal(!modal) }}>
                                            <img src={`${URL}${item?.files[0]}`} alt='' className='w-100 h150 contain' />
                                        </div>
                                        <div className='d-flex justify-content-center my-2'>
                                            <Button onClick={() => deleteData(item?.id)}><BiTrash size={20} /> Sil</Button>
                                        </div>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Spin>

            <Modal isOpen={modal} toggle={() => setModal(!modal)} className='modal-dialog-centered' size='xxl'>
                <ModalHeader toggle={() => setModal(!modal)}></ModalHeader>
                <ModalBody>
                    <div>
                        <img src={`${URL}${selected?.files[0]}`} alt='' className='w-100' />
                    </div>
                </ModalBody>
            </Modal>
        </ERP>
    )
}

export default AssemblyVisualNotePage
