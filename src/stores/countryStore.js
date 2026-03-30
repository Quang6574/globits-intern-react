import { makeAutoObservable, runInAction } from 'mobx';
import CountryService from '../services/CountryService';

class CountryStore {
    countries = [];
    editingId = null;
    editForm = { name: '', code: '', description: '' };

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async fetchCountries() {
        try {
            const response = await CountryService.getAll();
            runInAction(() => {
            this.countries = response.data;
            });
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    }

    async addCountry(newCountry) {
        if (!newCountry?.name || !newCountry?.code) return;
        try {
            const response = await CountryService.createOrUpdate(newCountry);
            runInAction(() => {
            this.countries.push(response.data);
        });
        } catch (error) {
            console.error('Error adding country:', error);
        }
    }

    startEdit(row) {
        this.editingId = row.id;
        this.editForm = {
        name: row.name ?? '',
        code: row.code ?? '',
        description: row.description ?? '',
        };
    }

    changeEditField(field, value) {
        this.editForm = { ...this.editForm, [field]: value };
    }

    cancelEdit() {
        this.editingId = null;
        this.editForm = { name: '', code: '', description: '' };
    }

    async saveEdit() {
        if (!this.editingId) return;
        if (!this.editForm.name || !this.editForm.code) return;

        try {
            const response = await CountryService.createOrUpdate({
            id: this.editingId,
            ...this.editForm,
            });
            runInAction(() => {
            this.countries = this.countries.map((c) =>
            c.id === this.editingId ? { ...c, ...response.data } : c);
            this.cancelEdit();
            });
        } catch (error) {
            console.error('Error updating country:', error);
        }
    }

    async deleteCountry(id) {
        try {
            await CountryService.delete(id);
            runInAction(() => {
            this.countries = this.countries.filter((c) => c.id !== id);
            if (this.editingId === id) this.cancelEdit();
            });
        } catch (error) {
            console.error('Error deleting country:', error);
        }
    }
}

export default new CountryStore();