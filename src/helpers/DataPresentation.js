export const formatNumberCommas = (num) => {
    num = parseInt(num);
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
