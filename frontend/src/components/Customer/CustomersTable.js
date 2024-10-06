import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCustomers, updateCustomerActiveStatus } from '../../features/auth/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomersTable = () => {
    const dispatch = useDispatch();
    const { customers, status, error, customerUpdateStatus } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchAllCustomers());
    }, [dispatch]);

    const handleToggleStatus = (customer) => {
        const newStatus = !customer.isActive;
        dispatch(updateCustomerActiveStatus({ 
            id: customer.id, 
            isActive: newStatus, 
            username: customer.username, 
            email: customer.email, 
            role: customer.role, 
            password: customer.password // You may want to handle password securely
        }));

        // Show a toast notification
        if (newStatus) {
            toast.success(`${customer.username} has been activated.`);
        } else {
            toast.warning(`${customer.username} has been deactivated.`);
        }
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
                            <th>Status</th>
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

            {/* Toast Container */}
            <ToastContainer />
        </div>
    );
};

export default CustomersTable;
