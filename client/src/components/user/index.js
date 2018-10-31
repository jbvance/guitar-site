import React from 'react';
import UserLayout from '../../hoc/user_layout';
import Button from '../utils/button';

const UserDashboard = () => {
    return (
        <UserLayout>
            <div>
                <div className="user_info_panel">
                    <h1>User Information</h1>
                    <div>
                        <span>name</span>
                        <span>last name</span>
                        <span>email</span>
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