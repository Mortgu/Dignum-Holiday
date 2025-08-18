'server-only'

import bcrypt from 'bcryptjs';

const login = async (state, formData) => {
    const email = formData.get('email');
    const password = formData.get('password');

    const hashedPassword = await bcrypt.encrypt()
}

const signup = (state, formData) => {

}

const logout = async () => {

}

export { login, signup, logout };