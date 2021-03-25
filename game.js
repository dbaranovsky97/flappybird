const screenHeight = window.innerHeight;

startGame();

function startGame() {
    const bird = createBird();
    const trees = [];

    let gravity = 0.5;
    let birdSpeed = 0;
    let treeSpeed = 5;

    setInterval(function () {
        birdSpeed -= gravity;

        y(bird, birdSpeed, '+');

        trees.forEach(function (tree) {
            x(tree, treeSpeed, '-');
        });
    }, 20);

    setInterval(function () {
        trees.push(createTree());
    }, 3000);

    document.addEventListener('click', function () {
        birdSpeed = 10;
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === ' ') {
            birdSpeed = 10;
        }
    });
}

function createBird() {
    const bird = document.createElement('bird');
    bird.style.left = "100px";
    bird.style.bottom = (window.innerHeight / 2) + "px";
    document.body.appendChild(bird);
    return bird;
}

function createTree() {
    const tree = document.createElement('tree');
    tree.style.left = 1000 + 'px';

    const holeHeight = 200;
    const bottomPartHeight = Math.random() * screenHeight - holeHeight;
    const topPartHeight = screenHeight - bottomPartHeight - holeHeight;

    const bottomPart = document.createElement('tree-part');
    bottomPart.style.height = bottomPartHeight + 'px';
    tree.appendChild(bottomPart);

    const topPart = document.createElement('tree-part');
    y(topPart, bottomPartHeight + holeHeight);
    topPart.style.height = topPartHeight + 'px';
    tree.appendChild(topPart);

    document.body.appendChild(tree);
    return tree;
}

function x(element, value, operator) {
    if (arguments.length > 1) {
        if (!operator) {
            operator = '=';
        }

        if (operator === '=') {
            element.style.left = value + 'px';
        } else if (operator === '+') {
            element.style.left = parseInt(element.style.left) + value + 'px';
        } else if (operator === '-') {
            element.style.left = parseInt(element.style.left) - value + 'px';
        }
    }

    return parseInt(element.style.left);
}

function y(element, value, operator) {
    if (arguments.length > 1) {
        if (!operator) {
            operator = '=';
        }

        if (operator === '=') {
            element.style.bottom = value + 'px';
        } else if (operator === '+') {
            element.style.bottom = parseInt(element.style.bottom) + value + 'px';
        } else if (operator === '-') {
            element.style.bottom = parseInt(element.style.bottom) - value + 'px';
        }
    }

    return parseInt(element.style.bottom);
}