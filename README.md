## 4. Qué falta completar

1. Formulario de alta de clientes en `/clientes`:
   - Crear un componente/forma para enviar `POST` a `https://fakestoreapi.com/users`.
   - Mostrar feedback visual (Snackbar / Alert) con el ID asignado.

2. Lógica de permisos en `DetalleCliente`:
   - Si el admin es del sector `Soporte`, solo ver información.
   - Si el admin es del sector `Gerencia`, mostrar botón rojo `Eliminar Cliente de la Base de Datos`.
   - Simular o llamar `DELETE https://fakestoreapi.com/users/:id` en ese botón.

3. Separar componentes pequeños y reutilizables:
   - Idealmente mover tablas, filas o formularios a `src/components/common`.
   - Actualmente la lista y el detalle están en `views` sin componentes reutilizables.

4. Validación adicional y mejoras UX:
   - Hacer más robusta la validación del login.
   - Agregar mensajes de error en el formulario de alta cuando el POST falle.
