const assert = require('chai').assert;
const Molecules = require("../dist/molecules.js");

const ms = new Molecules();

describe('Molecules Test', ()=>{

    it('simple', ()=>{
        assert.deepEqual(ms.getMolecules("H2O"), {H:2, O: 1}, "Water should be {H:2, O: 1}");
        assert.deepEqual(ms.getMolecules("H2SO4"), {H:2, S: 1, O: 4}, "H2SO4 should be {H:2, O: 1}");
        assert.deepEqual(ms.getMolecules("Mg(OH)2"), {Mg: 1, O: 2, H: 2}, "Mg(OH)2 should be {Mg: 1, O: 2, H: 2}");
    });

    it('compounds', ()=>{
        assert.deepEqual(ms.getMolecules("K4[ON(SO3)2]2"), {K: 4, O: 14, N: 2, S: 4}, "K4[ON(SO3)2]2 should be {K: 4, O: 14, N: 2, S: 4}");
        assert.deepEqual(ms.getMolecules("C6H12O6"), {C: 6, H: 12, O: 6}, "Glucose should be {C: 6, H: 12, O: 6}");
        assert.deepEqual(ms.getMolecules("(C5H5) Fe (CO)2CH3"), {C: 8, H: 8, Fe: 1, O: 2}, "(C5H5) Fe (CO)2CH3 should be {C: 8, H: 8, Fe: 1, O: 2}");
        assert.deepEqual(ms.getMolecules("{[Co(NH3)4(OH)2]3Co}(SO4)3"), {Co: 4, N: 12, H: 42, O: 18, S: 3}, "{[Co(NH3)4(OH)2]3Co}(SO4)3 should be {Co: 4, N: 12, H: 42, O: 18, S: 3}");
        assert.deepEqual(ms.getMolecules("C17H21NO4"), {C: 17, H: 21, N: 1, O: 4}, "Cocaine should be {C: 17, H: 21, N: 1, O: 4}");
    });

    
    it('complex compounds', ()=>{
        assert.deepEqual(ms.getMolecules("2C17H21NO4"), { C: 34, H: 42, N: 2, O: 8 });
        assert.deepEqual(ms.getMolecules("2Na3PO4.12H2O.P9"), { Na: 6, P: 11, O: 20, H: 24 });
        assert.deepEqual(ms.getMolecules("Na3PO4.H2O"), { Na: 3, P: 1, O: 5, H: 2 });
        assert.deepEqual(ms.getMolecules("Na3PO4.12H2O"), { Na: 3, P: 1, O: 16, H: 24 });
        assert.deepEqual(ms.getMolecules("2Na3PO4.12H2O"), { Na: 6, P: 2, O: 20, H: 24 });
        assert.deepEqual(ms.getMolecules("2Na3PO4.12H2O.P9"), { Na: 6, P: 11, O: 20, H: 24 });
        assert.deepEqual(ms.getMolecules("Na3PO4.12H2O.P9"), { Na: 3, P: 10, O: 16, H: 24 });
        assert.deepEqual(ms.getMolecules("2Na3PO4.12H2O.3P9"), { Na: 6, P: 29, O: 20, H: 24 });
        assert.deepEqual(ms.getMolecules("2Na3(PO4)2.12H2O.3P9"), { Na: 6, P: 31, O: 28, H: 24 });
    });

});