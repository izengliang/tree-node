
var isBrowser = this.window ? true : false,
	Node =  isBrowser ? require("tree-node") : require(".."),
	type = isBrowser ? require("type") : require("./type"),
	assert = isBrowser ? require("assert") : require("assert").ok;
	
describe("Node",function(){

	function testInit(node){
		assert(node.id === node._id && type(node._id) === "string");
		assert(type(node._childs) === "object");
		assert(type(node._childIdsList === "array"));
		assert(type(node._data) === "object");
	}

	it("#new Node()",function(){
	
		var node = new Node();
		testInit(node);
		assert(type(node._parent) === "null" && node._parent === node.parent);
		
	});
	
	it("#createChild()",function(){
	
		var root = new Node();
		var child = root.createChild();
		testInit(child);
		assert(root === child.parent);
		
	});
	
	it("#appendChild(child)",function(){
		
		var root = new Node();
		var node = new Node();
		
		assert(root.appendChild(node).getChild(node.id) === node);
		assert(node.parent === root);
		assert(root._childs[node.id] === node);
		assert(root._childIdsList[0] === node.id);
		
		node.appendChild(root);
		assert(root.parent === null);
		
	});
	
	it("#removeChild(childId)",function(){
		
		var root = new Node();
		var node = new Node();
		
		root.appendChild(node).removeChild(node.id);
		assert(node.parent === null);
		assert(root._childs[node.id] === undefined);
		assert(root._childIdsList[0] === undefined);
		
	});
	
	it("#replaceNode(child,targetId)" ,function(){
	
		var root = new Node();
		var node = new Node();
		var node2 = new Node();
		
		root.appendChild(node);
		
		root.replaceNode(node2,node.id);
		assert(node.parent === null);
    assert(node2.parent === root);
		
	});
    
    it("#position([nodeId]))",function(){
    
        var root = new Node();
        assert(root.position() === null);
        
        var n1 = new Node;
        var n2 = new Node;
        
        root.appendChild(n1).appendChild(n2);
        
        assert(root.position(n1.id) === 0);
        assert(root.position(n2.id) === 1);
        assert(n1.position() === 0);
        assert(n2.position() === 1);
        
    });
    
    it("#layer([nodeId])",function(){
    
        var root = new Node();        
        var n1 = new Node;
        var n2 = new Node;        
        root.appendChild(n1).appendChild(n2);
        
        assert(root.layer() === 0);
        assert(root.layer(n1.id) === 1);
        assert(root.layer(n2.id) === 1);
        assert(n1.layer() === 1);
        assert(n2.layer() === 1);
        
    });
    
    it("#top()",function(){
        
        var root = new Node();        
        var n1 = new Node;
        var n2 = new Node;        
        root.appendChild(n1).appendChild(n2);
        
        root.top(n2.id);
        
        assert(n2.position() === 0);
        assert(n1.position() === 1);
        
    });
    
    it("#up()",function(){
        
        var root = new Node();        
        var n1 = new Node;
        var n2 = new Node;        
        root.appendChild(n1).appendChild(n2);
        
        root.up(n2.id);
        
        assert(n2.position() === 0);
        assert(n1.position() === 1);
        
    });
    
    it("#down()",function(){
        
        var root = new Node();        
        var n1 = new Node;
        var n2 = new Node;        
        root.appendChild(n1).appendChild(n2);
        
        root.down(n1.id);

        assert(n2.position() === 0);
        assert(n1.position() === 1);
        
    });
    
    it("#move(src , target)",function(){
        var root = new Node(); 
        var n1 = new Node;
        var n2 = new Node;        
        root.appendChild(n1)
            .appendChild(n2)
            .move(n1.id,n2.id)
            .move(n2.id,n1.id)
        
        assert(root._childIdsList.length === 1);
        assert(n2._childIdsList.length === 1);
        
    });
        
    it("#prevNode([nodeId])",function(){
        var root = new Node(); 
        var n1 = new Node;
        var n2 = new Node;        
        root.appendChild(n1)
            .appendChild(n2);
        
        assert(n2.prevNode() === n1);
        assert(root.prevNode(n2.id) === n1);
    });
    
    it("#nextNode([nodeId])",function(){
        var root = new Node(); 
        var n1 = new Node;
        var n2 = new Node;        
        root.appendChild(n1)
            .appendChild(n2);
            
        assert(n1.nextNode() === n2);
        assert(root.nextNode(n1.id) === n2);
    });
    
    it("#isRoot",function(){
        var root = new Node(); 
        var n1 = new Node;
        var n2 = new Node;        
        root.appendChild(n1)
            .appendChild(n2);
            
        assert(n1.isRoot() === false);
        assert(root.isRoot()=== true);
    });
    
    it("#data()",function(){
       var node = new Node();
       node.data("name","leo");
       assert(node.data("name") === "leo");
       
       node.data({age:12});
       assert(node.data("name") === "leo" && node.data("age") === 12);
       
       assert(node.data() === node._data);
    });
    
    it("#json",function(){
        var o = new Node().json;
        assert(typeof o.id === "string");
		assert(type(o.childs) === "object");
		assert(type(o.childIdsList === "array"));
		assert(type(o.data) === "object");
    });
    
    it("#reborn",function(){
        var root = new Node(); 
        var n1 = new Node;
        var n2 = new Node;        
        var o = root.appendChild(n1).appendChild(n2).json;
        
        var root2 = new Node();
        o = root2.reborn(o).json;
        assert(typeof o.id === "string");
		assert(type(o.childs) === "object");
		assert(type(o.childIdsList === "array"));
		assert(type(o.data) === "object");
    })   
    
    it("#allChildIds",function(){
        var root = new Node(); 
        var n1 = new Node;
        var n2 = new Node;        
        var o = root.appendChild(n1).appendChild(n2);
        
        assert(root.allChildIds.length === 2)
    })

    it("#nextDepthNode",function(){
            var root = new Node(); 
            var n1 = new Node;
            var n2 = new Node;      
    		var n3 = new Node;  
            var o = root.appendChild(n1).appendChild(n2);
    		n2.appendChild(n3);
            var nn = root.nextDepthNode().nextDepthNode().nextDepthNode();
            assert(nn === n3)
        })
   
     it("#prevDepthNode",function(){
            var root = new Node(); 
            var n1 = new Node;
            var n2 = new Node;      
    		var n3 = new Node;  
            var o = root.appendChild(n1).appendChild(n2);
    		n2.appendChild(n3);
            var nn = n3.prevDepthNode();
			
            assert(nn === n2)
        })
    	
	
	
});
