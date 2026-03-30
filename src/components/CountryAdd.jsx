import {useState} from 'react'

export default function CountryAdd({onAdd}) {
    const [form, setForm] = useState({name: '', code: '', description: ''});

    const onChange = (e) => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
    }

    const onSubmit = () => {
        if (!form.name || !form.code) return;
        onAdd?.(form)
        setForm({name: '', code: '', description: ''});
    }

    return (
        <>
            <input name="name" placeholder="Name" type="text" value={form.name} onChange={onChange} />
            <input name="code" placeholder="Code" type="text" value={form.code} onChange={onChange} />
            <input name="description" placeholder="Description" type="text" value={form.description} onChange={onChange} />
            <button type="button" onClick={onSubmit}>Add country</button>
        </>
    )
    

}