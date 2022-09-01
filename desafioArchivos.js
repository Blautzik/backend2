const fs = require('fs')

class Contenedero {
  constructor (texto){
    this.texto = texto
    this.productos = []
  }
  save(nuevoObj){
    let id = this.productos.length + 1
    this.productos.push(nuevoObj)
    await fs.promises.writeFile(`./${this.texto}`, JSON.stringify(this.productos))
    console.log('se creo el producto con id', id)
    return id
  }

  getById = (id) => {
    const encontrado = this.productos.find(prod => {prod.id == id})
    encontrado && encontrado
  }

  getAll = () => {
    return this.productos
  }


  deleteAll = () => {
    fs.unlinkSync(this.texto)
  } 

  deleteById = (id) => {
    const borrado = this.productos.filter(prod => prod.id !== id)
    borrado && fs.promises.writeFile(`./${this.texto}`, JSON.stringify(borrado)) 
  }


}


const productosTxt = new Contenedero('./productos.txt') 


productosTxt.save({producto: "album tapa blanda", precio: 750, stock: 100})
productosTxt.save({producto: "paquete de figuritas", precio: 150, stock: 0})