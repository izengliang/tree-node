var isBrowser = this.window ? true : false,
	objectId = isBrowser ? require("object-id") : require("./object-id"),
	inherits = isBrowser ? require("inherit") : require("util").inherits,
	EventEmitter = isBrowser ? require("emitter") : require("events").EventEmitter;

module.exports = Node;


function Node(){
	EventEmitter.call(this);
    this._id = objectId();
	this._childs = {};
	this._childIdsList = [];
	this._parent = null;
	this._data = {};
}

if(isBrowser){
	EventEmitter(o);
}else{
	inherits(Node,EventEmitter);
}

var o = Node.prototype;

o.getChild = function(childId){
	var child = this._childs[childId];
	if(child){
		return child;
	}else{
		for(var cid in this._childIdsList){
            child = this._childs[cid];
			if(child && child.getChild(childId)){
				return child;
			}
		}
		return null;
	}
}

/**
* @member Node#createChild
* @return {Node} , return new child node.
*/
o.createChild = function(){
	var child = new Node();
	child._parent = this;
	this._childs[child.id] = child;
	this._childIdsList.push(child.id);
	return child;
}

/**
* @member Node#appendChild
* @param {Node} child , child can't contain root.
* @return {Node} , self.
*/
o.appendChild = function(child){
	if(this.root.getChild(child.id) || child._childIdsList.length !== 0){
		return this;
	}else if(child.parent){
		child.parent.removeChild(child.id);
	}
	child._parent = this;
	this._childs[child.id] = child;
	this._childIdsList.push(child.id);
	return this;
}

o.removeChild = function(childId){

	child = this.getChild(childId);
	
	var parent;
	
	if(child && (parent = child._parent)){
		delete parent._childs[childId];
		child._parent = null;
		var index = parent._childIdsList.indexOf(childId);
		parent._childIdsList.splice(index,1);
	}
	
	return this;
	
}

o.replaceNode = function(child,targetId){

	var target = this.getChild(targetId);
	
	if( !child || !target || target.getChild(this.id) || child.getChild(this.id) || target.getChild(child.id) ){
		return this;
	}
	
	var parent = child.parent;
	if(parent){
		parent.removeChild(child.id);
	}
	
	var index = target.position();
	
	target.parent._childIdsList.splice(index,1,child);
    child._parent = target.parent;
    delete target.parent._childs[target.id];
	target._parent = null;
	
	return this;		
	
}

o.position = function(childId){

	var child = this._getNode(childId);
	
	if(child){
		var parent = child.parent;        
		return parent ? parent._childIdsList.indexOf(child.id) : null;
	}else{
		return null;
	}
    
}

o.layer = function(childId){
	var child = this._getNode(childId),layer = 0;
		
	if(child){
		var parent = child.parent;
		while(parent){
			layer += 1;
			parent = parent.parent;
		}		
		return layer;
	}else{
		return 0;
	}
}

o._getNode = function(childId){
	
	var child;
	
	if(childId){
		if(childId === this.id){
			child = this;
		}else{
			child = this.getChild(childId);
		}
	}else{
		child = this;
	}	
	
	return child;
	
}

o.top = function(childId){
	var child = this._getNode(childId),parent;
	if(child && (parent = child.parent)){
		var index = parent._childIdsList.indexOf(childId);
		parent._childIdsList.splice(index,1);
		parent._childIdsList.unshift(childId);
	}

	return this;
}

o.up = function(childId){
	var child = this._getNode(childId),parent;
	if(child && (parent = child.parent)){
		var index = parent._childIdsList.indexOf(child.id);
		parent._childIdsList.splice(index,1);
		if(index !== 0){
			parent._childIdsList.splice(index-1,0,child.id);
		}
	}
	return this;
}


o.down = function(childId){
	var child = this._getNode(childId),parent;
	if(child && (parent = child.parent)){
		var nextNode = child.nextNode();
        if(nextNode){
            nextNode.up();
        }
	}
	return this;
}

o.nextNode = function(childId){
    var child = this._getNode(childId);
    if(child){
        var parent = child.parent,
            index = child.position(),
            nextChildId = parent._childIdsList[index+1];
            
        if(nextChildId){
            return parent.getChild(nextChildId);
        }        
    }
}

o.prevNode = function(childId){
    var child = this._getNode(childId);
    if(child){
        var parent = child.parent,
            index = child.position(),
            prevChildId = parent._childIdsList[index-1];
            
        if(prevChildId){
            return parent.getChild(prevChildId);
        }        
    }
}

// move childId node to  parentId node.
o.move = function(childId,parentId){

	var child = this.getChild(childId),
		parent = parentId === this.parent ? this : this.getChild(parentId);
	
	if( child && parent && !child.getChild(parentId) ){
		var childParent = child.parent;
		childParent.removeChild(child.id);
		parent.appendChild(child);
	}
	
	return this;
	
}

o.isRoot = function(){
	return this.parent ? false : true ;
}

o.data = function(){
	
	var obj = {}
	
	if(arguments.length === 2){
		obj[arguments[0]] = arguments[1];
	}else if(arguments.length === 1){
        if(typeof arguments[0] === "string"){
            return this._data[arguments[0]];
        }else{
            obj = arguments[0];
        }
	}else{
        return this._data;
    }
	
	for(var k in obj){
		this._data[k] = obj[k];
	}
	
}

o.reborn = function(jsonObj){
	
    if(this._childIdsList.length === 0 && this.isRoot()){
        var self = this;
        this._id = jsonObj.id;
        this._childs = {};
        this._childIdsList = [];
        this._parent = jsonObj.parent;
        this._data = jsonObj.data;
        
        jsonObj.childIdsList.forEach(function(cid){
            var child = new Node();
            child.reborn(jsonObj.childs[cid]);
            self._childs[cid] = child;
        });
	}
	return this;
    
}

Object.defineProperties(o,{

	parent : {
		get : function(){
			return this._parent;
		}
	},
	
	id: {
		get : function(){
			return this._id;
		}
	},
	
	route:{
		get : function(){
			var route = [this.id],
				parent = this.parent;
			while(parent){
				route.unshift(parent.id);
				parent = parent.parent;
			}
			return route;
		}
	},
    
    root:{
        get:function(){
            var root = this.parent;
			while(root){
				root = root.parent;
			}
			return root || this;            
        }
    },
	
	json:{
		get : function(){
        
			var jsonObj = {
				id : this._id,
				childs : {},
				childIdsList : this._childIdsList,
				parent : this._parent ? this._parent.id : null,
				data : this._data
			}, self  =  this;
			
			this._childIdsList.forEach(function(cid){
				jsonObj.childs[cid] = self._childs[cid].json;
			})
			
            
            
			return JSON.parse(JSON.stringify(jsonObj));
            
		}
	}
	
});



