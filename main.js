const rows = 50;
const cols = 50;
const cell_width = 10;

let STATES = "nrjlo+i-T^<>".split("")

let OFFGRID_VALUE = [...STATES]; // Try `[...STATES]` or `[]`

let grid = Array(rows * cols).fill([...STATES])

function connects(state, dir) {
    switch (dir) {
        case "top":
            return "jl+i^<>".split("").includes(state);
        case "bottom":
            return "rn+iT<>".split("").includes(state);
        case "left":
            return "jn+-T^<".split("").includes(state);
        case "right":
            return "rl+-T^>".split("").includes(state);
    }

}

let RULES = {
    r: (getOffset) => {
        let topCell = getOffset(0, -1);
        let bottomCell = getOffset(0, 1);
        let leftCell = getOffset(-1, 0);
        let rightCell = getOffset(1, 0);
        return (topCell.some(state => !connects(state, "bottom"))) &&
            (bottomCell.some(state => connects(state, "top"))) &&
            (leftCell.some(state => !connects(state, "right"))) &&
            (rightCell.some(state => connects(state, "left")));
    },
    l: (getOffset) => {
        let topCell = getOffset(0, -1);
        let bottomCell = getOffset(0, 1);
        let leftCell = getOffset(-1, 0);
        let rightCell = getOffset(1, 0);
        return (topCell.some(state => connects(state, "bottom"))) &&
            (bottomCell.some(state => !connects(state, "top"))) &&
            (leftCell.some(state => !connects(state, "right"))) &&
            (rightCell.some(state => connects(state, "left")));
    },
    j: (getOffset) => {
        let topCell = getOffset(0, -1);
        let bottomCell = getOffset(0, 1);
        let leftCell = getOffset(-1, 0);
        let rightCell = getOffset(1, 0);
        return (topCell.some(state => connects(state, "bottom"))) &&
            (bottomCell.some(state => !connects(state, "top"))) &&
            (leftCell.some(state => connects(state, "right"))) &&
            (rightCell.some(state => !connects(state, "left")));
    },
    n: (getOffset) => {
        let topCell = getOffset(0, -1);
        let bottomCell = getOffset(0, 1);
        let leftCell = getOffset(-1, 0);
        let rightCell = getOffset(1, 0);
        return (topCell.some(state => !connects(state, "bottom"))) &&
            (bottomCell.some(state => connects(state, "top"))) &&
            (leftCell.some(state => connects(state, "right"))) &&
            (rightCell.some(state => !connects(state, "left")));
    },
    ["+"]: (getOffset) => {
        let topCell = getOffset(0, -1);
        let bottomCell = getOffset(0, 1);
        let leftCell = getOffset(-1, 0);
        let rightCell = getOffset(1, 0);
        return (topCell.some(state => connects(state, "bottom"))) &&
            (bottomCell.some(state => connects(state, "top"))) &&
            (leftCell.some(state => connects(state, "right"))) &&
            (rightCell.some(state => connects(state, "left")));
    },
    o: (getOffset) => {
        let topCell = getOffset(0, -1);
        let bottomCell = getOffset(0, 1);
        let leftCell = getOffset(-1, 0);
        let rightCell = getOffset(1, 0);
        return (topCell.some(state => !connects(state, "bottom"))) &&
            (bottomCell.some(state => !connects(state, "top"))) &&
            (leftCell.some(state => !connects(state, "right"))) &&
            (rightCell.some(state => !connects(state, "left")));
    },
    i: (getOffset) => {
        let topCell = getOffset(0, -1);
        let bottomCell = getOffset(0, 1);
        let leftCell = getOffset(-1, 0);
        let rightCell = getOffset(1, 0);
        return (topCell.some(state => connects(state, "bottom"))) &&
            (bottomCell.some(state => connects(state, "top"))) &&
            (leftCell.some(state => !connects(state, "right"))) &&
            (rightCell.some(state => !connects(state, "left")));
    },
    ["-"]: (getOffset) => {
        let topCell = getOffset(0, -1);
        let bottomCell = getOffset(0, 1);
        let leftCell = getOffset(-1, 0);
        let rightCell = getOffset(1, 0);
        return (topCell.some(state => !connects(state, "bottom"))) &&
            (bottomCell.some(state => !connects(state, "top"))) &&
            (leftCell.some(state => connects(state, "right"))) &&
            (rightCell.some(state => connects(state, "left")));
    },
    ["T"]: (getOffset) => {
        let topCell = getOffset(0, -1);
        let bottomCell = getOffset(0, 1);
        let leftCell = getOffset(-1, 0);
        let rightCell = getOffset(1, 0);
        return (topCell.some(state => !connects(state, "bottom"))) &&
            (bottomCell.some(state => connects(state, "top"))) &&
            (leftCell.some(state => connects(state, "right"))) &&
            (rightCell.some(state => connects(state, "left")));
    },

    ["^"]: (getOffset) => {
        let topCell = getOffset(0, -1);
        let bottomCell = getOffset(0, 1);
        let leftCell = getOffset(-1, 0);
        let rightCell = getOffset(1, 0);
        return (topCell.some(state => connects(state, "bottom"))) &&
            (bottomCell.some(state => !connects(state, "top"))) &&
            (leftCell.some(state => connects(state, "right"))) &&
            (rightCell.some(state => connects(state, "left")));
    },

    [">"]: (getOffset) => {
        let topCell = getOffset(0, -1);
        let bottomCell = getOffset(0, 1);
        let leftCell = getOffset(-1, 0);
        let rightCell = getOffset(1, 0);
        return (topCell.some(state => connects(state, "bottom"))) &&
            (bottomCell.some(state => connects(state, "top"))) &&
            (leftCell.some(state => !connects(state, "right"))) &&
            (rightCell.some(state => connects(state, "left")));
    },
    ["<"]: (getOffset) => {
        let topCell = getOffset(0, -1);
        let bottomCell = getOffset(0, 1);
        let leftCell = getOffset(-1, 0);
        let rightCell = getOffset(1, 0);
        return (topCell.some(state => connects(state, "bottom"))) &&
            (bottomCell.some(state => connects(state, "top"))) &&
            (leftCell.some(state => connects(state, "right"))) &&
            (rightCell.some(state => !connects(state, "left")));
    }
}

function setup() {
    createCanvas(rows * cell_width, cols * cell_width);
}

function draw() {
    background(0);

    for (let i = 0; i < grid.length; i++) {
        let x = i % cols;
        let y = floor(i / cols);
        let state = grid[i];

        push();

        translate(x * cell_width + cell_width / 2, y * cell_width + cell_width / 2);

        stroke(255);
        if (state.length == 1) {
            stroke(255);
        } else {
            stroke(100, 0, 0);
        }

        for (let possibleState of state) {
            switch (possibleState) {
                case "r":
                    line(0, 0, 0, cell_width / 2);
                    line(0, 0, cell_width / 2, 0);
                    break;
                case "l":
                    line(0, 0, 0, -cell_width / 2);
                    line(0, 0, cell_width / 2, 0);
                    break;
                case "j":
                    line(0, 0, 0, -cell_width / 2);
                    line(0, 0, -cell_width / 2, 0);
                    break;
                case "n":
                    line(0, 0, 0, cell_width / 2);
                    line(0, 0, -cell_width / 2, 0);
                    break;
                case "+":
                    line(0, -cell_width / 2, 0, cell_width / 2);
                    line(-cell_width / 2, 0, cell_width / 2, 0);
                    break;
                case "i":
                    line(0, -cell_width / 2, 0, cell_width / 2);
                    break;
                case "-":
                    line(-cell_width / 2, 0, cell_width / 2, 0);
                    break;
                case "T":
                    line(-cell_width / 2, 0, cell_width / 2, 0);
                    line(0, 0, 0, cell_width / 2);
                    break;
                case "^":
                    line(-cell_width / 2, 0, cell_width / 2, 0);
                    line(0, 0, 0, -cell_width / 2);
                    break;
                case "<":
                    line(0, -cell_width / 2, 0, cell_width / 2);
                    line(0, 0, -cell_width / 2, 0);
                    break;
                case ">":
                    line(0, -cell_width / 2, 0, cell_width / 2);
                    line(0, 0, cell_width / 2, 0);
                    break;
            }
        }


        pop();
    }

    if (stepCollapse() == "done") noLoop();
}

function stepCollapse() {

    // Choose a random cell from the cells with least length and collapse it

    let [index, cell] = getRandomCollapsableCell(grid);

    if (index === -1) return "done";

    grid[index] = [cell[floor(random(cell.length))]]

    // propagate the collapse

    grid = propagateCollapse(grid);
}

function getRandomCollapsableCell(grid) {
    // This is very inefficient, could all be combined into one loop.

    // Enumerate all the cells
    let g = grid.map((cell, i) => [i, cell])

    // Filter out the cells with length > 1
    g = g.filter(([i, cell]) => cell.length > 1)

    if (g.length == 0)
        return [-1, null]

    // Sort by number of states in each cell
    g.sort(([_a, a], [_b, b]) => a.length - b.length)

    let min_length = g[0][1].length;


    g = g.filter(([i, cell]) => cell.length === min_length)

    // Return a random cell from the list
    return g[floor(random(g.length))]
}

function propagateCollapse(grid) {
    // This is SOOO BAD but whatever.
    let g = grid.map(s => [...s])

    let lastG = g.map(s => [...s]);

    while (true) {
        g = propagateCollapse1Step(g);

        let thisG = g.map(s => [...s]);
        let same = thisG.every((s, i) => s.every((s, j) => s === lastG[i][j]));
        if (same) { break }
        else { lastG = thisG }
    }


    return g
}

function propagateCollapse1Step(grid) {
    for (let i = 0; i < grid.length; i++) {
        let x = i % cols;
        let y = floor(i / cols);

        let cell = grid[i];

        function getOffset(xOff, yOff) {
            let newX = x + xOff;
            if (newX < 0 || newX >= cols) return OFFGRID_VALUE;
            let newY = y + yOff;
            if (newY < 0 || newY >= rows) return OFFGRID_VALUE;

            return grid[newY * cols + newX];
        }

        if (cell.length > 1) {
            let newState = [];
            for (let state of cell) {
                if (RULES[state](getOffset)) {
                    newState.push(state);
                }
            }
            grid[i] = newState;
        }
    }
    return grid;
}