import { makeAutoObservable, runInAction } from 'mobx';
import CompanyService from '../services/CompanyService';

class CompanyStore {
  companies = [];
  editingId = null;
  editForm = { code: '', name: '', address: '' };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async fetchCompanies() {
    try {
      const response = await CompanyService.getAll();
      runInAction(() => {
        this.companies = response.data;
      });
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  }

    async createOrUpdateCompany(form) {
    try {
        if (this.editingId) {
        await CompanyService.createOrUpdate(this.editForm);
        runInAction(() => {
            const index = this.companies.findIndex((c) => c.code === this.editForm.code);
            if (index !== -1) {
            this.companies[index] = { ...this.editForm };
            }
            this.cancelEdit();
        });
        } else {
        const response = await CompanyService.createOrUpdate(form); // Use the provided form data
        runInAction(() => {
            this.companies.push(response.data); // Add the new company to the list
            this.cancelEdit();
        });
        }
    } catch (error) {
        console.error('Error creating or updating company:', error);
    }
}

  async deleteCompany(code) {
    try {
      await CompanyService.delete(code);
      runInAction(() => {
        this.companies = this.companies.filter((c) => c.code !== code);
      });
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  }

  startEdit(company) {
    this.editingId = company.code;
    this.editForm = { ...company };
  }

  changeEditField(field, value) {
    this.editForm[field] = value;
  }

  cancelEdit() {
    this.editingId = null;
    this.editForm = { code: '', name: '', address: '' };
  }
}

export default new CompanyStore();