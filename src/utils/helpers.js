export const formatDate = (date) => {
  let newDateSplit = date.toString().split("-");

  return newDateSplit[2] + "-" + newDateSplit[1] + "-" + newDateSplit[0];
};

export const formatCreatedAt = (date) => {

  try{
    const months = {
      "01": "Ene",
      "02": "Feb",
      "03": "Mar",
      "04": "Abr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Ago",
      "09": "Sep",
      "10": "Oct",
      "11": "Nov",
      "12": "Dic",
    };

    const dateParts = date.toString().split(" ")[0].split("-");
    const day = dateParts[2].substring(0, 2);
    const month = months[dateParts[1]];
    const year = dateParts[0];

    return `${day}/${month}/${year}`;
  } catch(e){
    return "-";
  }
};

export const formatNumber = (num) => {


  if (num) {
    let number = num.toString();
    if (number.startsWith("0")) {
      return number;
    } else {
      return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }
  }else{
    return "0";
  }
}

//metodo que verifica si un string no esta vacio
export const isNotStringEmpty = (str) => {
  if (str.length === 0) {
    return false
  } else {
    return true;
  }
}
//metodo que verifica si un string  esta vacio
export const isStringEmpty = (str) => {
  if (str.length === 0) {
    return true
  } else {
    return false;
  }
}
/**formatea numeros que vengan con un punto decimal
 * ingresa 12112.9 y sale 12.112,9
 * @param {*} num 
 * @returns 
 */
 export const formatDecimalNumber = (num) => {

  if (num) {
    let number = ""
    let splitNumber = []
    if (num.toString().includes(".")) {

      splitNumber = num.toString().split(".");
      number = splitNumber[0];
    }else{
      number = num.toString();
    }

    if (number.startsWith("0")) {
      return number;
    } else {
      return number.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + (splitNumber.length > 0 ? "," + splitNumber[1] : "");
    }
  } else {

    return "0"
  }
}