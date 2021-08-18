import React from 'react'
import { Button, notification, Spin, Card, Tooltip, Skeleton, Modal } from 'antd';

const About = (props) => {
    const { show, setShow } = props
    return (
        <>
            <Modal title="About" visible={show} onOk={() => setShow(false)} onCancel={() => setShow(false)} footer={null}>
                <div className={'name'}>
                    <p>Developed by de Carlos Guillermo Ayala</p>
                </div>
            </Modal>
        </>
    )
}


export default About