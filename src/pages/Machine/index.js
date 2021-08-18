import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Alert } from '../../components/Utils/Alert'
import LineFunction from '../../components/Utils/LineFunction'
import { Button, notification, Spin, Card, Tooltip, Skeleton } from 'antd';
import { renderButtons } from '../../components/Utils/Keyboard';
import { Timeline } from 'antd';
import { SmileTwoTone, HeartTwoTone, CheckCircleTwoTone, VerticalLeftOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import About from './About'
const Machine = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [peticiones, setPeticiones] = useState([])
    const [pedidos, setPedidos] = useState([])
    const [acum, setAcum] = useState(0)
    const [loadingProduct, setLoadingProduct] = useState(false)
    const [show, setShow] = useState(false)
    let counterPeticiones = 0
    //Metodo para obtener los productos
    const getProducts = async () => {
        try {
            const { data: { data } } = await axios.get('https://vending-machine-test.vercel.app/api/products')
            //map para agrear el index a los productos
            const dataIndexed = data.map((e, key) => ({ ...e, key }))
            setData(dataIndexed)

            //Ocultar el skeleton de los productos
            setLoading(false)
        } catch (error) {
            Alert('Error', 'houston, we have a problem', 'error')

        }

    }
    useEffect(() => {
        getProducts()
    }, [])




    useEffect(() => {
        //Contador para el acomulador de tiempo de espera
        let count = 0
        //El tiempo del nuevo producto se le agrega al acomulado
        for (const i in pedidos) {
            count = count + pedidos[i].preparation_time
        }
        //Metodo para ocultar el cargando cuando se acabe el acum
        setTimeout(() => {
            setLoadingProduct(false)
        }, count * 1000)
    }, [pedidos])

    //Metodo para agregar producto a la linea de tiempo
    const agregarProducto = ({ preparation_time, name }) => {
        //Activar el cargando
        setLoadingProduct(true)

        //se agrega el tiempo del producto al estado que contiene el acomulador
        setAcum(acum + preparation_time * 1000);

        //Se agrega el producto al state de pedidos
        setPedidos([...pedidos, { preparation_time, name, title: 'Create order' }]);

        setTimeout(() => {
            Alert('Success', 'Your order of ' + name + ' is done', 'success')
            setPedidos([...pedidos, { preparation_time: preparation_time, name: name, title: 'End' }]);

        }, preparation_time * 1000)
    };

    //Mapeo de los productos
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

                <Skeleton
                    loading={loading}
                    active>

                    <div
                        className="contenedor-products">
                        {productList}
                    </div>
                </Skeleton>
                <div className="keyboard col-lg-4">
                    <Card
                        title={'Your orders'}
                        style={{ height: '700px' }}
                        actions={[
                            <Button type='primary' onClick={() => setPedidos([])}>Clean</Button>
                        ]}
                        extra={[
                            <Button type='primary' onClick={() => setShow(true)}>About</Button>

                        ]}>
                        <LineFunction arrayData={peticiones}></LineFunction>
                        <Timeline>
                            {pedidos.map((p, key) => (

                                <Timeline.Item key={key}>
                                    <p>Order of {p.name}</p>
                                </Timeline.Item>

                            ))}
                        </Timeline>
                        {
                            loadingProduct ?
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Spin tip={'Loading order'}></Spin>
                                    </div>
                                </>
                                :
                                <>

                                </>
                        }
                    </Card>
                </div>
                <About show={show} setShow={setShow}></About>


            </div>
        </>
    )
}
export default Machine