import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Alert } from '../../components/Utils/Alert'
import LineFunction from '../../components/Utils/LineFunction'
import { Button, notification, Spin, Card, Tooltip, Skeleton } from 'antd';
import { renderButtons } from '../../components/Utils/Keyboard';
import { Timeline } from 'antd';
import { SmileTwoTone, HeartTwoTone, CheckCircleTwoTone, VerticalLeftOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons';

const Machine = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [peticiones, setPeticiones] = useState([])
    const [pedidos, setPedidos] = useState([])
    const [acum, setAcum] = useState(0)

    let counterPeticiones = 0

    const getProducts = async () => {
        try {
            const { data: { data } } = await axios.get('https://vending-machine-test.vercel.app/api/products')
            const dataIndexed = data.map((e, key) => ({ ...e, key }))
            setData(dataIndexed)
            setLoading(false)
        } catch (error) {
            Alert('Error', 'Algo salio mal', 'error')

        }

    }
    useEffect(() => {
        getProducts()
    }, [])


  

    const agregarProducto = ({ preparation_time, name }) => {
        setAcum(acum + preparation_time * 1000);
        setPedidos([...pedidos, { preparation_time, name, title:'Create order' }]);

        setTimeout(() => {
            Alert('Ready', 'Se completo la orden de ' + name, 'success')
            setPedidos([...pedidos, { preparation_time: preparation_time, name: name, title: 'End' }]);
        }, preparation_time * 1000)
    };


    let array = []
    const agregarProducto2 = (e, number) => {
        setPedidos([...pedidos, { preparation_time: e.preparation_time, name: e.name }]);

        const obj = {
            Resultado: '3',
            BD_Proceso: 'Loading ' + e.name,
            preparation_time: e.preparation_time,
            name: e.name
        }
        array.push(obj)
        console.log(array)

        // setPeticiones([...peticiones, obj])

        setTimeout(() => {

            Alert('Ready', 'Se completo la orden de ' + e.name, 'success')

            const objDone = {
                Resultado: '1',
                BD_Proceso: 'Orden de ' + e.name + ' completada',
                preparation_time: e.preparation_time,
                name: e.name
            }
            array.push(objDone)
            console.log(array)
            // setPeticiones([...peticiones, objDone])
        }, e.preparation_time * 1000)
    }


    useEffect(() => {

    }, [peticiones])


    let productList = data.length > 0
        && data.map((data, i) => {
            return (
                <div className="col-lg-2" key={data.id} style={{ paddingTop: '15px' }}>
                    <Card title={data.name}>
                        <Tooltip title={'Preparation time ' + data.preparation_time + ' seconds'}>
                            <div className=" card-product">
                                <img src={data.thumbnail} className="product-img" onClick={() => agregarProducto(data, i)}></img>
                            </div>
                        </Tooltip>

                    </Card>

                </div>
            )
        })

    return (
        <>
            <div className="container-principal">

                <Skeleton loading={loading} active>

                    <div className="contenedor-products">
                        {productList}
                    </div>
                </Skeleton>
                <div className="keyboard col-lg-4">
                    <Card title={'Make your order'} style={{ height: '700px' }} actions={[
                        <Button type='primary' onClick={()=> setPedidos([])}>Clean</Button>
                    ]}>
                        <LineFunction arrayData={peticiones}></LineFunction>
                        <Timeline>
                            {pedidos.map((p, key) => (

                                <Timeline.Item key={key}>
                                    <p>{p.title} of {p.name}</p>
                                </Timeline.Item>

                            ))}
                        </Timeline>

                        <renderButtons></renderButtons>
                    </Card>
                </div>



            </div>
        </>
    )
}
export default Machine