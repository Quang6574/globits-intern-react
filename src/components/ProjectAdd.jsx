import { useState } from 'react';

export default function ProjectAdd({ onAdd }) {
  const [form, setForm] = useState({ code: '', name: '', description: '' });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = () => {
    if (!form.code || !form.name) return;
    onAdd?.(form);
    setForm({ code: '', name: '', description: '' });
  };

  return (
    <>
      <input name="code" placeholder="Code" type="text" value={form.code} onChange={onChange} />
      <input name="name" placeholder="Name" type="text" value={form.name} onChange={onChange} />
      <input
        name="description"
        placeholder="Description"
        type="text"
        value={form.description}
        onChange={onChange}
      />
      <button type="button" onClick={onSubmit}>Add Project</button>
    </>
  );
}