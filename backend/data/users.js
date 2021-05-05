import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('password', 10),
    isAdmin: true
  },
  {
    name: 'John Doe',
    email: 'john@gmail.com',
    password: bcrypt.hashSync('password', 10)
  },
  {
    name: 'Jane Doe',
    email: 'jane@gmail.com',
    password: bcrypt.hashSync('password', 10)
  }
];

export default users;
