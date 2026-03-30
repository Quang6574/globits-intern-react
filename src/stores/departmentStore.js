import { makeAutoObservable, runInAction } from 'mobx';
import DepartmentService from '../services/DepartmentService';

class DepartmentStore {
  departments = [];
  parentNamesByDepartmentId = {};
  editingId = null;
  editForm = { id: '', code: '', name: '', parentDepartment: null, company: null };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async fetchDepartments() {
    try {
      const response = await DepartmentService.getAll();
      const departments = response.data || [];

      const parentEntries = await Promise.all(
        departments.map(async (department) => {
          try {
            const parentResponse = await DepartmentService.getParent(department.id);
            return [department.id, parentResponse?.data?.name || ''];
          } catch (error) {
            return [department.id, ''];
          }
        })
      );

      runInAction(() => {
        this.departments = departments;
        this.parentNamesByDepartmentId = Object.fromEntries(parentEntries);
      });
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  }

  async createOrUpdateDepartment(form) {
    try {
      const source = this.editingId ? this.editForm : form;
      const payload = {
        id: source?.id,
        code: source?.code,
        name: source?.name,
      };

      if (this.editingId) {
        const response = await DepartmentService.createOrUpdate(payload);
        runInAction(() => {
          const index = this.departments.findIndex((d) => String(d.id) === String(this.editForm.id));
          if (index !== -1) {
            this.departments[index] = {
              ...this.departments[index],
              ...(response?.data || payload),
            };
          }
          this.cancelEdit();
        });
      } else {
        const response = await DepartmentService.createOrUpdate(payload);
        runInAction(() => {
          this.departments.push(response.data);
          this.cancelEdit();
        });
      }
    } catch (error) {
      console.error('Error creating or updating department:', error);
    }
  }

  async deleteDepartment(id) {
    try {
      await DepartmentService.delete(id);
      runInAction(() => {
        this.departments = this.departments.filter((d) => d.id !== id);
      });
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  }

  async editParentDepartment(id, parentDepartmentId) {
    try {
      const parsedParentId =
        parentDepartmentId === null || parentDepartmentId === undefined || parentDepartmentId === ''
          ? null
          : typeof parentDepartmentId === 'string'
            ? Number(parentDepartmentId)
            : parentDepartmentId;
      const normalizedParentId = Number.isNaN(parsedParentId) ? null : parsedParentId;

      const payload = {
        id: normalizedParentId,
      };

      await DepartmentService.editParent(id, payload);
      await this.fetchDepartments();

      runInAction(() => {
        if (String(this.editForm.id) === String(id)) {
          this.editForm.parentDepartment = normalizedParentId
            ? this.departments.find((d) => String(d.id) === String(normalizedParentId)) || null
            : null;
        }
      });
    } catch (error) {
      console.error('Error editing parent department:', error);
      throw error;
    }
  }

  startEdit(department) {
    this.editingId = department.id;
    this.editForm = { ...department };
  }

  changeEditField(field, value) {
    this.editForm[field] = value;
  }

  cancelEdit() {
    this.editingId = null;
    this.editForm = { id: '', code: '', name: '', parentDepartment: null, company: null };
  }
}

export default new DepartmentStore();