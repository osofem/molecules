"use strict";
/**
 * Get atoms from a molucular formula
 * Written by Oso Oluwafemi<osofem87@gmail.com>
*/
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Molecules_instances, _Molecules_flattenMolecules;
Object.defineProperty(exports, "__esModule", { value: true });
class Molecules {
    constructor() {
        _Molecules_instances.add(this);
        //DO nothing
    }
    /**
    *	Returns an object that contains the atoms and their number
    *	function getMolecules
    *	@param {string} mf The molecular formular of the compound
    *	@returns {object} Contains the atom and their corresponding number
    */
    getMolecules(mf) {
        var mf = mf.replace(/\[/g, "(").replace(/\]/g, ")").replace(/\{/g, "(").replace(/\}/g, ")").replace(/\s+/g, "");
        let mol = {};
        let topMultiplier = 1;
        //Check for complex compound
        //e.g. Sodium Phosphate Dodecahydrate Na3PO4.12H2O
        if (/\./.test(mf)) {
            //Separate the compound into two halves
            let vm = /\./.exec(mf);
            let fHalf = "", lHalf = "";
            if (vm)
                fHalf = mf.substr(0, vm['index']);
            if (vm)
                lHalf = mf.substr(vm['index'] + 1);
            //Reslove each halves separately
            fHalf = this.getMolecules(fHalf);
            lHalf = this.getMolecules(lHalf);
            //Flatten the two halves
            fHalf = __classPrivateFieldGet(this, _Molecules_instances, "m", _Molecules_flattenMolecules).call(this, fHalf, 1);
            lHalf = __classPrivateFieldGet(this, _Molecules_instances, "m", _Molecules_flattenMolecules).call(this, lHalf, 1);
            //Join the two and reprocess
            mf = fHalf + lHalf;
        }
        //Check for a multiplier in front of the equation e.g. 4NaCl
        if (/^\d+/.test(mf)) {
            let vm = /^\d+/.exec(mf);
            //get the multiplier
            if (vm)
                topMultiplier = +vm[0];
            //remove the multiplier from the equation
            if (vm)
                mf = mf.replace(vm[0], "");
        }
        /*
        * Process the compound from last group to the first group.
        * A(B(C)) i.e. from C to B to A
        */
        while (mf.includes("(")) {
            //find the last group positions
            let x = mf.lastIndexOf("(");
            let y = mf.indexOf(")", mf.lastIndexOf("("));
            //find the last compound with gotten positions
            let z = mf.substr(x + 1, y - x - 1);
            //Find any multiplier for the group e.g. (NaCl)2. variable c2 should equals 2
            let c = mf.substr(y + 1);
            let c1 = /^\d+/.exec(c);
            let c2 = (c1 != null) ? Number(c1[0]) : 1;
            //recurssively call me again with clean compound e.g. NaCl
            //returns object of molecules. e.g. { Na: 1, Cl: 1 }
            let a = this.getMolecules(z);
            //expand object e.g. { Na: 1, Cl: 1 } becomes "Na1Cl1"
            let b = __classPrivateFieldGet(this, _Molecules_instances, "m", _Molecules_flattenMolecules).call(this, a, c2);
            //Replace the expanded group in the whole compound 
            //e.g. "Al(O(NaCl))2" becomes Al(ONa1Cl1)2 at first pass
            //becomes AlO2Na2Cl2 on second pass
            mf = mf.substr(0, x) + b + mf.substr(y + 1 + ((c2 > 1) ? (c2 + '').length : 0));
        }
        //Arrange flattened compound into objects
        //e.g. AlO2Na2Cl2 becomes { Al: 1, O: 2, Na: 2, Cl: 2 }
        let m;
        while (m = /([A-Z]{1}[a-z]{0,}[0-9]{0,})/.exec(mf) /*Find a whole atom*/) {
            let m1 = /([A-Z]{1,}[a-z]{0,})/.exec(m[0]); //Find the atom letter part
            let m2 = /\d+/.exec(m[0]); //Find the associated multiplier
            if (m1 && typeof mol[m1[0]] == 'undefined')
                mol[m1[0]] = (m2 != null) ? Number(m2[0]) : 1; //If atom not yet added to mol, add it
            else if (m1)
                mol[m1[0]] += (m2 != null) ? Number(m2[0]) : 1; //If already added to mol, add previous and new quantities 
            mf = mf.replace(m[0], ""); //remove the processed atom from the equation
        }
        //multiple all molecule by top multiplier
        for (let k in mol) {
            mol[k] *= topMultiplier;
        }
        return mol;
    }
}
exports.default = Molecules;
_Molecules_instances = new WeakSet(), _Molecules_flattenMolecules = function _Molecules_flattenMolecules(molObject, groupMultiplier) {
    let b = "";
    for (let k in molObject) {
        b += k + "" + molObject[k] * groupMultiplier;
    }
    return b;
};
;
module.exports = Molecules;
