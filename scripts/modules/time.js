exports.getSeconds = (seconds) => {
    return (parseFloat(seconds/1000)).toFixed(3);
}

exports.getAvg = (avg) => {
    let meters = avg.tra_km/avg.tim_totalTime;
    return(meters*3.6);
}

