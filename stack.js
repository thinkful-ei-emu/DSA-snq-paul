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
}

function peek(stk){
  if(stk.top===null){
    return undefined;
  }
  return stk.top.value;
}

function isEmpty(stk){
  if(stk.top===null) return true;
  return false;
}

function display(stk){
  displayR(stk.top);
  console.log('');
}

function displayR(node){
  if(node===null) {
    process.stdout.write('null');
    return;
  }
  displayR(node.next);
  process.stdout.write(' <- '+node.value);
}

function main(){
  let starTrek=new Stack();
  starTrek.push('Kirk');
  starTrek.push('Spock');
  starTrek.push('McCoy');
  starTrek.push('Scotty');
  starTrek.print();
  display(starTrek);
  starTrek.pop();
  starTrek.pop();
  starTrek.print();
  display(starTrek);
  let str='dad';
  console.log(`${str} is a palindrome? ${isPalindrome(str)}`);
  str='A man, a plan, a canal: Panama';
  console.log(`${str} is a palindrome? ${isPalindrome(str)}`);
  str='1001';
  console.log(`${str} is a palindrome? ${isPalindrome(str)}`);
  str='paul';
  console.log(`${str} is a palindrome? ${isPalindrome(str)}`);
  console.log(isCorrectParen('(3+4)'));
  console.log(isCorrectParen('(3+4)]'));
  console.log(isCorrectParen('[(3+4)'));
  console.log(isCorrectParen('[(3+]4)'));
  let stk=new Stack();
  stk.push(1);
  display(stk);
  sortStack(stk);
  display(stk);
  stk.push(2);
  display(stk);
  sortStack(stk);
  display(stk);
  stk.push(3);
  stk.push(5);
  stk.push(3);
  stk.push(2);
  display(stk);
  sortStack(stk);
  display(stk);
}
main();


function isPalindrome(str){
  let stk=new Stack();
  str=str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  for(let i=0;i<Math.floor(str.length/2);i++){
    stk.push(str.charAt(i));
  }
  for(let i=Math.floor((str.length+1)/2);i<str.length;i++){
    if(stk.pop()!==str.charAt(i)){
      return false;
    }
  }
  return true;
}

function isCorrectParen(str){
  let stk=new Stack();
  let allowedParen={
    '(':')',
    '{':'}',
    '[':']',/* 
    '\'':'\'',
    '"':'"', */
  };
  let isInQuotes=false;
  for(let i=0;i<str.length;i++){
    if(allowedParen[str.charAt(i)]  ){
      stk.push([str.charAt(i),i]);
    }
    if(Object.values(allowedParen).includes(str.charAt(i))){
      if(peek(stk)===undefined){
        console.log(str.charAt(i)+' without the right starting at location '+i);
        return false;
      }
      if(allowedParen[stk.pop()[0]]!== str.charAt(i)){
        console.log(str.charAt(i)+' without the right starting at location '+i);
        return false;
      }
    }
  }
  if(!isEmpty(stk)){
    console.log(`${peek(stk)[0]} at location ${peek(stk)[1]} isn't being closed`);
    return false;
  }
  return true;
}


//O(N^2) stack sort
function sortStack(stk){
  let newStk=new Stack();
  //We will loop through the stk, first getting the biggest element
  // and pushing it to newStk,
  //Second, getting the second biggest element and pushing it to newStk
  //third, ...

  //Get the first largest;
  let {max,count}=getLargestMax(stk);
  while(count>0){
    newStk.push(max);
    --count;
  }

  //just safety
  let i=Number.MAX_SAFE_INTEGER;
  while(i>0){
    let obj=getLargestMaxSmallerThanGiven(stk,max);
    if(!obj){
      break;
    }
    max=obj.max;
    count=obj.count;
    while(count>0){
      newStk.push(max);
      --count;
    }
    i--;
  }

  stk.top=newStk.top;
}

function getLargestMax(stk){
  let node=stk.top;
  let currentMax= node.value;
  let currentMaxCount=0;
  while(node!==null){
    if(node.value===currentMax){
      currentMaxCount++;
    }
    if(node.value>currentMax){
      currentMaxCount=1;
      currentMax=(node.value);
    }
    node=node.next;
  }
  return{
    max:currentMax,
    count:currentMaxCount
  };
}

function getLargestMaxSmallerThanGiven(stk,oldMax){
  let node=stk.top;
  //going thorugh and checking smaller value is even possible
  //and record that smaller value to be currentMax
  while(node!==null){
    if(node.value<oldMax){
      break;
    }
    node=node.next;
  }

  //if there are no smaller values than oldMax
  if(node===null){
    return false;
  }


  let currentMax= node.value;
  let currentMaxCount=0;
  node=stk.top;
  while(node!==null){
    if(node.value>=oldMax){
      node=node.next;
      continue;
    }
    if(node.value===currentMax){
      currentMaxCount++;
    }
    if(node.value>currentMax){
      currentMaxCount=1;
      currentMax=(node.value);
    }
    node=node.next;
  }
  return{
    max:currentMax,
    count:currentMaxCount
  };
}


//didn't pass things back and forth, just traversed through the original a bunch of times, first getting the biggest element and the number of times it occurs, pushing that into tempstack, second getting the second biggest element and the number of times it occurs, pushing that into tempstack, so on and so forth