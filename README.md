tree-node
=========

tree node link HTML Node class.


component install
=================

    component install brighthas/tree-node
    
Node.js install
===============
    
    npm install tree-node
    
API
===

##### require

    var Node = require("tree-node");
        
##### create

    var node = new Node();

##### #createChild()        

    var rootNode = new Node();
    var childNode = root.createChild();
        
##### #getNode(childId)

	return a node. if no return null.

##### #appendChild(child)     

    var rootNode = new Node();
    var node = new Node();
    root.appendChild(node)
        .appendChild(new Node());
            
##### #removeChild(childId)

    var root = new Node();
    var node = new Node();
    root.appendChild(node)
        .removeChild(node.id);
        
##### #replaceNode(child,targetId)

    var root = new Node();
    var target = new Node();
    var node2 = new Node();
    
    root.appendChild(target);
    
    root.replaceNode(node2,target.id);  

##### #position([nodeId]))

    var root = new Node();
    root.position(); // null , root no position.
    
    var n1 = new Node;
    var n2 = new Node;
    
    root.appendChild(n1).appendChild(n2);
    
    root.position(n1.id);  // 0
    root.position(n2.id);  // 1
    n1.position(); // 0
    n2.position(); // 1
        
##### #layer([nodeId])

    var root = new Node();        
    var n1 = new Node;
    var n2 = new Node;        
    root.appendChild(n1).appendChild(n2);
    
    root.layer() // 0
    root.layer(n1.id) // 1
    root.layer(n2.id) // 1
    n1.layer() // 1
    n2.layer() // 1      
        
###### #top()
 
    var root = new Node();        
    var n1 = new Node;
    var n2 = new Node;   
    var n3 = new Node;
    root.appendChild(n1).appendChild(n2).appendChild(n3);
    
    n1.position() // 0
    n2.position() // 1
    n3.position() // 2
    
    root.top(n3.id);
    
    n1.position() // 1 
    n2.position() // 2
    n3.position() // 0
             
##### #up()        

    var root = new Node();        
    var n1 = new Node;
    var n2 = new Node;   
    var n3 = new Node;
    root.appendChild(n1).appendChild(n2).appendChild(n3);
    
    n1.position() // 0
    n2.position() // 1
    n3.position() // 2
    
    root.up(n3.id);
    
    n1.position() // 0 
    n2.position() // 2
    n3.position() // 1
        
##### #down()

    var root = new Node();        
    var n1 = new Node;
    var n2 = new Node;   
    var n3 = new Node;
    root.appendChild(n1).appendChild(n2).appendChild(n3);
    
    n1.position() // 0
    n2.position() // 1
    n3.position() // 2
    
    root.up(n1.id);
    
    n1.position() // 1
    n2.position() // 0
    n3.position() // 3

##### #move(movedNodeId , targetId)

    var root = new Node(); 
    var n1 = new Node;
    var n2 = new Node;        
    root.appendChild(n1)
        .appendChild(n2)
        .move(n1.id,n2.id) // move n1 into n2.
            
##### #prevNode([nodeId]) 
         
    var root = new Node(); 
    var n1 = new Node;
    var n2 = new Node;        
    root.appendChild(n1)
        .appendChild(n2);
    
    n2.prevNode() === n1;  // true
    root.prevNode(n2.id) === n1;  // true
        
##### #nextNode([nodeId])

    var root = new Node(); 
    var n1 = new Node;
    var n2 = new Node;        
    root.appendChild(n1)
        .appendChild(n2);
        
    n1.nextNode() === n2;  // true
    root.nextNode(n1.id) === n2;  // true

###### #isRoot  

    var root = new Node(); 
    var n1 = new Node;
    var n2 = new Node;        
    root.appendChild(n1)
        .appendChild(n2);
        
    n1.isRoot();   // false
    root.isRoot();    // true
        
##### #data()

    var node = new Node();
    
    node.data("name","leo")
        .data({age:12});
        
    node.data("name") // "leo" 
    node.data("age") // 12
        
##### #json & #reborn(jsonObj)

    var jsonObj = new Node().json;

    var newNode = new Node;
    newNode.reborn(jsonObj);
        
events
=======

##### Event : 'child list change' 

    // parent is child list's parent node.
    // parent is not necessarily the node , there may be child .
    // childList is a Array , child ids.
    node.on("child list change",function(parent,childList){
        ... ...
    });
    
##### Event : 'add'

    node.on("add",function(newChild,parent){
        ... ...
    });

##### Event : "remove"    

    node.on("add",function(removedChild,parent){
        ... ...
    });
        
##### Event : "data change"      
  
    node.on("add",function(node,data){
        ... ...
    });

### LICENSE
    
    MIT , brighthas@gmail.com
