import React, { useEffect, useState } from 'react'
import ERP from '../../components/general/ERP'
import Banner from '../../components/page/Banner'
import { useTranslation } from 'react-i18next'
import ERPTable from '../../components/general/ERPTable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAssemblyQualityGetAll } from '../../redux/slices/assemblyQualityGetAllSlice'
import { fetchAssemblyQualityDelete } from '../../redux/slices/assemblyQualityDeleteSlice'
import { columns } from '../../utilities/columns/assemblyQualityColumns'

const TechnicalDrawingQualityPage = () => {
    const { t } = useTranslation()
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const departments = useSelector((state) => state.assemblyQualityGetAll.data)
    const dispatch = useDispatch()

    const getData = async () => {
        setLoading(true)
        await dispatch(fetchAssemblyQualityGetAll())
        setLoading(false)
    }

    const deleteData = async (id) => {
        setLoading(true)
        await dispatch(fetchAssemblyQualityDelete({ id: id }))
        await getData()
        setLoading(false)
    }

    useEffect(() => { getData() }, [dispatch])

    return (
        <ERP>
            <Banner
                modal={modal}
                setModal={setModal}
                isBtn
                title={`${t("technical_drawing")} ${t("quality_management")}`}
                description={t('quality_management_desc')}
            />

            <ERPTable
                data={departments}
                columns={columns({
                    t: t,
                    deleteData: deleteData
                })}
                loading={loading}
            />
        </ERP>
    )
}

export default TechnicalDrawingQualityPage
