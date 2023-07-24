import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import CustomAsyncSelect from './CustomAsyncSelect';
import Select from 'react-select';



async function postData(url, data) {
    let res = await axios.post(url, data)
    return res.data.data
}

async function putData(id, url, data) {
    let res = await axios.put(url + "/" + id, data)
    return res.data.data
}


const payloadCreator = (data) => {
    let payload = {}
    Object.keys(data).forEach(key => {
        if (typeof data[key] == 'object') {
            payload[key] = data[key].value
        } else {
            payload[key] = data[key]
        }
    })
    return payload
}



const DefaultEditor = ({ field, name }) => {
    return (
        <TextField
            {...field}
            className="mb-24"
            label={name}
            autoFocus
            size='small'
            type="string"
            variant="outlined"
            required
            fullWidth
        />
    )
}

const DateEditor = ({ field, name }) => {
    return (
        <TextField
            {...field}
            className="mb-24"
            label={name}
            autoFocus
            size='small'
            type="date"
            variant="outlined"
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
        />
    )
}


const SelectEditor = ({ field, name, selectUrl, payloadKey, searchName , options , defaltValue=null }) => {
    if(options){
        return(<Select value={defaltValue} options={options} placeholder={name} labelName={searchName} />)
        
    }else{
        return (
            <CustomAsyncSelect
                handleChange={field.onChange}
                url={selectUrl}
                name={payloadKey}
                placeholder={name}
                labelName={searchName}
    
            />
        )
    }
    
}

export default function FormCreater({
    columns,
    url,
    handleClose,
    refreshData,
    edit,
    editData
}) {

    // Formda gösterilecek veriler için state 
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false)

    // Form için gerekli olan hooklar ve fonksiyonlar
    const { control, formState, handleSubmit, setError, setValue } = useForm({
        mode: 'onChange',
    });

    // Edit için verileri formda göstermek için
    useEffect(() => {
        if (edit) {
            columns.forEach(col => {
                if(col.formType== "select"){
                    setValue(col.field , {value:editData[col.field]})
                }
                if (col.formInput) {
                    setValue(col.field, editData[col.field])
                }
            })
        }
    }, [editData])

    // Formda hata varsa göstermek için
    const { isValid, dirtyFields, errors } = formState;

    // Form submit edildiğinde
    function onSubmit(formData) {

        let formDataPayload = payloadCreator(formData)
        if (!edit) {
            postData(url, formDataPayload).then(res => {
                refreshData(prev => (!prev))
            })
        } else {
            putData(editData.id, url, formDataPayload).then(res => {
                refreshData(prev => (!prev))
            })
        }
        handleClose()
    }

    return (
        <div className='p-16 w-full'>
            <form
                name="formCreater"
                noValidate
                className="grid grid-cols-2 gap-4 justify-center w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                
                {columns.map(column => {
                    console.log(column)
                    if (column.formInput) {
                        if (column.formType == "textField" || column.formType == undefined) {
                            return (
                                <Controller
                                    name={column.field}
                                    control={control}
                                    render={({ field }) => {

                                        return (
                                            <DefaultEditor field={field} name={column.header} selectUrl={column.selectUrl} />
                                        )
                                    }}
                                />
                            )
                        } else if (column.formType == "select") {
                            return (<Controller
                                name={column.field}
                                control={control}
                                render={({ field }) => {
                                    return (
                                        <SelectEditor
                                            payloadKey={column.field}
                                            field={field} 
                                            name={column.header}
                                            selectUrl={column.selectUrl}
                                            searchName={column.searchName ? column.searchName : "name"}
                                            options = {column.options ? column.options : null}
                                            defaltValue={edit ? editData[column.field]: null}
                                        />
                                    )
                                }}
                            />)
                        }
                        else if (column.formType == "date") {

                            return (<Controller
                                name={column.field}
                                control={control}
                                render={({ field }) => {

                                    return (
                                        <Controller
                                            name={column.field}
                                            control={control}
                                            render={({ field }) => {

                                                return (
                                                    <DateEditor field={field} name={column.header} selectUrl={column.selectUrl} />
                                                )
                                            }}
                                        />
                                    )
                                }}
                            />)
                        }
                    }
                })}
                <Button
                    variant="contained"
                    color="secondary"
                    className="col-span-2  m-16 w-1/4"
                    aria-label="Sign in"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    type="submit"
                    size="large"
                >
                    Save
                </Button>
            </form>
        </div>
    );

}
