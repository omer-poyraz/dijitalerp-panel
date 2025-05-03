import React from 'react'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { PiPlus } from 'react-icons/pi'

const Banner = ({ modal, setModal, title, description, isBtn }) => {
    const { t } = useTranslation()

    return (
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h5 className="">{title}</h5>
                <small className="mt--5 d-block">{description}</small>
            </div>
            <div>
                {!isBtn ? <Button onClick={() => setModal(!modal)}><PiPlus />{t("add_new")}</Button> : null}
            </div>
        </div>
    )
}

export default Banner
