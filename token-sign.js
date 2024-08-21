import jsonwebtoken from "jsonwebtoken";

const secret = 'secret';

const payload = {
  sub: 1,
  role: 'customer'
}

function signToken(payload, secret){
  return jsonwebtoken.sign(payload,secret);
}

console.log(signToken(payload,secret));
