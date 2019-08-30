class _Node{
  constructor(value,next){
    this.value=value;
    this.next=next;
  }
}

class Queue{
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
    if(this.first===null){
      this.last=null;
    }
    return dequeueVal;
  }
  enqueue(value){
    if(this.first===null){
      this.first=new _Node(value,null);
      this.last=this.first;
      return;
    }
    this.last.next=new _Node(value,null);
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
    process.stdout.write(JSON.stringify(node.value)+' -> ');
    node=node.next;
  }
  process.stdout.write('null\n');
}

function displayBank(queue){
  let node=queue.first;
  while(node!==null){
    let cus=node.value;
    process.stdout.write('Customer '+cus.id + ', Paperwork: '+cus.paperwork + ', Tried: '+cus.times);
    node=node.next;
    if(node!==null)
      process.stdout.write('  ==>  ');
  }
  process.stdout.write('\n');
}

function main(){
  let queue= new Queue();
  queue.enqueue('Kirk');
  queue.enqueue('Spock');
  queue.enqueue('Uhura');
  queue.enqueue('Sulu');
  queue.enqueue('Checkov');
  display(queue);
  queue.dequeue();
  display(queue);
  queue.dequeue();
  display(queue);
  let dance=[];
  dance.push('F FemaleA');
  dance.push('F FemaleB');
  dance.push('M MaleA');
  dance.push('F FemaleC');
  dance.push('M MaleB');
  dance.push('F FemaleD');
  dance.push('M MaleC');
  dance.push('F FemaleF');
  console.log(squareDancePairs(dance));
  bank();
}
main();

function squareDancePairs(peopleInOrder){
  let maleQ=new Queue();
  let femaleQ=new Queue();
  let pairs=[];
  peopleInOrder.forEach(person=>{
    //it probably should be person.sex, but then writing the sample object is more annoying
    //an array of strings is easier
    if(person.charAt(0).toLowerCase()==='m') 
      maleQ.enqueue(person);
    if(person.charAt(0).toLowerCase()==='f') 
      femaleQ.enqueue(person);
    while(!(isEmpty(maleQ)) && !(isEmpty(femaleQ))){
      pairs.push([maleQ.dequeue(),femaleQ.dequeue()]);
    }
  });
  return pairs;

}

function bank(){
  let queue=new Queue();
  //initialize line
  for(let i=0;i<5;i++){
    queue.enqueue({id:i,paperwork:Math.floor(Math.random()*4),times:0});
  }
  //simulate
  while(!isEmpty(queue)){
    console.log('');
    console.log('Current Line is:');
    displayBank(queue);
    let customerAtWindow13=queue.dequeue();
    console.log('');
    console.log('Teller: Alright next, let me see your paperwork');
    console.log(`Customer ${customerAtWindow13.id}: Here is my paperwork -- ${customerAtWindow13.paperwork}`);
    if(customerAtWindow13.paperwork===0){
      if(customerAtWindow13.times===0){
        console.log(`Teller: Your paperwork cannot be ${customerAtWindow13.paperwork}. Try again, and BACK OF THE LINE`);
      }
      else if(customerAtWindow13.times===1){
        console.log(`Teller: I already told you, your paperwork cannot be ${customerAtWindow13.paperwork}. Try again, and BACK OF THE LINE`);
      }
      else{
        console.log(`Teller: I've told you ${customerAtWindow13.times} times, your paperwork cannot be ${customerAtWindow13.paperwork}. What is wrong with you... BACK OF THE LINE! ... Don't make me call security`);

      }
      customerAtWindow13.times++;
      customerAtWindow13.paperwork=Math.floor(Math.random()*4);
      queue.enqueue(customerAtWindow13);
    }
    else{
      if(customerAtWindow13.times===0)
        console.log(`Teller: Thank you Customer ${customerAtWindow13.id}. Have a nice day! And remember to give me a review on your app!`);
      else if(customerAtWindow13.times===1)
        console.log(`Teller: Thank you Customer ${customerAtWindow13.id} for fixing the paperwork! Hope you have a nice day!`);
      else if(customerAtWindow13.times===2)
        console.log(`Teller: Finally, customer ${customerAtWindow13.id}, thanks for getting it right. Hope the rest of your day goes well.`);
      else
        console.log(`Teller: Finally, customer ${customerAtWindow13.id}. You may leave now.`);
    }

    console.log('');

    //yes yes give me your paperwork

  }

}