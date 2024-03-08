// #region atributte
import { signOut } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js'
import { loadCategorys, loadProducts } from './productos/products.service.js'
import { loadTableCategorias } from './categorias/category.service.js'
import { pageCategory } from './categorias/pageCategory.js'
import { pageProductos } from './productos/pageProducts.js'
// import { getAllData } from '../services.general.js'
// import { localData } from '../local/localData.js'
import { auth } from '../../config/firebase.js'
import { pageAdmin } from './pageAdmin.js'
import { getAllData, saveData, updateData } from '../services.general.js'

let btnCategorias
let btnProductos
let categorias
let modules
let logout
let body
let table
let data
let products = []
let dataModules
let form
let info
let edit = false
const listCategory = []
const dataCategory = {
  id: crypto.randomUUID(),
  nombre: '',
  productos: [],
  habilitado: true
}

export const loadAdminPage = async () => {
  data = await getAllData('categorias')
  data.forEach((category) => {
    listCategory.push(category.data())
  })
  const content = document.getElementById('body')
  content.innerHTML = pageAdmin
  if (content) {
    btnCategorias = document.getElementById('btnCategorias')
    btnProductos = document.getElementById('btnProductos')
    modules = document.getElementById('modules')
    logout = document.getElementById('logout')
    body = document.getElementById('body')

    body.classList.remove('bg-linear')
    // data = await getAllData('modulos')
    dataModules = [{
      nombre: 'Categorias',
      descripcion: 'lo que sea',
      img: 'enlace'
    }, {
      nombre: 'Productos',
      descripcion: 'cualquier cosa',
      img: 'enlace'
    }]

    dataModules.forEach((doc) => {
      // const doc = element.data()
      modules.innerHTML += `
      <article>
      <picture class="d-block">
      <img src="${doc.img}" alt="${doc.descripcion}" />
      </picture>
      <button class="btn-md" id="btn${doc.nombre}">${doc.nombre}</button>
      </article>
      `
    })

    logout.addEventListener('click', async () => {
      try {
        await signOut(auth)
        location.reload()
      } catch (error) {
        console.log(error)
      }
    })

    btnCategorias.addEventListener('click', () => {
      const content = document.getElementById('content')
      content.innerHTML = pageCategory
      if (content) {
        table = document.getElementById('table-content')
        form = document.getElementById('form')
        loadTableCategorias(table)
        table.addEventListener('click', (e) => {
          try {
            info = listCategory.find((category) => category.id === e.target.dataset.id)
            form.nombre.value = info.nombre
            edit = true
          } catch (e) {
            console.error(e)
          }
        })

        form.addEventListener('submit', async (e) => {
          e.preventDefault()
          dataCategory.nombre = form.nombre.value
          try {
            if (edit === true && form.nombre.value !== '' && info.id !== '') {
              delete dataCategory.id
              console.log(dataCategory)
              await updateData(info.id, dataCategory, 'categorias').then((doc) => console.log(doc))
              edit = false
            } else if (edit === false && form.nombre.value !== '') {
              await saveData(dataCategory, 'categorias')
            } else {
              console.log('nothing')
            }
          } catch (e) {
            console.error(e)
          }
        })
      }
    })

    btnProductos.addEventListener('click', async () => {
      const content = document.getElementById('content')
      content.innerHTML = pageProductos
      if (content) {
        categorias = document.getElementById('categorias')
        table = document.getElementById('table-content')
        // const categorys = await getAllData('categorias')
        products = loadCategorys(data, categorias)

        categorias.addEventListener('change', (e) => {
          loadProducts(e.target.value, products, table)
        })
      }
    })
  }
}

// #endregion

// #region events

// #endregion
