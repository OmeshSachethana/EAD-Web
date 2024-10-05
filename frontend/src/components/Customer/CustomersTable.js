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
      <div>
        <h2>Customers List</h2>
        {status === 'loading' && <p>Loading...</p>}
        {error && <p>Error: {typeof error === 'object' ? JSON.stringify(error) : error}</p>}
  
        {customers.length > 0 && (
          <table className="table">
            <thead>
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
                <td>{customer.isActive ? 'Active' : 'Inactive'}</td>
                <td>
                <button
                    className="btn btn-primary"
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
        )}
      </div>
    );
};
  
export default CustomersTable;