const renderTime = (time) => {
    if (time == '' && !time) {
        return '';
    } else {
        let date = new Date(time);
        let Seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        let Minutes=date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + Minutes + ':' + Seconds
    }
}
export default renderTime;