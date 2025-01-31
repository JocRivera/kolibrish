export const pageCategory = [
  '<section class="row m-4">',
  '<article class="col-sm-12 col-md-6">',
  '<form id="form">',
  '<fieldset>',
  '<legend>Crear categoria</legend>',
  '<div class="form-group d-flex justify-content-start align-items-center">',
  '<label class="form-label mx-2">Nombre:</label>',
  '<input type="text" id="nombre" placeholder="Nombre" class="form-control mx-2 w-50"/>',
  '</div>',
  '</fieldset>',
  '<button type="submit" class="btn btn-sm btn-success mx-2">💾 Guardar</button>',
  '<button class="btn btn-sm btn-info m-2">📃 Nuevo</button>',
  '<button class="btn btn-sm btn-secondary m-2">🔍 Consultar</button>',
  '</form>',
  '</article>',
  '<article class="col-sm-12 col-md-6">',
  '<fieldset>',
  '<legend>Categorias</legend>',
  '<table class="table">',
  '<thead>',
  '<tr>',
  '<th scope="col">Nombres</th>',
  '<th scope="col">Acciones</th>',
  '</tr>',
  '</thead>',
  '<tbody id="table-content"></tbody>',
  '</table>',
  '</fieldset>',
  '</article>',
  '</section>',
  '<script src="./js/services/admin/categorias/services.js" type="module"></script>'
].join('')
