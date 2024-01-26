import { useState } from 'react';
export const useNaviToggle = () => {
    const [style, setStyle] = useState("nav-default");
    const [style1, setStyle1] = useState("dash-default");
    const [style2, setStyle2] = useState("header-default")

  function setToggle(bool){
    if (bool) {
        setStyle("nav-container");
        setStyle1("dash-container");
        setStyle2("header-container");

    }
    else {
        setStyle("nav-container1");
        setStyle1("dash-container1");
        setStyle2("header-container1")

    }
  }
    return [style, style1, style2,setToggle]
}