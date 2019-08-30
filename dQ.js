class _Node{
  constructor(prev,value,next){
    this.value=value;
    this.next=next;
    this.prev=prev;
  }
}

class DQueue{
  constructor(){
    this.first=null;
    this.last=null;
  }
  dequeue(){
    if(this.first===null){
      return null;
    }
    let dequeueVal=this.first.value;
    this.first=this.first.next;

    //if we just killed our very last node, and are a null queue
    if(this.first===null){
      this.last=null;
    }
    //if not, then make sure to kill prev
    else{
      this.first.prev=null;
    }
    return dequeueVal;
  }
  enqueue(value){
    if(this.first===null){
      this.first=new _Node(null,value,null);
      this.last=this.first;
      return;
    }
    this.last.next=new _Node(this.last,value,null);
    this.last=this.last.next;
  }
}

function peek(queue){
  if(queue.first===null){
    return null;
  }
  return queue.first.value;
}

function isEmpty(queue){
  if(queue.first===null){
    return true;
  }
  return false;
}

function display(queue){
  let node=queue.first;
  while(node!==null){
    process.stdout.write(node.value+'');
    if(node.next!==null)
      process.stdout.write(' -> ');
    node=node.next;
  }
  process.stdout.write('\n');
}

function displayBack(queue){
  let node=queue.last;
  while(node!==null){
    process.stdout.write(node.value+'');
    if(node.prev!==null)
      process.stdout.write(' <- ');
    node=node.prev;
  }
  process.stdout.write('\n');
}

function main(){
  let dq=new DQueue();
  dq.enqueue('Kirk');
  display(dq);
  displayBack(dq);
  dq.dequeue();
  display(dq);
  displayBack(dq);
  dq.enqueue('Kirk');
  dq.enqueue('Spock');
  dq.enqueue('Uhura');
  dq.dequeue();
  display(dq);
  displayBack(dq);
  dq.enqueue('Kirk');
  dq.enqueue('Sulu');
  dq.enqueue('Checkov');
  display(dq);
  displayBack(dq);
}
main();
