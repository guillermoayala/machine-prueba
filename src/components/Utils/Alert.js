import React from 'react';
import {  notification  } from 'antd';
import {  CheckCircleTwoTone,WarningTwoTone, InfoCircleTwoTone  } from '@ant-design/icons';

export const Alert = (message,description,icon) => {
    let Icono = null
    switch (icon) {
        case 'error':
            Icono = <WarningTwoTone twoToneColor="#dc3545"/>
            break;

        case 'info':
            Icono = <InfoCircleTwoTone twoToneColor="#22A3C2"/>
            break;
        case 'warning':
            Icono = <InfoCircleTwoTone twoToneColor="#ffc107"/>
            break;
    
        default:
            Icono = <CheckCircleTwoTone twoToneColor="#52c41a" />
            break;
    }
    notification.open({
      message,
      description,
      icon: Icono,
    });
}