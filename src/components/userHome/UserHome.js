import React, { useState, useEffect } from 'react';

function UserHome(props) {

    const [placeholder, setPlaceholder] = useState(null)

    useEffect(() => {
        setPlaceholder("'Placeholder' set via React Hooks useState and useEffect")
    }, {})
    
    return (
        <div className="userHome">
            <h3>UserHome</h3>
            <p>{placeholder}</p>
        </div>
    );
}

export default UserHome; 