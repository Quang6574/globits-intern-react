import { makeAutoObservable, runInAction } from 'mobx';
import CountryService from '../services/CountryService';

class CountryStore {
    countries = [];
    editingId = null;

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
    }

    cancelEdit() {
        this.editingId = null;
    }

    async saveEdit(updatedCountry) {
        if (!this.editingId) return;
        if (!updatedCountry?.name || !updatedCountry?.code) return;

        try {
            const response = await CountryService.createOrUpdate({
            id: this.editingId,
            ...updatedCountry,
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