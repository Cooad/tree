window.onload = () => {
    let canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
    colorDiff = 50;
    drawTree();
}
drawTree = () => {
    clearCanvas();
    let startLength = height / 3.2;
    let up = -Math.PI / 2;
    let levels = 9;
    let startInterval = 100;
    let startWitdh = 12;

    let startColor = { red: 5 * 16, blue: 0, green: 3 * 16 + 8 };
    let color = document.getElementById('startColor').value;
    let diff = document.getElementById('colorDiff').value;
    if (diff) colorDiff = diff;
    if (color) {

        branch(width / 2, height, startLength, up, levels, startInterval, stringToColor(color), startWitdh);
    }else 
        branch(width / 2, height, startLength, up, levels, startInterval, startColor, startWitdh);
}

clearCanvas = () => {
    context.clearRect(0, 0, width, height);
}

branch = (startX, startY, length, angle, level, interval, color, lineWidth) => {
    if (level < 0) return;
    context.strokeStyle = colorToHexString(color);
    context.lineWidth = lineWidth;
    let end = drawLineAngle(startX, startY, length, angle);
    let angleDiff = () => (Math.random() - 0.5) * (Math.PI / 1.25);
    let randColorDiff = () => Math.round(colorDiff * (Math.random() - 0.5));
    let lengthDiff = 0.7;
    let newInterval = interval - level;
    let newColor = {
        red: color.red + randColorDiff(),
        green: color.green + randColorDiff(),
        blue: color.blue + randColorDiff()
    };
    let lineDiff = 0.65;
    setTimeout(() => {
        for (let i = 0; i < 3; i++) {
            branch(end.x, end.y, length * lengthDiff, angle + angleDiff(), level - 1, newInterval, newColor, lineWidth * lineDiff);
        }
    }, interval);
}

drawLineAngle = (startX, startY, length, angle) => {
    let endX = startX + Math.cos(angle) * length;
    let endY = startY + Math.sin(angle) * length;
    drawLine(startX, startY, endX, endY);
    return { x: endX, y: endY };
}

drawLine = (startX, startY, endX, endY) => {
    if ((startX < 0 || startX > width) &&
        (startY < 0 || startY > height) &&
        (endX < 0 || endX > witdh) &&
        (endY < 0 || endY > height))
        return;
    context.beginPath();
    context.moveTo(startX, startY);
    context.lineTo(endX, endY);
    context.stroke();
    context.closePath();
}

colorToHexString = (color) => {
    let toHex = (value) => {
        if (value < 0) value = -value;
        if (value > 255) value = 255;
        let string = value.toString(16);
        if (string.length === 1) return `0${string}`;
        return string;
    }
    let result = `#${toHex(color.red)}${toHex(color.green)}${toHex(color.blue)}`;
    return result
}

stringToColor = (text) => {
    let color = {};
    color.red = parseInt(`${text[0]}${text[1]}`, 16);
    color.green = parseInt(`${text[2]}${text[3]}`, 16);
    color.blue = parseInt(`${text[4]}${text[5]}`, 16);
    return color;
}