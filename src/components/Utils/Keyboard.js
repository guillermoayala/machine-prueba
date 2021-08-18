import React from 'react'
import {Button} from './Button'

const numbers = [1,2,3,4,5,6,7,8,9,0]
const renderButtons = onclickNumber => {
const renderButton = number => (

    <Button 
    text={number.toString()} 
    clickHandler={onclickNumber}
    key={number}
    />
    
    )
        return numbers.map(renderButton)
}

export const Numbers = ({onClickNumber}) =>{
return(
    <section className="numbers">
            {
            renderButtons(onClickNumber)
            }
    </section>
    )
}