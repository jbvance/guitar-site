import React from 'react';

const PageTop = (props) => {
    return (
        <div>
            <div className="page_top">
                <div className="container">
                    {props.title}
                </div>
            </div>
        </div>
    );
};

export default PageTop;