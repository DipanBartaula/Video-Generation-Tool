import { createGlobalStyle } from "styled-components";
import { extraLargeScreen, mediumScreen, smallScreen, mobileScreen, extraSmallScreen, largeScreen } from "./responsive";


const GlobalStyle = createGlobalStyle`

*,*::after,*::before{
    margin: 0;
    padding: 0;
    box-sizing:border-box;
}

html{
    font-size:62.5%;

    



     ${extraLargeScreen({


})}

${largeScreen({
    fontSize: "61%"
})}



${mediumScreen({
    fontSize: "60%"
})}

${smallScreen({
    fontSize: "55%"

})}

 ${mobileScreen({
    fontSize: "50%"
})}
 ${extraSmallScreen({
    fontSize: "38%"
})}
scroll-behavior:smooth;
}
body{
    font-family: "Poppins", sans-serif;
}

`

export default GlobalStyle;