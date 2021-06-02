setBodyColor = () => {
    const body = document.body;
    let date = new Date();
    if(date.getHours() <= "17") body.classList.toggle("light-mode");; 
}

setBodyColor();