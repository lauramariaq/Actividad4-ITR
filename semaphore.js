class Semaphore {
    constructor() {
      this.available = true; 
      this.queue = []; 
    }

    acquire() {
      return new Promise((resolve, reject) => {
        const request = { resolve, reject };

        if (this.available) {
          this.available = false;
          resolve();
        } else {
          this.queue.push(request);
        }
      });
    }

    release() {
      if (this.queue.length > 0) {
        console.log(`queue: ${this.queue}`);
        const nextRequest = this.queue.shift();
        nextRequest.resolve();
      } else {
        this.available = true;
      }
    }
  }