function authenticate(req) {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    throw new Error('Authorization header missing');
  }

  const token = authHeader.split(' ')[1];
  console.log("Extracted Token:", token);

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("JWT Tokken is: ", JWT_SECRET);
    console.log("Decoded Token:", decodedToken);
    return decodedToken;
  } catch (error) {
    console.error("Token Verification Error:", error);
    throw new Error('Invalid token');
  }
}

