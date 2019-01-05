import React, { useState } from 'react';
import { auth } from '../../firebase'
import { Layout, Icon, Drawer } from 'antd'

function Header(props) {

    const [visible, setVisible] = useState(false)

    const openMenu = () => {
        console.log('menu opened')
        setVisible(true)
      }
    
      const onClose = () => {
        setVisible(false)
      }

      const logout = () => {
        console.log('logged out...')
        auth.signOut();
        setVisible(false)
      }

      const { Header } = Layout;

    return (
        <div className="header">
            <Layout>
                <Header style={{ backgroundColor: 'gray', textAlign: 'center' }} className="header">
                    <span style={{float: 'left'}} onClick={openMenu}><Icon type="menu-unfold"/></span>
                    <span style={{ fontSize: '2.4em' }}><b>React Boilerplate</b></span>
                </Header>

                <Drawer
                    title='Menu'
                    placement='left'
                    closable={false}
                    onClose={onClose}
                    visible={visible}
                >
                    <p onClick={logout}>Log Out</p>
                    <hr />
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Drawer>

            </Layout>

        </div>
    );
}

export default Header; 
 