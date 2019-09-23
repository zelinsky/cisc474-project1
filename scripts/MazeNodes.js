class MazeNodes {
    constructor() {
        this.NODE_BOUND = 15;
        this.OFFSET = 20;
        this.NodeList = [{ 'adjacency': [1, 7], 'x': 54, 'y': 51 },
        { 'adjacency': [0, 2, 9], 'x': 191, 'y': 51 },
        { 'adjacency': [1, 3, 10], 'x': 330, 'y': 51 },
        { 'adjacency': [2, 4, 11], 'x': 433, 'y': 51 },
        { 'adjacency': [3, 5, 12], 'x': 536, 'y': 51 },
        { 'adjacency': [4, 6, 14], 'x': 675, 'y': 51 },
        { 'adjacency': [5, 15], 'x': 813, 'y': 51 },
        { 'adjacency': [0, 8, 16], 'x': 54, 'y': 144 },
        { 'adjacency': [1, 7, 9], 'x': 191, 'y': 144 },
        { 'adjacency': [8, 10], 'x': 260, 'y': 144 },
        { 'adjacency': [2, 9, 11, 19], 'x': 330, 'y': 144 },
        { 'adjacency': [3, 10, 12, 32], 'x': 433, 'y': 144 },
        { 'adjacency': [4, 11, 13, 22], 'x': 536, 'y': 144 },
        { 'adjacency': [12, 14, 28], 'x': 606, 'y': 144 },
        { 'adjacency': [5, 13, 15], 'x': 675, 'y': 144 },
        { 'adjacency': [0, 14], 'x': 813, 'y': 144 },
        { 'adjacency': [7, 17], 'x': 54, 'y': 206 },
        { 'adjacency': [16, 18, 44], 'x': 88, 'y': 206 },
        { 'adjacency': [17, 26], 'x': 158, 'y': 206 },
        { 'adjacency': [10, 20], 'x': 330, 'y': 206 },
        { 'adjacency': [19, 31], 'x': 364, 'y': 206 },
        { 'adjacency': [22, 33], 'x': 502, 'y': 206 },
        { 'adjacency': [12, 21], 'x': 536, 'y': 206 },
        { 'adjacency': [29, 24], 'x': 709, 'y': 206 },
        { 'adjacency': [23, 25], 'x': 779, 'y': 206 },
        { 'adjacency': [24, 15], 'x': 813, 'y': 206 },
        { 'adjacency': [18, 27], 'x': 158, 'y': 235 },
        { 'adjacency': [26, 9, 36], 'x': 260, 'y': 235 },
        { 'adjacency': [13, 29, 37], 'x': 606, 'y': 235 },
        { 'adjacency': [23, 28], 'x': 709, 'y': 235 },
        { 'adjacency': [31, 40], 'x': 330, 'y': 268 },
        { 'adjacency': [20, 30, 32], 'x': 364, 'y': 268 },
        { 'adjacency': [31, 11, 33], 'x': 433, 'y': 268 },
        { 'adjacency': [21, 34, 32], 'x': 502, 'y': 268 },
        { 'adjacency': [33, 42], 'x': 536, 'y': 268 },
        { 'adjacency': [45, 36], 'x': 158, 'y': 303 },
        { 'adjacency': [27, 35, 39], 'x': 260, 'y': 303 },
        { 'adjacency': [28, 38, 43], 'x': 606, 'y': 303 },
        { 'adjacency': [37, 46], 'x': 709, 'y': 303 },
        { 'adjacency': [36, 40, 50], 'x': 260, 'y': 332 },
        { 'adjacency': [30, 39, 53, 41], 'x': 330, 'y': 332 },
        { 'adjacency': [40, 42, 48], 'x': 433, 'y': 332 },
        { 'adjacency': [34, 43, 41, 56], 'x': 536, 'y': 332 },
        { 'adjacency': [37, 42, 51], 'x': 606, 'y': 332 },
        { 'adjacency': [17, 45, 58], 'x': 88, 'y': 364 },
        { 'adjacency': [35, 49, 44], 'x': 158, 'y': 364 },
        { 'adjacency': [38, 52, 47], 'x': 709, 'y': 364 },
        { 'adjacency': [24, 46, 65], 'x': 779, 'y': 364 },
        { 'adjacency': [41], 'x': 433, 'y': 394 },
        { 'adjacency': [45, 50, 59], 'x': 158, 'y': 457 },
        { 'adjacency': [39, 49, 60], 'x': 260, 'y': 457 },
        { 'adjacency': [43, 52, 63], 'x': 606, 'y': 457 },
        { 'adjacency': [46, 51, 64], 'x': 709, 'y': 457 },
        { 'adjacency': [40, 54, 61], 'x': 330, 'y': 487 },
        { 'adjacency': [53, 55, 73], 'x': 396, 'y': 487 },
        { 'adjacency': [54, 56, 74], 'x': 466, 'y': 487 },
        { 'adjacency': [42, 55, 62], 'x': 536, 'y': 487 },
        { 'adjacency': [58, 67], 'x': 54, 'y': 522 },
        { 'adjacency': [44, 57, 59], 'x': 88, 'y': 522 },
        { 'adjacency': [49, 60, 69, 58], 'x': 158, 'y': 522 },
        { 'adjacency': [50, 61, 71, 59], 'x': 260, 'y': 522 },
        { 'adjacency': [53, 60], 'x': 330, 'y': 522 },
        { 'adjacency': [56, 63], 'x': 536, 'y': 522 },
        { 'adjacency': [51, 64, 62, 76], 'x': 606, 'y': 522 },
        { 'adjacency': [63, 52, 65, 78], 'x': 709, 'y': 522 },
        { 'adjacency': [64, 47, 66], 'x': 779, 'y': 522 },
        { 'adjacency': [65, 80], 'x': 813, 'y': 522 },
        { 'adjacency': [57, 68], 'x': 54, 'y': 586 },
        { 'adjacency': [67, 81], 'x': 88, 'y': 586 },
        { 'adjacency': [59, 70], 'x': 158, 'y': 586 },
        { 'adjacency': [69, 71, 83], 'x': 191, 'y': 586 },
        { 'adjacency': [60, 70, 72], 'x': 260, 'y': 586 },
        { 'adjacency': [71, 73, 86], 'x': 330, 'y': 586 },
        { 'adjacency': [72, 54], 'x': 396, 'y': 586 },
        { 'adjacency': [55, 75], 'x': 466, 'y': 586 },
        { 'adjacency': [74, 76, 89], 'x': 536, 'y': 586 },
        { 'adjacency': [75, 63, 77], 'x': 606, 'y': 586 },
        { 'adjacency': [76, 78, 92], 'x': 675, 'y': 586 },
        { 'adjacency': [77, 64], 'x': 709, 'y': 586 },
        { 'adjacency': [80, 94], 'x': 779, 'y': 586 },
        { 'adjacency': [79, 66], 'x': 813, 'y': 586 },
        { 'adjacency': [68, 82, 96], 'x': 88, 'y': 645 },
        { 'adjacency': [81, 83, 107], 'x': 158, 'y': 645 },
        { 'adjacency': [70, 82, 84], 'x': 191, 'y': 645 },
        { 'adjacency': [83, 97], 'x': 224, 'y': 645 },
        { 'adjacency': [99, 86], 'x': 294, 'y': 645 },
        { 'adjacency': [72, 85, 87], 'x': 330, 'y': 645 },
        { 'adjacency': [86, 88, 111], 'x': 396, 'y': 645 },
        { 'adjacency': [87, 89, 112], 'x': 466, 'y': 645 },
        { 'adjacency': [88, 75, 90], 'x': 536, 'y': 645 },
        { 'adjacency': [89, 100], 'x': 569, 'y': 645 },
        { 'adjacency': [102, 92], 'x': 640, 'y': 645 },
        { 'adjacency': [77, 91, 93], 'x': 675, 'y': 645 },
        { 'adjacency': [92, 116, 94], 'x': 709, 'y': 645 },
        { 'adjacency': [93, 79, 103], 'x': 779, 'y': 645 },
        { 'adjacency': [96, 105], 'x': 54, 'y': 680 },
        { 'adjacency': [81, 95], 'x': 88, 'y': 680 },
        { 'adjacency': [84, 98], 'x': 191, 'y': 680 },
        { 'adjacency': [97, 99, 109], 'x': 260, 'y': 680 },
        { 'adjacency': [85, 98], 'x': 294, 'y': 680 },
        { 'adjacency': [90, 101], 'x': 569, 'y': 680 },
        { 'adjacency': [100, 114, 102], 'x': 606, 'y': 680 },
        { 'adjacency': [101, 91], 'x': 640, 'y': 680 },
        { 'adjacency': [94, 104], 'x': 779, 'y': 680 },
        { 'adjacency': [103, 118], 'x': 813, 'y': 680 },
        { 'adjacency': [95, 106, 119], 'x': 54, 'y': 741 },
        { 'adjacency': [105, 107, 120], 'x': 120, 'y': 741 },
        { 'adjacency': [82, 106, 108], 'x': 158, 'y': 741 },
        { 'adjacency': [107, 109, 121], 'x': 191, 'y': 741 },
        { 'adjacency': [98, 108, 110], 'x': 260, 'y': 741 },
        { 'adjacency': [109, 11, 122], 'x': 330, 'y': 741 },
        { 'adjacency': [87, 110], 'x': 330, 'y': 741 },
        { 'adjacency': [88, 113], 'x': 466, 'y': 741 },
        { 'adjacency': [112, 114, 123], 'x': 536, 'y': 741 },
        { 'adjacency': [101, 113, 115], 'x': 606, 'y': 741 },
        { 'adjacency': [114, 116, 124], 'x': 675, 'y': 741 },
        { 'adjacency': [93, 115, 117], 'x': 709, 'y': 741 },
        { 'adjacency': [116, 118, 125], 'x': 745, 'y': 741 },
        { 'adjacency': [104, 117, 126], 'x': 813, 'y': 741 },
        { 'adjacency': [105, 120], 'x': 54, 'y': 802 },
        { 'adjacency': [106, 119], 'x': 120, 'y': 802 },
        { 'adjacency': [108, 122], 'x': 191, 'y': 802 },
        { 'adjacency': [110, 121, 123], 'x': 330, 'y': 802 },
        { 'adjacency': [113, 122, 124], 'x': 536, 'y': 802 },
        { 'adjacency': [115, 123], 'x': 675, 'y': 802 },
        { 'adjacency': [117, 126], 'x': 745, 'y': 802 },
        { 'adjacency': [125, 118], 'x': 813, 'y': 802 }];
    }

    getNode(i) {
        return this.NodeList[i];
    }

    nodeCollide(x, y) {
        var i = 0;
        for (i = 0; i < this.NodeList.length; i++) {
            20
            if ((Math.abs((this.getNode(i).x - this.OFFSET) - x) < this.NODE_BOUND)
                && (Math.abs((this.getNode(i).y - this.OFFSET) - y) < this.NODE_BOUND)) {
                return true;
            }
        }
        return false;
    }

    collidingNode(x, y) {
        var i = 0;
        for (i = 0; i < this.NodeList.length; i++) {
            20
            if ((Math.abs((this.getNode(i).x - this.OFFSET) - x) < this.NODE_BOUND)
                && (Math.abs((this.getNode(i).y - this.OFFSET) - y) < this.NODE_BOUND)) {
                return this.getNode(i);
            }
        }
        return false;
    }

    dirBlocked(x, y, dir) {
        var node = this.collidingNode(x, y);
        if (node) {
            var i = 0;
            switch (dir) {
                case "right":  // we seek an adjacent node with equal y and greater x
                    for (i = 0; i < node.adjacency.length; i++) {
                        if ((this.getNode(node.adjacency[i]).y == node.y) && (this.getNode(node.adjacency[i]).x > node.x)) {
                            return false;
                        }
                    }
                case "left":   // we seek an adjacent node with equal y and lesser x
                    for (i = 0; i < node.adjacency.length; i++) {
                        if ((this.getNode(node.adjacency[i]).y == node.y) && (this.getNode(node.adjacency[i]).x < node.x)) {
                            return false;
                        }
                    }
                case "up":   // we seek an adjacent node with lesser y and equal x
                    for (i = 0; i < node.adjacency.length; i++) {
                        if ((this.getNode(node.adjacency[i]).y < node.y) && (this.getNode(node.adjacency[i]).x == node.x)) {
                            return false;
                        }
                    }
                case "down":   // we seek an adjacent node with greater y and equal x
                    for (i = 0; i < node.adjacency.length; i++) {
                        if ((this.getNode(node.adjacency[i]).y > node.y) && (this.getNode(node.adjacency[i]).x == node.x)) {
                            return false;
                        }
                    }
                default:
                    return true;
            }
        }
        return true;
    }
}