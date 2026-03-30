import { useState } from 'react';

export default function DepartmentAdd({ onAdd }) {
  const [form, setForm] = useState({ code: '', name: ''});

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = () => {
    if (!form.code || !form.name) {
      alert("Code and Name are required!");
      return;
    }
    onAdd?.(form);
    setForm({ code: '', name: ''});
  };

  return (
    <>
      <input name="code" placeholder="Code" type="text" value={form.code} onChange={onChange} />
      <input name="name" placeholder="Name" type="text" value={form.name} onChange={onChange} />
      <button type="button" onClick={onSubmit}>Add Department</button>
    </>
  );
}