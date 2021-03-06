import { Layout, Menu } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { Link, useLocation, useHistory } from "react-router-dom";
import {helper} from '../helpers/common';


const DivLogoHeader = styled.div`
    float: left;
    width: 120px;
    height: 31px;
    margin: 16px 24px 16px 0;
    background: rgba(255, 255, 255, 0.3);
`;
const { Header } = Layout;

const HeaderMovie = () => {
    const history = useHistory();
    const {pathname} = useLocation();
    const info = helper.decryptTokenLocalStorage();
    const username = info !==null? info.email :null;
    console.log('info',info);
    console.log(pathname);
    
    const logoutUser = () => {
        helper.removeToken();
        history.push('/');
    }
    return(
        <Header>
            <DivLogoHeader/>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={pathname}>
                <Menu.Item key="/search-movie">
                    <Link to="/search-movie"> Search movie</Link>
                </Menu.Item>

                <Menu.Item key="/popular-movie">
                    <Link to="/popular-movie"> Popular movie</Link>
                </Menu.Item>

                <Menu.Item key="/upcoming-movie">
                    <Link to="/upcoming-movie">Upcoming movies </Link>
                </Menu.Item>
                
                {
                    info===null &&
                    <Menu.Item key="/" >
                        <Link to="/">Login</Link>
                    </Menu.Item>
                }
                <Menu.Item>
                    <span>Hi: {username}</span>
                </Menu.Item>
                
                {
                    info!==null &&
                    <Menu.Item onClick={() => logoutUser()}>
                        <span>Logout</span>
                    </Menu.Item>
                }

            </Menu>
        </Header>
    )
}
export default React.memo(HeaderMovie);
