//////////////
///global////
/////////////

/* <a value="${index}" onclick="deleteSelected(${index})">
<i class="fas fa-trash"></i>
</a> */

const users = [{
  name: 'Tatiane',
  age: 23,
  nationality: 'Brasileira',
  email: 'tatiane_213@hotmail.com'
}];

const styleTD = {
  w: 'width: 100px;',
  h: 'height: 50px;',
  t: 'text-align: center;',
  d: 'display: flex;',
  jc: 'justify-content: space-around;'
}

const { w, h, t, d, jc } = styleTD;

let table = document.querySelector('.tb-data');

let render = users.map((user, index) => {
  return `
  <tr>
    <td class="td-name_${index}">${user.name}</td>
    <td class="td-age_${index}">${user.age}</td>
    <td class="td-national_${index}">${user.nationality}</td>
    <td class="td-email_${index}">${user.email}</td>
    <td class="td-buttons_${index}" style="${w}${h}${t}${d}${jc}">
      <a class="td-btnEdit_${index} pointer" value="${index}" onclick="enableEdit(${index})">
        <i class="fas fa-pen"></i>
      </a>
      <a class="td-btnDelete_${index} pointer" value="${index}" onclick="deleteSelected(${index})">
        <i class="fas fa-trash"></i>
      </a>
    </td>
  </tr>
  <br>
  `
});

table.innerHTML = render.join('');

////////////
///CREATE///
///////////
let btnSave = document.querySelector('.btn-save');

let ageValidate = document.querySelector('.age')
ageValidate.addEventListener('input', function(){
  var num = this.value.match(/^\d+$/);
  if(num > 120){
    this.value = "";
  }
  if (num === null) {
      this.value = "";
  }
}, false)

btnSave.addEventListener('click', (e) => {
  e.preventDefault()
  let user = {
    name: document.querySelector('.name').value,
    age: document.querySelector('.age').value,
    nationality: document.querySelector('.nationality').value,
    email: document.querySelector('.email').value
  };


  if(!user){
    alert('Favor preencher todos os campos!')
    return
  }

  if(user.name === '' && user.age === '' && user.nationality === '' && user.email === '') {
    alert('Favor preencher todos os campos!')
    return
  } else if(user.name !== '' && user.age === '' && user.nationality === '' && user.email === '') {
    alert('Favor preencher Idade, Nacionalidade e E-mail!')
    return
  } else if(user.name !== '' && user.age !== '' && user.nationality === '' && user.email === '') {
    alert('Favor preencher Nacionalidade e E-mail')
    return
  } else if(user.name !== '' && user.age !== '' && user.nationality !== '' && user.email === '') {
    alert('Favor preencher E-mail')
    return
  } else if(user.name !== '' && user.age === '' && user.nationality !== '' && user.email !== '') {
    alert('Favor preencher Idade!')
    return
  } else if(user.name !== '' && user.age !== '' && user.nationality === '' && user.email !== '') {
    alert('Favor preencher Nacionalidade!')
    return
  } else {

    if(!validateEmail(user.email)){
      alert('E-mail inválido!')
      return
    }

    alert('Usuário cadastrado com sucesso!')

      users.push(user);

      let table = document.querySelector('.tb-data');

      let render = users.map((user, index) => {
        return `
        <tr>
          <td class="td-name_${index}">${user.name}</td>
          <td class="td-age_${index}">${user.age}</td>
          <td class="td-national_${index}">${user.nationality}</td>
          <td class="td-email_${index}">${user.email}</td>
          <td class="td-buttons_${index}" style="${w}${h}${t}${d}${jc}">
            <a class="td-btnEdit_${index} pointer" value="${index}" onclick="enableEdit(${index})">
              <i class="fas fa-pen"></i>
            </a>
            <a class="td-btnDelete_${index} pointer" value="${index}" onclick="deleteSelected(${index})">
              <i class="fas fa-trash"></i>
            </a>
          </td>
        </tr>
        `
        // colocado na tag a, value index e o evento onclick para pegar o index na hora de deletar

      });

      table.innerHTML = render.join('');

      clearFields()

  }

});


// const pessoa = (user) => {
//  return console.log(user)
// }
// pessoa('kelvin')

function clearFields() {
  let name = document.querySelector('.name');
  let age = document.querySelector('.age');
  let nationality = document.querySelector('.nationality');
  let email = document.querySelector('.email');

  name.value = '';
  age.value = '';
  nationality.value = '';
  email.value = '';
}

// criar um botao delete e fazer o delete de dados
function deleteSelected(position) {
  users.splice(position, 1);
  table.deleteRow(position);
}

// criar um botao edit e fazer o edit de dados

const btnsManipulate = function(index) { // trocando os icones para check e cancel
  return `
  <a class="td-btnEdit_${index} pointer" value="${index}" onclick="confirmChanges(${index})">
    <i class="fas fa-check-square"></i>
  </a>
  <a class="td-btnCancel_${index} pointer" value="${index}" onclick="cancelChanges(${index})">
    <i class="fas fa-window-close"></i>
  </a>
  `
}

function enableEdit(index) { // funcao sem retorno

  let btns = document.querySelector(`.td-buttons_${index}`);
  btns.innerHTML = btnsManipulate(index);

  let name = document.querySelector(`.td-name_${index}`);
  let age = document.querySelector(`.td-age_${index}`);
  let national = document.querySelector(`.td-national_${index}`);
  let email = document.querySelector(`.td-email_${index}`);

  // muda conteudos para inputs (para serem editados)
  name.innerHTML = `<input class="input-edit inp-name_${index}" type="text" value="${users[index].name}">`
  age.innerHTML = `<input class="input-age-style inp-age_${index} " type="number" value="${users[index].age}">`
  national.innerHTML = `<input class="input-edit inp-national_${index}" type="text" value="${users[index].nationality}">`
  email.innerHTML = `<input class="input-email-style inp-email_${index}" type="email" value="${users[index].email}">`

  validateAge(age); // aqui vai pegar a função

}

function validateAge (age) {
  age.firstChild.addEventListener('input', function(){
    var num = this.value.match(/^\d+$/);
    if(num > 120){
      this.value = "";
    }
    if (num === null) {
        this.value = "";
    }
  }, false)
}


const btnsRollback = function(index) { // retorna botoes editar e apagar
  return `
  <a class="td-btnEdit_${index} pointer" value="${index}" onclick="enableEdit(${index})">
    <i class="fas fa-pen"></i>
  </a>
  <a class="td-btnDelete_${index} pointer" value="${index}" onclick="deleteSelected(${index})">
    <i class="fas fa-trash"></i>
  </a>
  `
}


function confirmChanges(index) {
  let name = document.querySelector(`.inp-name_${index}`);
  let age = document.querySelector(`.inp-age_${index}`);
  let national = document.querySelector(`.inp-national_${index}`);
  let email = document.querySelector(`.inp-email_${index}`);

  let user = {
    name: name.value,
    age: age.value,
    nationality: national.value,
    email: email.value,
  }

  if(!user){
    alert('Favor preencher todos os campos!')
    return
  }

  if(user.name === '' && user.age === '' && user.nationality === '' && user.email === '') {
    alert('Favor preencher todos os campos!')
    return
  } else if(user.name !== '' && user.age === '' && user.nationality === '' && user.email === '') {
    alert('Favor preencher Idade, Nacionalidade e E-mail!')
    return
  } else if(user.name !== '' && user.age !== '' && user.nationality === '' && user.email === '') {
    alert('Favor preencher Nacionalidade e E-mail')
    return
  } else if(user.name !== '' && user.age !== '' && user.nationality !== '' && user.email === '') {
    alert('Favor preencher E-mail')
    return
  } else if(user.name !== '' && user.age === '' && user.nationality !== '' && user.email !== '') {
    alert('Favor preencher Idade!')
    return
  } else if(user.name !== '' && user.age !== '' && user.nationality === '' && user.email !== '') {
    alert('Favor preencher Nacionalidade!')
    return
  } else {

    if(!validateEmail(user.email)){
      alert('E-mail inválido!')
      return
    }

     //você precisa agora transformas os inputs em td e jogar dentro de cada uma o novo value dentro dela

    name.outerHTML = `<td class="td-name_${index}">${user.name}</td>`
    age.outerHTML = `<td class="td-age_${index}">${user.age}</td>`
    national.outerHTML = `<td class="td-national_${index}">${user.nationality}</td>`
    email.outerHTML = `<td class="td-email_${index}">${user.email}</td>`

    alert('Usuário atualizado com sucesso!')

    users[index] = user; // colocando as alteracoes dentro do array, com o [index] selecionado

    let btns = document.querySelector(`.td-buttons_${index}`);
    btns.innerHTML = btnsRollback(index);

  }
}

// criar uma função que quando clicar no botao ele cancela

function cancelChanges(index) {
  let {
    name: nameUser,
    age: ageUser,
    nationality: nationalityUser,
    email: emailUser
  } = users[index]

  let name = document.querySelector(`.inp-name_${index}`);
  let age = document.querySelector(`.inp-age_${index}`);
  let national = document.querySelector(`.inp-national_${index}`);
  let email = document.querySelector(`.inp-email_${index}`);

  name.outerHTML = `<td class="td-name_${index}">${nameUser}</td>`
  age.outerHTML = `<td class="td-age_${index}">${ageUser}</td>`
  national.outerHTML = `<td class="td-national_${index}">${nationalityUser}</td>`
  email.outerHTML = `<td class="td-email_${index}">${emailUser}</td>`

  let btns = document.querySelector(`.td-buttons_${index}`);
  btns.innerHTML = btnsRollback(index);

}


const  validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
