/**	
*	Written by Oso Oluwafemi osofem87@gmail.com
*/
class Molecules{
	constructor(){
	}
	
	/**
	*	Returns an object that contains the atoms and their number
	*	function getMolecules
	*	@param {string} mf The molecular formular of the compound
	*	@returns {object} Contains the atom and their corresponding number
	*/
	getMolecules(mf){
		var mf = mf.replace(/\[/g,"(").replace(/\]/g,")").replace(/\{/g,"(").replace(/\}/g,")").replace(/\s+/g,"");
		if(/^\d+/.test(mf)) throw new SyntaxError("Molecular formula should not start with a number!");
		var mol = {};
		while(mf.includes("(")){
			var x = mf.lastIndexOf("(");
			var y = mf.indexOf(")", mf.lastIndexOf("("));
			
			var z = mf.substr(x+1, y-x-1);
			var c = mf.substr(y+1);
			c = /^\d+/.exec(c);
			c=(c!= null)?Number(c[0]):1;
			
			var a = this.getMolecules(z);
			var b = "";
			for(var k in a){
				b+=k+""+a[k]*c;
			} 
			mf = mf.substr(0, x)+ b + mf.substr(y+1+((c>1)?(c+'').length:0));		
		}
		
		var m = "";
		while(m = /([A-Z]{1}[a-z]{0,}[0-9]{0,})/.exec(mf)){
			var m1 = /([A-Z]{1,}[a-z]{0,})/.exec(m[0]);
			var m2 = /\d+/.exec(m[0]);
			if(typeof mol[m1[0]] == 'undefined') mol[m1[0]]=(m2!=null)?Number(m2[0]):1;
			else mol[m1[0]] += (m2!=null)?Number(m2[0]):1;
			mf = mf.replace(m[0], "");
		}
		return mol;
	}
};

if(typeof module != 'undefined') module.exports = Molecules;