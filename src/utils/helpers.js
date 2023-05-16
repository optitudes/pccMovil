export const formatDate = (date) => {
  let newDateSplit = date.toString().split("-");

  return newDateSplit[2] + "-" + newDateSplit[1] + "-" + newDateSplit[0];
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