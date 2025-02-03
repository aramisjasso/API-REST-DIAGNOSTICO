const tareas = []; // Array en memoria para almacenar tareas

exports.crearTarea = (req, res) => {
    const { titulo, completada = false } = req.body;
    const nuevaTarea = { id: tareas.length + 1, titulo, completada, fecha: new Date() };
    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
};

exports.obtenerTareas = (req, res) => {
    res.json(tareas);
};

exports.obtenerTarea = (req, res) => {
    const tarea = tareas.find(t => t.id == req.params.id);
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });
    res.json(tarea);
};

exports.actualizarTarea = (req, res) => {
    const tarea = tareas.find(t => t.id == req.params.id);
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });
    const { titulo, completada } = req.body;
    if (titulo) tarea.titulo = titulo;
    if (completada !== undefined) tarea.completada = completada;
    res.json(tarea);
};

exports.eliminarTarea = (req, res) => {
    const index = tareas.findIndex(t => t.id == req.params.id);
    if (index === -1) return res.status(404).json({ error: "Tarea no encontrada" });
    const tareaEliminada = tareas.splice(index, 1);
    res.json(tareaEliminada);
};

exports.estadisticas = (req, res) => {
    const total = tareas.length;
    const completadas = tareas.filter(t => t.completada).length;
    const pendientes = total - completadas;
    const masReciente = [...tareas].sort((a, b) => b.fecha - a.fecha)[0];
    const masAntigua = [...tareas].sort((a, b) => a.fecha - b.fecha)[0];
    res.json({ total, completadas, pendientes, masReciente, masAntigua });
};