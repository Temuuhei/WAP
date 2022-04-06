class Node {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}

class LinkedList{
    constructor() {
        this.head = null;
    }
}

LinkedList.prototype.add = function(data) {
    let newNode = new Node(data);

    if(!this.head) {
        this.head = newNode;
        return this.head;
    }

    let tail = this.head;
    while(tail.next !== null) {
        tail = tail.next;
    }
    tail.next = newNode;
    return this.head;
}

LinkedList.prototype.getAt = function(index) {
    let counter = 0;
    let node = this.head;
    while(node) {
        if (counter === index) {
            return node;
        }
        counter++;
        node = node.next;
    }

    return null;
}

LinkedList.prototype.remove = function(value) {
    if(!this.head) {
        this.head = new Node(data);
        return;
    }

    let counter = 0;
    let node = this.head;
    while(node) {
        if(node.data === value) {
            break;
        }
        counter++;
        node = node.next;
    }

    const previous = this.getAt(counter - 1);
    if(!previous || !previous.next) {
        return;
    }

    previous.next = previous.next.next;
    return this.head;
}

LinkedList.prototype.print = function() {
    let items = [];
    let node = this.head;
    let index = 0;
    while(node) {
        items[index] =  node.data;
        index++;
        node = node.next;
    }

    return console.log(items);
}

let linkedlist = new LinkedList();
linkedlist.add(1);
linkedlist.add(2);
linkedlist.add(3);
// linkedlist.add(4);
// linkedlist.add(5);
linkedlist.print();
linkedlist.remove(2);
linkedlist.print();