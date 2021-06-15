import HttpRequest from '../HttpRequest'

class AuthRequest extends HttpRequest {
  login(credentials) {
    return this.post('/admin/auth/login', credentials)
  }
}

export default new AuthRequest()
