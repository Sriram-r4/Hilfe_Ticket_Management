import { useEffect, useState  } from 'react';

function useStyle() {
    const [style, setStyle] = useState({});
    useEffect(()=>{
        if (window.innerWidth < 800) {
            setStyle({
                display: "none"
            });
        }
        else {
            setStyle({
                display: "inline"
            });
        }
    },[])
   
    function style1(style) {
        setStyle(style)
    }
    return [style, style1];

}

export default useStyle