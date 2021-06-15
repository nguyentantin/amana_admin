import HttpRequest from '../HttpRequest'

class DepartmentRequest extends HttpRequest {
  listDepartment(current, data = {}) {
    return this.get(`/admin/departments?page=${current}`, data)
  }
  createDepartment(params) {
    return this.post('/admin/departments', params)
  }
  deleteDepartment(departmentID) {
    return this.delete(`/admin/departments/${departmentID}`)
  }
  updateDepartment(params) {
    return this.put(`/admin/departments/${params.id}`, params)
  }
}

export default new DepartmentRequest()
