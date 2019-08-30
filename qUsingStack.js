class _Node{
  constructor(value,next){
    this.value=value;
    this.next=next;
  }
}

class Stack{
  constructor(){
    this.top=null;
  }
  push(val){
    this.top= new _Node(val,this.top);
  }
  pop(){
    if(this.top===null){
      return null;
    }
    const tobePopped=this.top;
    this.top=this.top.next;
    return tobePopped.value;
  }
  print(){
    let node=this.top;
    console.log('\ntop');
    while(node!==null){
      console.log(node.value);
      node=node.next;
    }
    console.log('null\n');
  }
  peek(){
    if(this.top===null){
      return undefined;
    }
    return this.top.value;
  }
  isEmpty(){
    if(this.top===null){
      return true;
    }
    return false;
  }
}

//So the way I see it, something's gotta be inefficient.
//Either you keep one stack, with top either at the start or end,
//and you use the other stack to do operation on the other end.
//OR you keep two stacks one starting from end and one start from end,
//and every time one of them runs out, you cut up the other one in two. <-- more complicated but maybe better average/amortized run time, even in the case where you just want to enqueue n elements in a row, then dequeue n elements in a row
//My enqueue is definitely O(1)
//my dequeue is worst case O(N), but amortized O(1), I think if running a bunch of dequeue in a row.
class QueueWStack{
  constructor(){
    this.front= new Stack();
    this.end= new Stack();
  }

  //assumes this.end has at least 2 elements
  splitEndIntoTwo(){
    //The way I'm doing this is probably breaking some OOP principle
    let singleJumpNode=this.end.top;
    let doubleJumpNode=this.end.top.next;
    while(doubleJumpNode.next!==null){
      singleJumpNode=singleJumpNode.next;
      doubleJumpNode=doubleJumpNode.next.next;
      if(doubleJumpNode===null) break;
    }
    let backHalfStart=singleJumpNode.next;
    singleJumpNode.next=null;
    this.addToFrontRec(backHalfStart);

  }

  addToFrontRec(node){
    if(node===null){
      return;
    }
    this.front.push(node.value);
    this.addToFrontRec(node.next);
  }

  enqueue(value){
    this.end.push(value);
  }
  dequeue(){
    if(this.front.isEmpty() && this.end.isEmpty()){
      return null;
    }

    //To reach here front is not empty OR end is not empty
    if(!(this.front.isEmpty())){
      return this.front.pop();
    }

    //To reach here front is empty and end is not empty
    if(this.end.top.next===null){
      return this.end.pop();
    }

    //To reach here front is empty, and end is at least 2 elements;
    this.splitEndIntoTwo();
    return this.front.pop();
  }
  display(){
    let node=this.front.top;
    console.log('Front:');
    while(node!==null){
      process.stdout.write(node.value+'');
      node=node.next;
      if(node!==null)
        process.stdout.write(' -> ');
    }
    console.log('');
    console.log('End:');
    this._displayEnd();



    console.log('\n');
  }
  _displayEnd(){
    this._displayEndR(this.end.top);
  }
  _displayEndR(node){
    if(node===null){
      return;
    }
    this._displayEndR(node.next);
    if(node.next!==null){
      process.stdout.write(' <- ');
    }
    process.stdout.write(node.value+'');
  }

}

function main(){
  let queue=  new QueueWStack();
  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);
  queue.enqueue(4);
  queue.enqueue(5);
  queue.enqueue(6);
  queue.display();
  queue.dequeue();
  queue.display();
  queue.dequeue();
  queue.display();
  queue.dequeue();
  queue.display();
  queue.dequeue();
  queue.display();
  queue.enqueue(7);
  queue.enqueue(8);
  queue.display();
  queue.dequeue();
  queue.display();
  queue.dequeue();
  queue.display();
  queue.dequeue();
  queue.display();
}
main();