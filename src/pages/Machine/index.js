import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Alert } from '../../components/Utils/Alert'
import LineFunction from '../../components/Utils/LineFunction'
import { Button, notification, Spin, Card } from 'antd';
import {renderButtons} from '../../components/Utils/Keyboard';
const Machine = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [peticiones, setPeticiones] = useState([
    ])

    let counterPeticiones = 0

    const getProducts = async () => {
        try {
            const { data: { data } } = await axios.get('https://vending-machine-test.vercel.app/api/products')
            setData(data)
            Alert('Exito', 'Se obtenieron los productos con exito', 'succes')
            setLoading(false)
        } catch (error) {
            Alert('Error', 'Algo salio mal', 'error')

        }

    }
    useEffect(() => {
        getProducts()

    }, [])

    const agregarProducto = (e,number) => {

        let counter = peticiones.length
        const obj = {
            Resultado: '3',
            BD_Proceso: 'Loading ' + e.name
        }
        setPeticiones([...peticiones, obj])
    }

    let productList = data.length > 0
        && data.map((data, i) => {
            return (
                <div className="col-lg-2" key={data.id} style={{ paddingTop: '15px' }}>
                    <Card title={data.name}>
                        <div className=" card-product">
                            <img src={data.thumbnail} className="product-img" onClick={()=>agregarProducto(data,i)}></img>
                        </div>
                    </Card>

                </div>
            )
        })

    return (
        <>
            <div className="container-principal">
                {
                    loading ?
                        <>
                            <div className="mySpinner">
                                <Spin />
                            </div>
                        </>
                        :
                        <>
                            <div className="contenedor-products">
                                {productList}
                            </div>
                            <div className="keyboard col-lg-4">
                                <Card title={'Make your order'}>
                                    <LineFunction arrayData={peticiones}></LineFunction>
                                    <renderButtons></renderButtons>
                                </Card>
                            </div>
                        </>

                }

            </div>
        </>
    )
}
export default Machine