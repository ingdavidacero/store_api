import jsonwebtoken from "jsonwebtoken";

const secret = 'secret';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcyMzgzMTU4N30.9-cIHXWh4B1dxQclGm-muxz1tnMt7JtFZDrVgANBEUg';

function verifyToken(token, secret){
  return jsonwebtoken.verify(token,secret);
}

console.log(verifyToken(token,secret));
