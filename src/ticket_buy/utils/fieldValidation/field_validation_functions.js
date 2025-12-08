
function validateDni(dni){

  var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
  var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
  var nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
  var str = dni.toString().toUpperCase();

  if (!nifRexp.test(str) && !nieRexp.test(str)) return false; //si no cumple el formato a la calle

  var nie = str
      .replace(/^[X]/, '0')
      .replace(/^[Y]/, '1')
      .replace(/^[Z]/, '2');

  var letter = str.substr(-1); //pillamos la última letra

  var charIndex = parseInt(nie.substr(0, 8)) % 23; //calculamos la letra

  if (validChars.charAt(charIndex) === letter) return true; //si coinciden bien

  return false;
}


const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function isValidUser(data){
    
    if( !data.consent || data.name.length == 0 || data.surname.length == 0 || data.email.length == 0 || data.dni.length == 0){ //comprobacion basica, estan los cambios
        return {status: 400, msg: "Algunos campos obligatorios están vacíos, por favor rellenar antes de continuar." };
    }

    if( !/^[A-Za-zÁ-Úá-ú]+$/.test(data.name) ){
        return {status: 400, msg: `Formato del nombre incorrecto: ${data.name}` };
    }

    if( ! (data.surname.split(' ').every((s)=>{return /^[A-Za-zÁ-Úá-ú]+$/.test(s)}))){
        return {status: 400, msg: `Formato de los apellidos incorrecto: ${data.surname}` };
    }

    if( !validateEmail(data.email) ){
        return {status: 400, msg: `Formato del correo incorrecto: ${data.email}` };
    }

    if( !validateDni(data.dni) ){
        return {status: 400, msg: `Formato del DNI/NIE incorrecto: ${data.dni}` };
    }

    return {status: 200, msg: "OK"};


}

export {isValidUser}