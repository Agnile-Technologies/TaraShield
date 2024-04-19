export const CREATE_PROJECT = 'CREATE_PROJECT';

export const createProject = (projectData) => ({
  type: CREATE_PROJECT,
  payload: projectData,
});