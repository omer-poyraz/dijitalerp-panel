import { Col, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { URL } from '../../api'

const AssemblyManualView = ({ viewModal, setViewModal, data }) => {
    return (
        <Modal isOpen={viewModal} toggle={() => setViewModal(!viewModal)} size="xl">
            <ModalHeader className='border-0' toggle={() => setViewModal(!viewModal)} tag="h5">{data?.projectName}</ModalHeader>
            <ModalBody>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6} className='mb-3'>
                        <iframe
                            src={`${URL}${data?.files[0]}`}
                            width="100%"
                            height="500px"
                            title="Assembly Manual"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} xl={6} className='mb-3'>
                        <div><strong>Proje Adı: </strong><span>{data?.projectName}</span></div>
                        <div className='mt-1'><strong>Açıklama: </strong><span>{data?.description}</span></div>
                        <div className='mt-1'><strong>Parça Kodu: </strong><span>{data?.partCode}</span></div>
                        <div className='mt-1'><strong>Sorumlu Kişi: </strong><span>{data?.personInCharge?.firstName} {data?.personInCharge?.lastName}</span></div>
                        <div className='mt-1'><strong>Üretim Miktarı: </strong><span>{data?.productionQuantity}</span></div>
                        <div className='mt-1'><strong>Kalite Sorumlusu: </strong><span>{data?.qualityOfficer?.firstName} {data?.qualityOfficer?.lastName}</span></div>
                        <div className='mt-1'><strong>Sorumlu: </strong><span>{data?.responible?.firstName} {data?.responible?.lastName}</span></div>
                        <div className='mt-1'><strong>Seri Numarası: </strong><span>{data?.serialNumber}</span></div>
                        <div className='mt-1'><strong>Tekniker Tarihi: </strong><span>{new Date(data?.technicianDate).toLocaleDateString()}</span></div>
                        <div className='mt-1'><strong>Zaman: </strong><span>{data?.time} Gün</span></div>
                        <div className='mt-1'><strong>Ekleme Tarihi: </strong><span>{new Date(data?.createdAt).toLocaleDateString()}</span></div>
                        <div className='mt-1'><strong>Güncelleme Tarihi: </strong><span>{new Date(data?.updatedAt).toLocaleDateString() || "Yok"}</span></div>
                        <div className='mt-1'><strong>Son Değişiklik Yapan: </strong><span>{data?.user?.firstName} {data?.user?.lastName}</span></div>
                    </Col>
                </Row>


            </ModalBody>
        </Modal>
    )
}

export default AssemblyManualView
