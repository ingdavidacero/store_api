import bcrypt from 'bcrypt';

async function generate_hash(){
  console.log('ASD');
  const myPassword = 'password123';
  const pass_hash = await bcrypt.hash(myPassword,10);
  console.log(pass_hash);
}

generate_hash();
