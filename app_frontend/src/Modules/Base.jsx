exports.getIp = () => {
    let ip = (window.location.host).split(":");
    return ip[0];
}

exports.getPort = () => {
    return 9000;
}

exports.getFullTime = (seconds) => {
    let tot;
    let duration = seconds / 1000;

    duration = duration % (3600);
    let minutes = parseInt(duration / 60);
    duration = duration % (3600);
    if (minutes >= 1) {
        seconds = duration - (60 * minutes);
    } else {
        seconds = duration;
    }
    seconds = seconds.toFixed(3);
    
    if (minutes === 0) {
        tot = seconds;
    } else {
        tot = seconds < 10 ? minutes + ":0" + seconds : minutes + ":" + seconds;
    }
    return tot;
}

exports.getGap = (bestTime, currentTime) => {
    let gap = bestTime - currentTime;
    
    return (gap === 0 ? "-" : "+" + (this.getFullTime(gap)*-1).toFixed(3)) ;
}