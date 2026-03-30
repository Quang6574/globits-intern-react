import { useState } from 'react';

export default function CompanyAdd({ onAdd }) {
  const [form, setForm] = useState({ code: '', name: '', address: '' });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = () => {
    if (!form.code || !form.name) return;
    onAdd?.(form);
    setForm({ code: '', name: '', address: '' });
  };

  return (
    <>
      <input name="code" placeholder="Code" type="text" value={form.code} onChange={onChange} />
      <input name="name" placeholder="Name" type="text" value={form.name} onChange={onChange} />
      <input name="address" placeholder="Address" type="text" value={form.address} onChange={onChange} />
      <button type="button" onClick={onSubmit}>Add Company</button>
    </>
  );
}