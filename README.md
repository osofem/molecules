# molecules.js
Get the number of each atom from a molecular formula

### Install
Depending on the environment in which `molecules.js` will be used, it can be installed via:

Server-side usage
1. Installing on node.js
	```javascript
	npm install molecules.js
	```

Client-side usage
1. Including the library from the rawgit.com CDN.<br>
	You can do that by adding <code>&lt;script src=&quot;https&#58;&#47;&#47;cdn.rawgit.com/osofem/molecules/&lt;version tag&gt;/molecules.js&quot;&gt;&lt;/script&gt;</code> to your code. Replace <code>&lt;version tag&gt;</code> with the version targeted e.g. `v1.0.0`. Check [versions](https://github.com/osofem/molecules/tags) for the latest version (the latest version is always recommended).
2. Downloading the source from GitHub.com<br>
	You can also download `molecules.js` from [releases](https://github.com/osofem/molecules/releases/) on github.com (the latest version is always recommended). Extract the files and include the `molecules.js` file in your work.
  
### Usage
  > In the server-side, always add the `var Molecules = require('molecules.js');` however every other thing remains the same in both server-side and client-side.

```javascript
var mc = new Molecules();
console.log(mc.getMolecules("H2O")); //This logs object {H:2, O: 1} to the console
console.log(mc.getMolecules("H2SO4")); //This logs object {H:2, S: 1, O: 4} to the console
console.log(mc.getMolecules("C6H12O6")); //This logs object {C: 6, H: 12, O: 6} to the console
console.log(ms.getMolecules("C17H21NO4")); //This logs object {C: 17, H: 21, N: 1, O: 4} to the console
console.log(mc.getMolecules("Mg(OH)2")); //This logs object {Mg: 1, O: 2, H: 2} to the console
console.log(mc.getMolecules("K4[ON(SO3)2]2")); //This logs object {K: 4, O: 14, N: 2, S: 4} to the console
console.log(ms.getMolecules("(C5H5)Fe(CO)2CH3")); //This logs object {C: 8, H: 8, Fe: 1, O: 2} to the console
console.log(ms.getMolecules("{[Co(NH3)4(OH)2]3Co}(SO4)3")); //This logs object {Co: 4, N: 12, H: 42, O: 18, S: 3} to the console
```

### Rule
1. The atomic symbols should always start with a capital letter followed by a small letter if the symbol is double lettered. E.g. `H` - Hydrogen, `C` - Carbon, `O` - Oxygen, `Co` - Cobalt (not CO), `CO` - Carbon Monoxide.
2. The `()`, `[]` and or `{}` brackets can be used to group the elements but should be properly nested.
3. As this is suppose to get number of atoms from molecular formula, the formula should not start with a number (this will throw a `SnytaxError`). `2H2O` should be rewritten as `(H2O)2`.