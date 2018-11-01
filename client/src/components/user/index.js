import React from 'react';
import UserLayout from '../../hoc/user_layout';
import Button from '../utils/button';

const UserDashboard = ({ user }) => {
    return (
        <UserLayout>
            <div>
                <div className="user_info_panel">
                    <h1>User Information</h1>
                    <div>
                        <span>{user.userData.name}</span>
                        <span>{user.userData.lastName}</span>
                        <span>{user.userData.email}</span>
                    </div>
                    <Button type="default"
                            title="Edit account info"
                            linkTo="/user/profile"
                    />
                </div>
                <div className="user_info_panel">
                    <h1>Purchase History</h1>
                    <div className="user_product_block_wrapper">
                        history
                    </div>
                </div>
            </div>
        </UserLayout>
       
    );
};

export default UserDashboard;