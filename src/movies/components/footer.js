import React from 'react';
import {Layout} from 'antd';

const {Footer} = Layout;

const FooterMovie = () => {
    return(
        <Footer style={{ textAlign: 'center' }}>App Movie 2021 Created by Me</Footer>
    )
}
export default React.memo(FooterMovie);