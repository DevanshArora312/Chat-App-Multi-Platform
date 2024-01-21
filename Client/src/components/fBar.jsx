const FeaturesBar = ({show}) => {
    let style;
    if (show) style = "absolute flex bg-white justify-around text-black w-full h-[10%]";
    else style = "flex bg-white justify-around text-black w-full h-[10%]"
    return (  
        <div className={style}>
            <div className="bg-red-500 w-10 h-10">adsas</div>
            <div className="bg-red-500 w-10 h-10">gdfgd</div>
            <div className="bg-red-500 w-10 h-10">mbbvk</div>
            <div className="bg-red-500 w-10 h-10">erterte</div>
            <div className="bg-red-500 w-10 h-10">gdfhdfg</div>
        </div>
    );
}
 
export default FeaturesBar;