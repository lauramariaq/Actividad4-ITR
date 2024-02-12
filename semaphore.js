// Definición de la clase Semaphore
class Semaphore {
  // Constructor de la clase
  constructor() {
    // Indica si el recurso está disponible
    this.available = true;
    // Cola para encolar las solicitudes de acceso
    this.queue = [];
  }

  // Método para adquirir el semáforo
  acquire() {
    return new Promise((resolve, reject) => {
      const request = { resolve, reject };

      // Si el recurso está disponible, lo adquirimos
      if (this.available) {
        this.available = false;
        resolve();
      } else {
        // Si no está disponible, encolamos la solicitud
        this.queue.push(request);
      }
    });
  }

  // Método para liberar el semáforo
  release() {
    // Si hay solicitudes en la cola, liberamos la siguiente
    if (this.queue.length > 0) {
      const nextRequest = this.queue.shift();
      nextRequest.resolve();
    } else {
      // Si no hay solicitudes en la cola, marcamos el recurso como disponible
      this.available = true;
    }
  }
}

// Exportar la clase Semaphore para que pueda ser importada en otros archivos
export default Semaphore;
