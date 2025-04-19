import React from 'react'
import { Alert } from 'reactstrap'

const Alerts = ({ success, error }) => {
    return (
        <>
            {error && <Alert color="danger" className="mb-4">{error}</Alert>}
            {success && <Alert color="success" className="mb-4">{success}</Alert>}
        </>
    )
}

export default Alerts
