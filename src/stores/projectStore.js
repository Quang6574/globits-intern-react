import { makeAutoObservable, runInAction } from 'mobx';
import ProjectService from '../services/ProjectService';

class ProjectStore {
  projects = [];
  editingId = null;
  editForm = { id: '', code: '', name: '', description: '' };

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async fetchProjects() {
    try {
      const response = await ProjectService.getAll();
      const rawProjects = Array.isArray(response.data)
        ? response.data
        : Array.isArray(response.data?.content)
          ? response.data.content
          : [];

      runInAction(() => {
        this.projects = rawProjects.map((project) => this.normalizeProject(project));
      });
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }

  async createOrUpdateProject(form) {
    try {
      if (this.editingId) {
        const payload = {
          id: this.editingId,
          ...this.editForm,
          projectCode: this.editForm.code,
          projectName: this.editForm.name,
          projectDescription: this.editForm.description,
        };

        const response = await ProjectService.createOrUpdate(payload);
        const normalizedUpdated = this.normalizeProject(response.data);

        runInAction(() => {
          this.projects = this.projects.map((p) =>
            String(p.id) === String(this.editingId) ? { ...p, ...normalizedUpdated } : p
          );
          this.cancelEdit();
        });
      } else {
        if (!form?.code || !form?.name) return;

        const payload = {
          ...form,
          projectCode: form.code,
          projectName: form.name,
          projectDescription: form.description,
        };

        const response = await ProjectService.createOrUpdate(payload);
        runInAction(() => {
          this.projects.push(this.normalizeProject(response.data));
          this.cancelEdit();
        });
      }
    } catch (error) {
      console.error('Error creating or updating project:', error);
    }
  }

  async deleteProject(id) {
    try {
      await ProjectService.delete(id);
      runInAction(() => {
        this.projects = this.projects.filter((p) => String(p.id) !== String(id));
        if (String(this.editingId) === String(id)) this.cancelEdit();
      });
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  }

  startEdit(project) {
    const normalized = this.normalizeProject(project);
    this.editingId = normalized.id;
    this.editForm = {
      id: normalized.id ?? '',
      code: normalized.code ?? '',
      name: normalized.name ?? '',
      description: normalized.description ?? '',
    };
  }

  changeEditField(field, value) {
    this.editForm = { ...this.editForm, [field]: value };
  }

  cancelEdit() {
    this.editingId = null;
    this.editForm = { id: '', code: '', name: '', description: '' };
  }

  normalizeProject(project) {
    return {
      ...project,
      id: project?.id ?? project?.projectId ?? project?.project_id ?? '',
      code: project?.code ?? project?.projectCode ?? project?.project_code ?? '',
      name: project?.name ?? project?.projectName ?? project?.project_name ?? '',
      description:
        project?.description ??
        project?.projectDescription ??
        project?.project_description ??
        '',
    };
  }
}

export default new ProjectStore();