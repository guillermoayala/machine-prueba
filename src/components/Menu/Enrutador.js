import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Machine from '../../pages/Machine/index'

function Enrutador(props){
    return(
        <Switch>
            <Route path='/Machine/Index'>
                <Machine/>
            </Route>
        </Switch>
    )
}
export default Enrutador;