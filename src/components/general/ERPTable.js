import React from 'react';
import { Table as AntTable, Spin } from 'antd';

const ERPTable = ({ data, columns, loading = false }) => {
    return (
        <div className="mt-3 table-container">
            <Spin spinning={loading} size="large">
                <AntTable
                    columns={columns}
                    dataSource={data}
                    rowKey={(record, index) => record.id || record.key || `table-row-${index}`}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => {
                            return (
                                <span className='color4'>{`Toplam ${total} kayıt`}</span>
                            )
                        }
                    }}
                    scroll={{ x: true }}
                    locale={{
                        emptyText: 'Veri bulunamadı'
                    }}
                />
            </Spin>
        </div>
    );
};

export default ERPTable;