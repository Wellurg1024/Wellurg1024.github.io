// 创建粒子效果的背景动画
const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

// 渐变背景色
let backgroundColor = { r: 34, g: 34, b: 34 }; // 初始背景色为深灰色

function Particle() {
    this.x = canvas.width * Math.random();
    this.y = canvas.height * Math.random();
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
    this.size = Math.random() * 2 + 1;
}

Particle.prototype.update = function () {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > canvas.width) {
        this.vx *= -1;
    }

    if (this.y < 0 || this.y > canvas.height) {
        this.vy *= -1;
    }
};

Particle.prototype.draw = function () {
    ctx.fillStyle = '#fff'; // 白色粒子
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
};

function createParticles() {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
    }
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 更新背景颜色分量
    backgroundColor.r += colorIncrement;
    backgroundColor.g += colorIncrement;
    backgroundColor.b += colorIncrement;

    // 当颜色分量超过最大值时，反向增加步长，使其逐渐减小
    if (backgroundColor.r >= maxColorValue || backgroundColor.r <= minColorValue) {
        colorIncrement *= -1;
    }

    // 绘制渐变背景
    ctx.fillStyle = `rgb(${Math.floor(backgroundColor.r)}, ${Math.floor(backgroundColor.g)}, ${Math.floor(backgroundColor.b)})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(loop);
}

const maxColorValue = 100; // 最大颜色分量值
const minColorValue = 34; // 最小颜色分量值
let colorIncrement = 0.05; // 颜色增加步长
createParticles();
loop();

function randomDisplay(str) {
    var displayedStr = '';
    var displayCount = Math.ceil(str.length * 0.7); // 计算需要显示的字符数量
    var hiddenIndexes = [];

    while (hiddenIndexes.length < str.length - displayCount) {
        var randomIndex = Math.floor(Math.random() * str.length); // 生成随机索引
        if (!hiddenIndexes.includes(randomIndex)) {
            hiddenIndexes.push(randomIndex); // 存储随机索引
        }
    }

    for (var i = 0; i < str.length; i++) {
        if (hiddenIndexes.includes(i)) {
            displayedStr += ' _ '; // 用下划线代替未显示字符
        } else {
            displayedStr += ' ' + str[i] + ' '; // 显示字符
        }
    }

    return displayedStr;
}

function removeAllChildren(parentElement) {
    while (parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}
function getNewWord() {
    $.ajax({
        url: "https://random-word-form.herokuapp.com/random/noun",
        method: "GET",
        // 其他参数...
        success: function (response) {

            console.log(response);
            var container = document.getElementById("wordDisplay");
            var answer = document.createElement("div");
            var lengthClue = document.createElement("div");
            var length = response[0].length
            removeAllChildren(container);
            answer.innerHTML = randomDisplay(response[0]);
            console.log(randomDisplay(response[0]))
            lengthClue.innerHTML = length;
            container.appendChild(answer)
            container.appendChild(lengthClue)
        },
        error: function (xhr, status, error) {
            console.error(error);
        },
    });
}