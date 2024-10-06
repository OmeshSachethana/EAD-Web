import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCustomers, updateCustomerActiveStatus } from '../../features/auth/authSlice';

const CustomersTable = () => {
    const dispatch = useDispatch();
    const { customers, status, error, customerUpdateStatus } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchAllCustomers());
    }, [dispatch]);

    const handleToggleStatus = (customer) => {
        dispatch(updateCustomerActiveStatus({ 
            id: customer.id, 
            isActive: !customer.isActive, 
            username: customer.username, 
            email: customer.email, 
            role: customer.role, 
            password: customer.password // You may want to handle password securely
        }));
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Customers List</h2>
            {status === 'loading' && <div className="alert alert-info">Loading...</div>}
            {error && <div className="alert alert-danger">Error: {typeof error === 'object' ? JSON.stringify(error) : error}</div>}

            {customers.length > 0 ? (
                <table className="table table-striped table-bordered table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>IsActive</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td>{customer.username}</td>
                                <td>{customer.email}</td>
                                <td>{customer.role}</td>
                                <td className={customer.isActive ? 'text-success' : 'text-danger'}>
                                    {customer.isActive ? 'Active' : 'Inactive'}
                                </td>
                                <td>
                                    <button
                                        className={`btn ${customer.isActive ? 'btn-danger' : 'btn-success'}`}
                                        onClick={() => handleToggleStatus(customer)} // Pass the entire customer object
                                        disabled={customerUpdateStatus === 'loading'}
                                    >
                                        {customer.isActive ? 'Deactivate' : 'Activate'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-warning">No customers found.</div>
            )}
        </div>
    );
};

export default CustomersTable;
