import React from 'react'
import PropTypes from 'prop-types'
import {Card} from 'antd'

export const Button = ({ type, text, clickHandler }) => {
    return (
        <>
            <button
                className={type}
                onClick={() => {
                    clickHandler(text)
                }}>
                <span>{text}</span>
            </button>

            <Card title={'Ant deign'}></Card>
        </>
    )
}

