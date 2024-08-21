import bcrypt from 'bcrypt';

async function verifyPassword(){
  const myPassword = 'password123';
  const pass_hash = '$2b$10$e81cA1y8/h0wtOBr8Svc3OzP..IaTiJqgg/csxss4z1DRJwmtrtky';
  const isMatch = await bcrypt.compare(myPassword,pass_hash);
  console.log(isMatch);
}

verifyPassword();
