import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, Nav, NavItem, NavLink } from 'reactstrap';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { FaBoxes, FaMoneyBillWave } from 'react-icons/fa';
import ERP from '../../components/general/ERP';

Chart.register(...registerables);

const HomePage = () => {
    const [activeTab, setActiveTab] = useState('daily');

    const salesData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Revenue',
                data: [12500, 19200, 15700, 18600, 21400, 20300, 22150, 23100, 26200, 24800, 29100, 31500],
                borderColor: '#1266ad',
                backgroundColor: 'rgba(18, 102, 173, 0.1)',
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Expenses',
                data: [8400, 9100, 8900, 9700, 10400, 10800, 11200, 12100, 12800, 13400, 14100, 15200],
                borderColor: '#ff6b6b',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
                tension: 0.4,
                fill: true,
            }
        ]
    };

    const categoryData = {
        labels: ['Electronics', 'Furniture', 'Clothing', 'Office Supplies', 'Food & Beverage'],
        datasets: [
            {
                label: 'Sales Volume',
                data: [43500, 29800, 21400, 19600, 12700],
                backgroundColor: [
                    'rgba(18, 102, 173, 0.7)',
                    'rgba(0, 56, 91, 0.7)',
                    'rgba(64, 145, 220, 0.7)',
                    'rgba(105, 180, 240, 0.7)',
                    'rgba(157, 210, 255, 0.7)'
                ],
                borderWidth: 1
            }
        ]
    };

    const distributionData = {
        labels: ['Online', 'In-Store', 'Wholesale', 'Direct Sales'],
        datasets: [
            {
                data: [45, 25, 20, 10],
                backgroundColor: [
                    '#1266ad',
                    '#00385b',
                    '#4091dc',
                    '#9dd2ff'
                ],
                borderWidth: 1
            }
        ]
    };

    const customerData = {
        labels: ['Corporate', 'SMB', 'Individual', 'Government'],
        datasets: [
            {
                data: [38, 32, 22, 8],
                backgroundColor: [
                    '#1266ad',
                    '#00385b',
                    '#4091dc',
                    '#9dd2ff'
                ],
                borderWidth: 1
            }
        ]
    };

    return (
        <ERP>
            <div className="dashboard">
                <div className="dashboard-header mb-4">
                    <Container fluid>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h1 className="dashboard-title">Dashboard</h1>
                        </div>

                        <Row className="g-4">
                            <Col lg={8} md={12} className="mb-4">
                                <Card className="chart-card">
                                    <CardBody>
                                        <div className="d-flex justify-content-between align-items-center mb-4">
                                            <h5 className="card-title">Revenue Trends</h5>
                                            <Nav tabs className="chart-nav">
                                                <NavItem>
                                                    <NavLink
                                                        className={activeTab === 'revenue' ? 'active' : ''}
                                                        onClick={() => setActiveTab('revenue')}
                                                    >
                                                        Revenue
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={activeTab === 'orders' ? 'active' : ''}
                                                        onClick={() => setActiveTab('orders')}
                                                    >
                                                        Orders
                                                    </NavLink>
                                                </NavItem>
                                                <NavItem>
                                                    <NavLink
                                                        className={activeTab === 'profit' ? 'active' : ''}
                                                        onClick={() => setActiveTab('profit')}
                                                    >
                                                        Profit
                                                    </NavLink>
                                                </NavItem>
                                            </Nav>
                                        </div>
                                        <div className="chart-container">
                                            <Line
                                                data={salesData}
                                                options={{
                                                    plugins: {
                                                        legend: {
                                                            position: 'top',
                                                            align: 'end'
                                                        }
                                                    },
                                                    scales: {
                                                        y: {
                                                            beginAtZero: true,
                                                            grid: {
                                                                borderDash: [5, 5],
                                                            }
                                                        },
                                                        x: {
                                                            grid: {
                                                                display: false
                                                            }
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col lg={4} md={6} className="mb-4">
                                <Card className="chart-card">
                                    <CardBody>
                                        <h5 className="card-title mb-4">Top Product Categories</h5>
                                        <div className="chart-container">
                                            <Bar
                                                data={categoryData}
                                                options={{
                                                    indexAxis: 'y',
                                                    plugins: {
                                                        legend: {
                                                            display: false
                                                        }
                                                    },
                                                    scales: {
                                                        x: {
                                                            grid: {
                                                                display: false
                                                            }
                                                        },
                                                        y: {
                                                            grid: {
                                                                display: false
                                                            }
                                                        }
                                                    }
                                                }}
                                            />
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col lg={4} md={6} className="mb-4">
                                <Card className="chart-card">
                                    <CardBody>
                                        <h5 className="card-title mb-4">Sales Distribution</h5>
                                        <div className="chart-container d-flex justify-content-center">
                                            <div style={{ maxWidth: '70%' }}>
                                                <Pie
                                                    data={distributionData}
                                                    options={{
                                                        plugins: {
                                                            legend: {
                                                                position: 'bottom'
                                                            }
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col lg={4} md={6} className="mb-4">
                                <Card className="chart-card">
                                    <CardBody>
                                        <h5 className="card-title mb-4">Customer Segments</h5>
                                        <div className="chart-container d-flex justify-content-center">
                                            <div style={{ maxWidth: '70%' }}>
                                                <Doughnut
                                                    data={customerData}
                                                    options={{
                                                        plugins: {
                                                            legend: {
                                                                position: 'bottom'
                                                            }
                                                        },
                                                        cutout: '70%'
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>

                            <Col lg={4} md={6} className="mb-4">
                                <Card className="chart-card">
                                    <CardBody>
                                        <h5 className="card-title mb-4">Recent Activities</h5>
                                        <div className="activity-list">
                                            {[1, 2, 3, 4, 5].map((item) => (
                                                <div key={item} className="activity-item">
                                                    <div className="activity-icon">
                                                        {item % 2 === 0 ? <FaBoxes /> : <FaMoneyBillWave />}
                                                    </div>
                                                    <div className="activity-content">
                                                        <div className="activity-title">
                                                            {item % 2 === 0 ? 'New Order #' + (1000 + item) : 'Payment Received'}
                                                        </div>
                                                        <div className="activity-subtitle">
                                                            {item % 2 === 0 ? 'From Customer #' + (8000 + item) : '₺' + (item * 1240)}
                                                        </div>
                                                    </div>
                                                    <div className="activity-time">
                                                        {item}h ago
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </ERP>
    );
};

export default HomePage;