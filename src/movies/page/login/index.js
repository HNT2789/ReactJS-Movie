import React, {useState} from 'react';
import {Row,Col,Form, Input, Button} from 'antd';
import { useHistory } from "react-router-dom";
import {api} from '../../services/api';
import {helper} from '../../helpers/common';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const LoginPage = () => {

    const [errorLogin, setErrorLogin] = useState('');
    const history = useHistory();

    const onFinish = (values) => {
        console.log('Success:', values);
        const user = values.username;
        const pass = values.password;
        let token = api.loginUser(user,pass)
        if(token!==null){
            setErrorLogin('');
            helper.saveToken(token);
            console.log('Token',token);
            
            history.push("/search-movie");
            //alert('Chào mừng đến với HomePage');
        }else{
            setErrorLogin('Account invalid');
        }
    };
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        //alert('Tài khoản không tồn tại');
    };

    return(
        <Row style={{marginTop: '30px'}}>
            <Col span={10} offset={7}>
                <h3 style={{textAlign: 'center', color: 'red'}}>{errorLogin}</h3>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                        {/* <Link to="/">Home</Link> */}
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    )
}
export default React.memo(LoginPage);