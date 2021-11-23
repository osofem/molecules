# molecules.js

Get the number of each atom from a molecular formula

### Installation

```javascript
npm i molecules.js
```
  
### Usage

```javascript
const Molecules = require('molecules.js');
const mc = new Molecules();
console.log(mc.getMolecules("H2O")); //This logs object {H:2, O: 1}
console.log(mc.getMolecules("H2SO4")); //This logs object {H:2, S: 1, O: 4}
console.log(mc.getMolecules("C6H12O6")); //This logs object {C: 6, H: 12, O: 6}
console.log(ms.getMolecules("C17H21NO4")); //This logs object {C: 17, H: 21, N: 1, O: 4}
console.log(mc.getMolecules("Mg(OH)2")); //This logs object {Mg: 1, O: 2, H: 2}
console.log(mc.getMolecules("K4[ON(SO3)2]2")); //This logs object {K: 4, O: 14, N: 2, S: 4}
console.log(mc.getMolecules("(C5H5)Fe(CO)2CH3")); //This logs object {C: 8, H: 8, Fe: 1, O: 2}
console.log(mc.getMolecules("{[Co(NH3)4(OH)2]3Co}(SO4)3")); //This logs object {Co: 4, N: 12, H: 42, O: 18, S: 3}
console.log(mc.getMolecules("2Na3PO4.12H2O")); //This logs object { Na: 6, P: 2, O: 20, H: 24 }
console.log(mc.getMolecules("2Na3PO4.12H2O.P9")); //This logs object { Na: 6, P: 11, O: 20, H: 24 });
```

### Rule
1. The atomic symbols should always start with a capital letter followed by a small letter if the symbol is double lettered. E.g. `H` - Hydrogen, `C` - Carbon, `O` - Oxygen, `Co` - Cobalt (not CO), `CO` - Carbon Monoxide.
2. The `()`, `[]` and or `{}` brackets can be used to group the elements but should be properly nested.