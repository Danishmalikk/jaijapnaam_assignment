const bcrypt = require('bcryptjs')
const { User } = require('../models/userModel')

const encryptPassword = async (password) => { 
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}


const comparePassword = async (email, plainPassword) => {
    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return { success: false, message: 'User not found' };
        }

        const isMatch = await bcrypt.compare(plainPassword, user.password);

        if (!isMatch) {
            return { success: false, message: 'Invalid password' };
        }

        return { success: true, user };
    } catch (err) {
        console.error(err);
        return { success: false, message: 'Error comparing password' };
    }
};


module.exports = {encryptPassword, comparePassword }