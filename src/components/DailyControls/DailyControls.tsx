import { useState } from "react"
import { Form } from "react-bootstrap";
import './DailyControls.css'


type DCData = {
    "Cantidad": number;
    "Tipo de entrega": number;
    "Coord X": number;
    "Coord Y": number;
}
type ILProps = {
    name: string,
    value: number,
    data: DCData,
    setData: React.Dispatch<React.SetStateAction<DCData>>
}

const initData: DCData = {
    Cantidad: 0,
    "Tipo de entrega": 0, //hLimit
    "Coord X": 0,
    "Coord Y": 0
}

function DailyControls() {
    const [data, setData] = useState(initData)
    return (
        <div className="DailyControls">
                <div className="DailyControls_left">
                    <div className="DailyControls_title">
                        <span>Nuevo pedido</span>
                    </div>
                    <div className="DailyControls_box">
                        <InputLabel name="Cantidad" data={data} setData={setData} value={data.Cantidad}/>
                        <InputLabel name="Tipo de entrega" data={data} setData={setData} value={data["Tipo de entrega"]}/>
                        <InputLabel name="Coord X" data={data} setData={setData} value={data["Coord X"]}/>
                        <InputLabel name="Coord Y" data={data} setData={setData} value={data["Coord Y"]}/>
                    </div>
                </div>
                <div className="DailyControls_right">
                    <button className="ButtonTH secondary">SELECCIONAR</button>
                    <button className="ButtonTH primary">REGISTRAR</button>
                </div>
            </div>
    )
}

function InputLabel({name, data, value, setData}: ILProps) {
    const handleChange = (e: React.ChangeEvent<any>) => {
        const attr: string = e.target.name
        const val = e.target.value
        setData({
            ...data, 
            [attr]: Number(val >= 0? val: 0)
        }) 
    }

    return (
        <Form.Group className="InputLabel">
            <Form.Label className="InputLabel_label">
                {name}:
            </Form.Label>
            {
                name === "Tipo de entrega"? 
                <Form.Select className="InputLabel_control" defaultValue="24" name={name} onChange={handleChange} >
                    <option value="24">24 horas (estandar)</option>
                    <option value="8">8 horas (prime)</option>
                    <option value="6">6 horas (prime)</option>
                    <option value="4">4 horas (prime)</option>
                </Form.Select>:
                <Form.Control className="InputLabel_control" type="number" 
                    value={value} onChange={handleChange} name={name}/>
            }
        </Form.Group>
    )
}

export default DailyControls