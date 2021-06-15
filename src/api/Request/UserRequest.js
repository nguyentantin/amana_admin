import HttpRequest from '../HttpRequest'

class UserRequest extends HttpRequest {
  search(params = {}) {
    return this.get('/admin/users', params)
  }

  active(userId) {
    return this.post(`/admin/users/active/${userId}`)
  }

  disable(userId) {
    return this.post(`/admin/users/disable/${userId}`)
  }

  create(body = {}) {
    return this.post(`/admin/users`, body)
  }

  updateWcUsername(id, body = {}) {
    return this.put(`/admin/users/${id}`, body)
  }

  assignRoles(userId, rolesData) {
    return this.put(`/admin/users/${userId}/roles`, rolesData)
  }

  removeRoles(userId, roleId) {
    return this.delete(`/admin/users/${userId}/roles/${roleId}`)
  }
}

export default new UserRequest()
