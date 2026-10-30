// Debe ir después de authenticateToken.
// Deja pasar si :id es el del token o si el rol es ADMIN.
const authorizeUser = (req, res, next) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({ error: "El id debe ser un número entero" });
  }
  if (req.user.role !== "ADMIN" && req.user.id !== id) {
    return res.status(403).json({ error: "No puedes ver este recurso" });
  }
  next();
};

module.exports = authorizeUser;
