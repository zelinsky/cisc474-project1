class MazeNodes {
    constructor() {
        this.NODE_BOUND = 3;
        this.OFFSET = 17;
        this.NodeList = [{ 'adjacency': [1, 7], 'id': 0, 'x': 54, 'y': 51 },
        { 'adjacency': [0, 2, 8], 'id': 1, 'x': 191, 'y': 51 },
        { 'adjacency': [1, 3, 10], 'id': 2, 'x': 330, 'y': 51 },
        { 'adjacency': [2, 4, 11], 'id': 3, 'x': 433, 'y': 51 },
        { 'adjacency': [3, 5, 12], 'id': 4, 'x': 536, 'y': 51 },
        { 'adjacency': [4, 6, 14], 'id': 5, 'x': 675, 'y': 51 },
        { 'adjacency': [5, 15], 'id': 6, 'x': 813, 'y': 51 },
        { 'adjacency': [0, 8, 16], 'id': 7, 'x': 54, 'y': 144 },
        { 'adjacency': [1, 7, 9], 'id': 8, 'x': 191, 'y': 144 },
        { 'adjacency': [8, 27, 10], 'id': 9, 'x': 260, 'y': 144 },
        { 'adjacency': [2, 9, 11, 19], 'id': 10, 'x': 330, 'y': 144 },
        { 'adjacency': [3, 10, 12, 32], 'id': 11, 'x': 433, 'y': 144 },
        { 'adjacency': [4, 11, 13, 22], 'id': 12, 'x': 536, 'y': 144 },
        { 'adjacency': [12, 14, 28], 'id': 13, 'x': 606, 'y': 144 },
        { 'adjacency': [5, 13, 15], 'id': 14, 'x': 675, 'y': 144 },
        { 'adjacency': [6, 14, 25], 'id': 15, 'x': 813, 'y': 144 },
        { 'adjacency': [7, 17], 'id': 16, 'x': 54, 'y': 206 },
        { 'adjacency': [16, 18, 44], 'id': 17, 'x': 88, 'y': 206 },
        { 'adjacency': [17, 26], 'id': 18, 'x': 158, 'y': 206 },
        { 'adjacency': [10, 20], 'id': 19, 'x': 330, 'y': 206 },
        { 'adjacency': [19, 31], 'id': 20, 'x': 364, 'y': 206 },
        { 'adjacency': [22, 33], 'id': 21, 'x': 502, 'y': 206 },
        { 'adjacency': [12, 21], 'id': 22, 'x': 536, 'y': 206 },
        { 'adjacency': [29, 24], 'id': 23, 'x': 709, 'y': 206 },
        { 'adjacency': [23, 25, 47], 'id': 24, 'x': 779, 'y': 206 },
        { 'adjacency': [24, 15], 'id': 25, 'x': 813, 'y': 206 },
        { 'adjacency': [18, 27], 'id': 26, 'x': 158, 'y': 235 },
        { 'adjacency': [26, 9, 36], 'id': 27, 'x': 260, 'y': 235 },
        { 'adjacency': [13, 29, 37], 'id': 28, 'x': 606, 'y': 235 },
        { 'adjacency': [23, 28], 'id': 29, 'x': 709, 'y': 235 },
        { 'adjacency': [31, 40], 'id': 30, 'x': 330, 'y': 268 },
        { 'adjacency': [20, 30, 32], 'id': 31, 'x': 364, 'y': 268 },
        { 'adjacency': [31, 11, 33], 'id': 32, 'x': 433, 'y': 268 },
        { 'adjacency': [21, 34, 32], 'id': 33, 'x': 502, 'y': 268 },
        { 'adjacency': [33, 42], 'id': 34, 'x': 536, 'y': 268 },
        { 'adjacency': [45, 36], 'id': 35, 'x': 158, 'y': 303 },
        { 'adjacency': [27, 35, 39], 'id': 36, 'x': 260, 'y': 303 },
        { 'adjacency': [28, 38, 43], 'id': 37, 'x': 606, 'y': 303 },
        { 'adjacency': [37, 46], 'id': 38, 'x': 709, 'y': 303 },
        { 'adjacency': [36, 40, 50], 'id': 39, 'x': 260, 'y': 332 },
        { 'adjacency': [30, 39, 53, 41], 'id': 40, 'x': 330, 'y': 332 },
        { 'adjacency': [40, 42, 48], 'id': 41, 'x': 433, 'y': 332 },
        { 'adjacency': [34, 43, 41, 56], 'id': 42, 'x': 536, 'y': 332 },
        { 'adjacency': [37, 42, 51], 'id': 43, 'x': 606, 'y': 332 },
        { 'adjacency': [17, 45, 58], 'id': 44, 'x': 88, 'y': 364 },
        { 'adjacency': [35, 49, 44], 'id': 45, 'x': 158, 'y': 364 },
        { 'adjacency': [38, 52, 47], 'id': 46, 'x': 709, 'y': 364 },
        { 'adjacency': [24, 46, 65], 'id': 47, 'x': 779, 'y': 364 },
        { 'adjacency': [41], 'id': 48, 'x': 433, 'y': 394 },
        { 'adjacency': [45, 50, 59], 'id': 49, 'x': 158, 'y': 457 },
        { 'adjacency': [39, 49, 60], 'id': 50, 'x': 260, 'y': 457 },
        { 'adjacency': [43, 52, 63], 'id': 51, 'x': 606, 'y': 457 },
        { 'adjacency': [46, 51, 64], 'id': 52, 'x': 709, 'y': 457 },
        { 'adjacency': [40, 54, 61], 'id': 53, 'x': 330, 'y': 487 },
        { 'adjacency': [53, 55, 73], 'id': 54, 'x': 396, 'y': 487 },
        { 'adjacency': [54, 56, 74], 'id': 55, 'x': 466, 'y': 487 },
        { 'adjacency': [42, 55, 62], 'id': 56, 'x': 536, 'y': 487 },
        { 'adjacency': [58, 67], 'id': 57, 'x': 54, 'y': 522 },
        { 'adjacency': [44, 57, 59], 'id': 58, 'x': 88, 'y': 522 },
        { 'adjacency': [49, 60, 69, 58], 'id': 59, 'x': 158, 'y': 522 },
        { 'adjacency': [50, 61, 71, 59], 'id': 60, 'x': 260, 'y': 522 },
        { 'adjacency': [53, 60], 'id': 61, 'x': 330, 'y': 522 },
        { 'adjacency': [56, 63], 'id': 62, 'x': 536, 'y': 522 },
        { 'adjacency': [51, 64, 62, 76], 'id': 63, 'x': 606, 'y': 522 },
        { 'adjacency': [63, 52, 65, 78], 'id': 64, 'x': 709, 'y': 522 },
        { 'adjacency': [64, 47, 66], 'id': 65, 'x': 779, 'y': 522 },
        { 'adjacency': [65, 80], 'id': 66, 'x': 813, 'y': 522 },
        { 'adjacency': [57, 68], 'id': 67, 'x': 54, 'y': 586 },
        { 'adjacency': [67, 81], 'id': 68, 'x': 88, 'y': 586 },
        { 'adjacency': [59, 70], 'id': 69, 'x': 158, 'y': 586 },
        { 'adjacency': [69, 71, 83], 'id': 70, 'x': 191, 'y': 586 },
        { 'adjacency': [60, 70, 72], 'id': 71, 'x': 260, 'y': 586 },
        { 'adjacency': [71, 73, 86], 'id': 72, 'x': 330, 'y': 586 },
        { 'adjacency': [72, 54], 'id': 73, 'x': 396, 'y': 586 },
        { 'adjacency': [55, 75], 'id': 74, 'x': 466, 'y': 586 },
        { 'adjacency': [74, 76, 89], 'id': 75, 'x': 536, 'y': 586 },
        { 'adjacency': [75, 63, 77], 'id': 76, 'x': 606, 'y': 586 },
        { 'adjacency': [76, 78, 92], 'id': 77, 'x': 675, 'y': 586 },
        { 'adjacency': [77, 64], 'id': 78, 'x': 709, 'y': 586 },
        { 'adjacency': [80, 94], 'id': 79, 'x': 779, 'y': 586 },
        { 'adjacency': [79, 66], 'id': 80, 'x': 813, 'y': 586 },
        { 'adjacency': [68, 82, 96], 'id': 81, 'x': 88, 'y': 645 },
        { 'adjacency': [81, 83, 107], 'id': 82, 'x': 158, 'y': 645 },
        { 'adjacency': [70, 82, 84], 'id': 83, 'x': 191, 'y': 645 },
        { 'adjacency': [83, 97], 'id': 84, 'x': 224, 'y': 645 },
        { 'adjacency': [99, 86], 'id': 85, 'x': 294, 'y': 645 },
        { 'adjacency': [72, 85, 87], 'id': 86, 'x': 330, 'y': 645 },
        { 'adjacency': [86, 88, 111], 'id': 87, 'x': 396, 'y': 645 },
        { 'adjacency': [87, 89, 112], 'id': 88, 'x': 466, 'y': 645 },
        { 'adjacency': [88, 75, 90], 'id': 89, 'x': 536, 'y': 645 },
        { 'adjacency': [89, 100], 'id': 90, 'x': 569, 'y': 645 },
        { 'adjacency': [102, 92], 'id': 91, 'x': 640, 'y': 645 },
        { 'adjacency': [77, 91, 93], 'id': 92, 'x': 675, 'y': 645 },
        { 'adjacency': [92, 116, 94], 'id': 93, 'x': 709, 'y': 645 },
        { 'adjacency': [93, 79, 103], 'id': 94, 'x': 779, 'y': 645 },
        { 'adjacency': [96, 105], 'id': 95, 'x': 54, 'y': 680 },
        { 'adjacency': [81, 95], 'id': 96, 'x': 88, 'y': 680 },
        { 'adjacency': [84, 98], 'id': 97, 'x': 224, 'y': 680 },
        { 'adjacency': [97, 99, 109], 'id': 98, 'x': 260, 'y': 680 },
        { 'adjacency': [85, 98], 'id': 99, 'x': 294, 'y': 680 },
        { 'adjacency': [90, 101], 'id': 100, 'x': 569, 'y': 680 },
        { 'adjacency': [100, 114, 102], 'id': 101, 'x': 606, 'y': 680 },
        { 'adjacency': [101, 91], 'id': 102, 'x': 640, 'y': 680 },
        { 'adjacency': [94, 104], 'id': 103, 'x': 779, 'y': 680 },
        { 'adjacency': [103, 118], 'id': 104, 'x': 813, 'y': 680 },
        { 'adjacency': [95, 106, 119], 'id': 105, 'x': 54, 'y': 741 },
        { 'adjacency': [105, 107, 120], 'id': 106, 'x': 120, 'y': 741 },
        { 'adjacency': [82, 106, 108], 'id': 107, 'x': 158, 'y': 741 },
        { 'adjacency': [107, 109, 121], 'id': 108, 'x': 191, 'y': 741 },
        { 'adjacency': [98, 108, 110], 'id': 109, 'x': 260, 'y': 741 },
        { 'adjacency': [109, 11, 122], 'id': 110, 'x': 330, 'y': 741 },
        { 'adjacency': [87, 110], 'id': 111, 'x': 396, 'y': 741 },
        { 'adjacency': [88, 113], 'id': 112, 'x': 466, 'y': 741 },
        { 'adjacency': [112, 114, 123], 'id': 113, 'x': 536, 'y': 741 },
        { 'adjacency': [101, 113, 115], 'id': 114, 'x': 606, 'y': 741 },
        { 'adjacency': [114, 116, 124], 'id': 115, 'x': 675, 'y': 741 },
        { 'adjacency': [93, 115, 117], 'id': 116, 'x': 709, 'y': 741 },
        { 'adjacency': [116, 118, 125], 'id': 117, 'x': 745, 'y': 741 },
        { 'adjacency': [104, 117, 126], 'id': 118, 'x': 813, 'y': 741 },
        { 'adjacency': [105, 120], 'id': 119, 'x': 54, 'y': 802 },
        { 'adjacency': [106, 119], 'id': 120, 'x': 120, 'y': 802 },
        { 'adjacency': [108, 122], 'id': 121, 'x': 191, 'y': 802 },
        { 'adjacency': [110, 121, 123], 'id': 122, 'x': 330, 'y': 802 },
        { 'adjacency': [113, 122, 124], 'id': 123, 'x': 536, 'y': 802 },
        { 'adjacency': [115, 123], 'id': 124, 'x': 675, 'y': 802 },
        { 'adjacency': [117, 126], 'id': 125, 'x': 745, 'y': 802 },
        { 'adjacency': [125, 118], 'id': 126, 'x': 813, 'y': 802 }];
    }

    getNode(i) {
        return this.NodeList[i];
    }

    nodeCollide(x, y) {
        var i = 0;
        for (i = 0; i < this.NodeList.length; i++) {
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
            if ((Math.abs((this.getNode(i).x - this.OFFSET) - x) < this.NODE_BOUND)
                && (Math.abs((this.getNode(i).y - this.OFFSET) - y) < this.NODE_BOUND)) {
                return this.getNode(i);
            }
        }
        return false;
    }

    dirClear(x, y, dir) {
        //console.log("Calling dirClear with input dir " + dir);
        var node = this.collidingNode(x, y);
        if (node) {
            var i = 0;
            switch (dir) {
                case "right":  // we seek an adjacent node with equal y and greater x
                    for (i = 0; i < node.adjacency.length; i++) {
                        if ((this.getNode(node.adjacency[i]).y == node.y) && (this.getNode(node.adjacency[i]).x > node.x)) {
                            //console.log("Can go right from " + node.id + " to " + this.getNode(node.adjacency[i]).id);
                            return this.getNode(node.adjacency[i]);
                        }
                    }
                    return false;
                case "left":   // we seek an adjacent node with equal y and lesser x
                    for (i = 0; i < node.adjacency.length; i++) {
                        if ((this.getNode(node.adjacency[i]).y == node.y) && (this.getNode(node.adjacency[i]).x < node.x)) {
                            //console.log("Can go left from " + node.id + " to " + this.getNode(node.adjacency[i]).id);
                            return this.getNode(node.adjacency[i]);
                        }
                    }
                    return false;
                case "up":   // we seek an adjacent node with lesser y and equal x
                    for (i = 0; i < node.adjacency.length; i++) {
                        if ((this.getNode(node.adjacency[i]).y < node.y) && (this.getNode(node.adjacency[i]).x == node.x)) {
                            //console.log("Can go up from " + node.id + " to " + i);
                            return this.getNode(node.adjacency[i]);
                        }
                    }
                    return false;
                case "down":   // we seek an adjacent node with greater y and equal x
                    for (i = 0; i < node.adjacency.length; i++) {
                        if ((this.getNode(node.adjacency[i]).y > node.y) && (this.getNode(node.adjacency[i]).x == node.x)) {
                            //console.log("Can go down from " + node.id + " to " + i);
                            return this.getNode(node.adjacency[i]);
                        }
                    }
                    return false;
                default:
                    return false;
            }
        }
        return false;
    }
}