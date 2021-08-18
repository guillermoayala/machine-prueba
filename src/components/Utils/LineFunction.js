import React, { useEffect } from 'react'
import { SmileTwoTone, HeartTwoTone, CheckCircleTwoTone, VerticalLeftOutlined,CloseOutlined,LoadingOutlined} from '@ant-design/icons';
import { Timeline } from 'antd';

function LineFunction(props) {

    const { arrayData } = props
    console.log(arrayData)


   const array = [{
        Resultado: '1',
        BD_Proceso: 'Peso salida automatico éxitoso'
    },
    {
        Resultado: '2',
        BD_Proceso: 'Peso salida automatico fallo'
    }]
        useEffect(() => {
        // console.log(array)
    }, [])



    function Success({ info: { BD_Proceso } }) {
        return (
            <Timeline.Item dot={<CheckCircleTwoTone twoToneColor="#52c41a" />} >
                {BD_Proceso}
            </Timeline.Item>
        )
    }
    function Fail({ info: { BD_Proceso } }) {
        return (
            <Timeline.Item dot={<CloseOutlined />} >
                {BD_Proceso}
            </Timeline.Item>
        )
    }
    function Loading({ info: { BD_Proceso } }) {
        return (
            <Timeline.Item dot={<LoadingOutlined />} >
                {BD_Proceso}
            </Timeline.Item>
        )
    }

    const Switch = ({info}) => {
        switch (info.Resultado) {
            case '1':
                return <Success info={info} />
            case '2':
                return <Fail info={info} />
            case '3':
                return <Loading info={info} />
            default:
                return <Loading info={info} />
                break;
        }
    }

    return (
        <>

            <div className="col-lg-12">

             <Timeline>
                {
                    arrayData.map((e, index) => <Switch key={index} info={e} />)
                }
            </Timeline>

</div>

        </>
    )
}

export default LineFunction;