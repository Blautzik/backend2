const fs = require("fs").promises;
class Contenedor {
  constructor(file) {
    this.file = file;
  }
  async getAll() {
    try {
      const productos = await fs.readFile(this.file, "utf-8");
      return JSON.parse(productos);
    } catch (err) {
      return null;
    }
  }
  async save(producto) {
    const arrayDeProductos = await this.getAll();
    if (!arrayDeProductos) {
      await fs.writeFile(this.file, "[]");
    } else {
      producto = { ...producto, id: arrayDeProductos.length +1 };
      arrayDeProductos.push(producto);
      await fs.writeFile(this.file, JSON.stringify(arrayDeProductos));
      console.log("se guardo un producto");
      return producto.id;
    } 
  }
  async getById(number) {
    let showId = await this.getAll();
    let objectSelected = showId.find((obj) => obj.id === number);
    if (objectSelected) {
      return objectSelected;
    } else {
      return null;
    }
  }
  async deleteById(id) {
    const arrayProducts = await this.getAll();
    const updateArray = arrayProducts.filter((obj) => obj.id !== id);
    await fs.writeFile(this.file, JSON.stringify(updateArray));
  }
  async deleteAll() {
    try {
      await fs.writeFile(this.file, "[]");
    } catch {
      console.log("No hay productos para borrar");
    }
  }
}
(async () =>{ const container = new Contenedor("productos.txt");
  const producto = {
    producto: "album tapa blanda", 
    precio: 750, 
    stock: 100
  };
await container.save(producto)
await container.save(producto)
await container.save(producto)
console.log(await container.getAll())
})()