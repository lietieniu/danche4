const renderTime=(time)=>{
    if(time==''&&!time){
        return '';
    }else{
        let date=new Date(time);
        let Seconds=date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();
        return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+Seconds
    }
}
export default renderTime;